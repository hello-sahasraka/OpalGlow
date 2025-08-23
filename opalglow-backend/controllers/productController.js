import Product from "../models/product.js";
import SearchLog from "../models/searchLogs.js";

export function createProduct(req, res) {
  if (req.user == null) {
    res.status(403).json({
      mesage: "You need to login first!",
    });

    return;
  }

  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to create a product!",
    });

    return;
  }

  const product = new Product(req.body);

  product
    .save()
    .then(() => {
      res.json({
        message: "Product created successfully!",
      });
    })
    .catch((err) => {
      console.log(err);

      res.status(500).json({
        message: "Product creation failed!",
      });
    });
}

export function getProduct(req, res) {
  Product.find()
    .then((products) => {
      res.json(products);
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to get products!",
      });
    });
}

export async function getProductById(req, res) {
  const productId = req.params.productId;

  try {
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get product!",
    });
  }
}

export function deleteProduct(req, res) {
  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to delete a product!",
    });

    return;
  }

  Product.findOneAndDelete({
    productId: req.params.productId,
  })
    .then(() => {
      res.json({
        message: "Product deleted successfully!",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to delete product!",
      });
    });
}

export function updateProduct(req, res) {
  if (req.user.role != "admin") {
    res.status(403).json({
      message: "You are not authorized to delete a product!",
    });

    return;
  }

  Product.findOneAndUpdate(
    {
      productId: req.params.productId,
    },
    req.body
  )
    .then(() => {
      res.json({
        message: "Product updated successfully!",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to update product!",
      });
    });
}

export async function searchProduct(req, res) {
  const search = req.params.productId;

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { altNames: { $elemMatch: { $regex: search, $options: "i" } } },
      ],
    });

    await Promise.all(
      products.map((product) => {
        const searchLog = new SearchLog({
          productId: product._id,
        });

        return searchLog.save();
      })
    );

    res.json({
      products: products,
    });
  } catch {
    res.status(500).json({
      message: "Failed to search products!",
    });
  }
}

export async function getTrendingProducts(req, res) {
  try {
    const trending = await SearchLog.aggregate([
      {
        $group: {
          _id: "$productId",
          searchCount: { $sum: 1 },
          lastSearch: { $max: "$searchedAt" },
        },
      },
      { $sort: { searchCount: -1, lastSearch: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      { $unwind: "$product" },
    ]);

    res.status(200).json(trending);
  } catch (error) {
    console.error("Error fetching trending products:", error);
    res.status(500).json({
      message: "Failed to get trending products!",
    });
  }
}
