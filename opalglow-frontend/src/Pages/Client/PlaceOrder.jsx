import { useState } from 'react'
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom'
import PlaceOrderItemCard from '../../Components/PlaceOrderItemCard';
import axios from 'axios';

const PlaceOrder = () => {
    const cartItems = useLocation()
    const placeOrderItems = cartItems.state?.cartItems || [];
    console.log("Place Order Items:", placeOrderItems);

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

    let delivery = 0;
    if (placeOrderItems.length > 0) delivery = 12.99;

    const placeOrder = async () => {
        toast.loading("Placing the order...");

        try {
            const orderDetails = {
                email: email,
                name: fname + " " + lname,
                address: address + ", " + city + ", " + district + ", " + province + ", " + zip,
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
            navigate("/products")
        } catch (error) {
            toast.dismiss();
            toast.error("Failed to place the order!");
            console.error("Order placement error:", error);
        }
    };



    return (
        <div className='w-full h-full px-[100px] py-10 flex gap-12 bg-gray-100'>
            <div className='w-3/5 h-full p-6 bg-white shadow-md rounded-lg'>
                <h1 className='text-2xl font-semibold'>Shipping Address</h1>
                <div className='w-full mt-12 flex justify-between gap-6'>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='f-name'>First Name*</label>
                        <input
                            type="text"
                            id='f-name'
                            placeholder='Enter your first name'
                            value={fname}
                            onChange={(e) => setFname(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='l-name'>Last Name*</label>
                        <input
                            type="text"
                            id='l-name'
                            placeholder='Enter your last name'
                            value={lname}
                            onChange={(e) => setLname(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                </div>
                <div className='w-full mt-6 flex justify-between gap-6'>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='email'>Email*</label>
                        <input
                            type="text"
                            id='email'
                            placeholder='Enter your email address'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='phone'>Phone number*</label>
                        <input
                            type="text"
                            id='phone'
                            placeholder='Enter your phone number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                </div>
                <div className='w-full mt-6 flex justify-between gap-6'>
                    <div className='w-1/3'>
                        <label className='block text-sm font-medium text-gray-700' for='province'>Province*</label>
                        <input
                            type="text"
                            id='province'
                            placeholder='Enter your province'
                            value={province}
                            onChange={(e) => setProvince(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className='block text-sm font-medium text-gray-700' for='district'>District*</label>
                        <input
                            type="text"
                            id='district'
                            placeholder='Enter your district'
                            value={district}
                            onChange={(e) => setDistrict(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                    <div className='w-1/3'>
                        <label className='block text-sm font-medium text-gray-700' for='city'>City*</label>
                        <input
                            type="text"
                            id='city'
                            placeholder='Enter your city'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                </div>
                <div className='w-full mt-6 flex justify-between gap-6'>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='address'>Address*</label>
                        <input
                            type="text"
                            id='address'
                            placeholder='For Example: 123 Main St, Apt 4B'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                    <div className='w-1/2'>
                        <label className='block text-sm font-medium text-gray-700' for='zip'>Zip Code*</label>
                        <input
                            type="text"
                            id='zip'
                            placeholder='Enter your zip code'
                            value={zip}
                            onChange={(e) => setZip(e.target.value)}
                            required
                            className='mt-1 block w-full px-3 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm placeholder:text-gray-400 placeholder:text-xs'
                        />
                    </div>
                </div>
            </div>
            <div className='w-2/5 h-full p-6 border-1 border-gray-300 rounded-lg'>
                <h1 className='text-2xl font-semibold mb-6'>Your Orders</h1>
                <div className='w-full max-h-2/5 overflow-y-auto pt-2'>
                    {
                        placeOrderItems.map((order, index) => {
                            return <PlaceOrderItemCard item={order} />
                        })
                    }
                </div>
                <div className='flex justify-between mt-6'>
                    <span className='text-sm font-semibold text-gray-600'>Sub Total:</span>
                    <span className='text-lg font-semibold'>
                        ${placeOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                    </span>
                </div>
                <div className='flex justify-between mt-1'>
                    <span className='text-sm font-semibold text-gray-600'>Delivery:</span>
                    <span className='text-sm font-semibold'>${delivery.toFixed(2)}</span>
                </div>
                <div className='flex justify-between mt-1'>
                    <span className='text-sm font-semibold text-gray-600'>Discount:</span>
                    <span className='text-sm font-semibold'>
                        ${placeOrderItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0).toFixed(2)}
                    </span>
                </div>
                <div className='flex flex-col gap-4 mt-6 border-t-1 border-gray-400'>
                    <div className='flex justify-between mt-2'>
                        <span className='text-gray-700 font-semibold text-lg'>Total:</span>
                        <span className='text-xl text-green-600 font-semibold'>
                            $
                            {(
                                placeOrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
                                delivery -
                                placeOrderItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0)
                            ).toFixed(2)}
                        </span>
                    </div>
                    <button className='mt-2 py-3 w-full text-md text-center rounded-md font-semibold transition duration-300 bg-black text-white hover:bg-gray-800 cursor-pointer'
                        onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>

        </div>
    )
}

export default PlaceOrder