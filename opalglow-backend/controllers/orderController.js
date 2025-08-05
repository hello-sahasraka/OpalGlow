import Order from "../models/order.js";
import Product from "../models/product.js";

export async function createOrder(req, res) {
  if (req.user == null) {
    res.json({
      message: "Unauthorized",
    });
    return;
  }

  const body = req.body;

  const orderData = {
    orderId: "",
    email: req.user.email,
    name: body.name,
    address: body.address,
    phone: body.phone,
    billItems: [],
    total: 0,
  };

  Order.find()
    .sort({ date: -1 })
    .limit(1)
    .then(async (lastBills) => {
      if (lastBills.length === 0) {
        orderData.orderId = "ORD0001";
      } else {
        const lastBill = lastBills[0];
        const lastOrderId = lastBill.orderId;
        const lastOrderNumber = lastOrderId.replace("ORD", "");
        const newOrderNumber = parseInt(lastOrderNumber);
        const newOrderNumberInt = newOrderNumber + 1;
        const newOrderNumberStr = newOrderNumberInt.toString().padStart(4, "0");
        orderData.orderId = "ORD" + newOrderNumberStr;
      }

      for (let i = 0; i < body.billItems.length; i++) {
        const product = await Product.findOne({
          productId: body.billItems[i].id,
        });

        if (product == null) {
          res.status(404).json({
            message:
              "Product with product id " + body.billItems[i].id + " not found",
          });
          return;
        } else {
          orderData.billItems[i] = {
            productId: product.id,
            productName: product.name,
            image: product.image[0],
            quantity: body.billItems[i].quantity,
            price: product.price,
          };
          orderData.total =
            orderData.total + product.price * body.billItems[i].quantity;
        }
      }

      const order = new Order(orderData);

      order
        .save()
        .then(() => {
          res.json({
            message: "Order created successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "Order not created",
            error: error.message,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Failed to fetch last order",
        error: error.message,
      });
    });
}

export function getOrders(req, res) {
  if (req.user == null) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  if ((req.user.role = "admin")) {
    Order.find()
      .then((orders) => {
        res.json(orders);
      })
      .catch(() => {
        res.status(500).json({
          message: "Orders not found",
        });
      });
  } else {
    Order.find({
      email: req.user.email,
    })
      .then((orders) => {
        res.json(orders);
      })
      .catch(() => {
        res.status(500).json({
          message: "Orders not found",
        });
      });
  }
}

export async function updateOrder(req, res) {
  try {
    if (req.user == null) {
      res.status(404).json({
        message: "Unauthorized!",
      });
      return;
    }

    if (req.user.role != "admin") {
      res.status(404).json({
        message: "You are not authorized to update an order!",
      });
    }

    const orderID = req.params.orderId;
    const order = await Order.findOneAndUpdate({ orderId: orderID }, req.body);

    res.json({
      message: "Order updated successfully!",
    })

  } catch (err) {
    res.status(500).json({
      message: "Order not updated!",
    });
  }
}
