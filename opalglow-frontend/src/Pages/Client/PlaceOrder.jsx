// PlaceOrder.jsx

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import PlaceOrderItemCard from '../../Components/PlaceOrderItemCard';
import axios from 'axios';

const PlaceOrder = () => {
  const cartItems = useLocation();
  const placeOrderItems = cartItems.state?.cartItems || [];

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const navigate = useNavigate();

  let delivery = placeOrderItems.length > 0 ? 12.99 : 0;

  const placeOrder = async () => {
    toast.loading("Placing the order...");
    try {
      const orderDetails = {
        email: email,
        name: fname + " " + lname,
        address: `${address}, ${city}, ${district}, ${province}, ${zip}`,
        phone: phone,
        billItems: placeOrderItems,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/order/createorder",
        orderDetails,
        {
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.dismiss();
      toast.success("Order placed successfully!");
      localStorage.removeItem("cart");
      navigate("/products");
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to place the order!");
      console.error("Order placement error:", error);
    }
  };

  return (
    <div className="w-full lg:h-full lg:px-[100px] px-4 sm:px-8 py-8 flex flex-col lg:flex-row gap-8 bg-gray-100 mb-6">
      {/* Left: Shipping Form */}
      <div className="w-full lg:w-3/5 h-full p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold">Shipping Address</h1>

        <div className="mt-12 flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <label htmlFor="f-name" className="block text-sm font-medium text-gray-700">First Name*</label>
            <input
              id="f-name"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              placeholder="Enter your first name"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="l-name" className="block text-sm font-medium text-gray-700">Last Name*</label>
            <input
              id="l-name"
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              placeholder="Enter your last name"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email*</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number*</label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/3">
            <label htmlFor="province" className="block text-sm font-medium text-gray-700">Province*</label>
            <input
              id="province"
              type="text"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
              placeholder="Enter your province"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label htmlFor="district" className="block text-sm font-medium text-gray-700">District*</label>
            <input
              id="district"
              type="text"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              placeholder="Enter your district"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-1/3">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">City*</label>
            <input
              id="city"
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your city"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-1/2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address*</label>
            <input
              id="address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="For Example: 123 Main St, Apt 4B"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code*</label>
            <input
              id="zip"
              type="text"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Enter your zip code"
              required
              className="mt-1 w-full px-3 py-2 border-2 border-gray-300 rounded-md placeholder:text-xs placeholder:text-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {/* Right: Order Summary */}
      <div className="w-full lg:w-2/5 h-full p-6 border border-gray-300 rounded-lg bg-white">
        <h1 className="text-2xl font-semibold mb-6">Your Orders</h1>

        <div className="w-full max-h-[280px] overflow-y-auto pt-2 pr-1">
          {placeOrderItems.map((order, index) => (
            <PlaceOrderItemCard item={order} key={index} />
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <span className="text-sm font-semibold text-gray-600">Sub Total:</span>
          <span className="text-lg font-semibold">
            ${placeOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm font-semibold text-gray-600">Delivery:</span>
          <span className="text-sm font-semibold">${delivery.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm font-semibold text-gray-600">Discount:</span>
          <span className="text-sm font-semibold">
            ${placeOrderItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0).toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col gap-4 mt-6 border-t border-gray-400 pt-2">
          <div className="flex justify-between">
            <span className="text-gray-700 font-semibold text-lg">Total:</span>
            <span className="text-xl text-green-600 font-semibold">
              $
              {(
                placeOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
                delivery -
                placeOrderItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0)
              ).toFixed(2)}
            </span>
          </div>
          <button
            className="mt-2 py-3 w-full text-md text-center rounded-md font-semibold transition duration-300 bg-black text-white hover:bg-gray-800 cursor-pointer"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
