import Loader from '../../Components/Loader';
import CartCard from '../../Components/CartCard';
import { useEffect, useState } from 'react';
import getCart, { removeFromCart } from '../../../Uitils/Cart';
import emptyCartImage from './../../assets/empty_cart.png';
import { useNavigate } from 'react-router-dom';

import { useConfirmDialog } from '../../Components/ConfirmDialogProvider';
import Footer from '../../Components/Footer';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const confirmDialog = useConfirmDialog();

    let delivery = 0;
    if (cartItems.length > 0) delivery = 12.99;

    useEffect(() => {
        setCartItems(getCart());
        setLoading(false);
    }, []);

    const handleRemove = (id) => {
        confirmDialog("Are you sure you want to remove this product?", () => {
            const updatedCart = removeFromCart({ id });
            setCartItems(updatedCart);
        });
    };

    return (
        <div>
            <div className='w-full h-full px-4 md:px-10 lg:px-[100px]'>
                {loading ? (
                    <Loader />
                ) : (
                    <div>
                        <div className="text-2xl sm:text-3xl font-bold text-gray-900 py-8 sm:py-12">
                            Your <span className="text-rose-500">Cart</span>
                        </div>

                        <div className='w-full flex flex-col lg:flex-row gap-8 relative'>
                            {cartItems.length > 0 ? (
                                <div className='w-full lg:w-2/3 rounded-xl flex flex-col items-center gap-2'>
                                    {cartItems.map((item, index) => (
                                        <CartCard key={index} item={item} onRemove={handleRemove} />
                                    ))}
                                </div>
                            ) : (
                                <div className='w-full lg:w-2/3 h-[350px] flex flex-col gap-2 justify-center items-center'>
                                    <img src={emptyCartImage} alt="Empty Cart" className="w-[150px] sm:w-[200px] opacity-80" />
                                    <p className='text-gray-500 text-xl sm:text-2xl font-semibold'>Your cart is <span className='text-rose-500'>Empty!</span></p>
                                    <p className='text-gray-400 text-xs text-center'>Must add items on the cart before you proceed to checkout</p>
                                    <button className='mt-4 py-2 px-4 bg-rose-500 text-white rounded-md cursor-pointer' onClick={() => navigate("/products")}>
                                        Continue Shopping
                                    </button>
                                </div>
                            )}

                            <div className='w-full lg:w-1/3 h-auto lg:h-[350px] rounded-xl border border-gray-300 flex flex-col gap-4 p-6 sticky top-[100px]'>
                                <h1 className='text-xl sm:text-3xl font-semibold text-gray-900'>Order Summary</h1>
                                <div className='flex flex-col gap-2 border-b border-gray-300 py-2'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-700'>Total Items:</span>
                                        <span className='font-semibold'>{cartItems.length}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-700'>Sub Total:</span>
                                        <span className='text-lg font-semibold'>
                                            ${cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-700'>Delivery:</span>
                                        <span className='font-semibold'>${delivery.toFixed(2)}</span>
                                    </div>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-700'>Discount:</span>
                                        <span className='font-semibold'>
                                            ${cartItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0).toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between'>
                                        <span className='text-gray-700 font-semibold text-lg'>Total:</span>
                                        <span className='text-xl font-semibold text-green-600'>
                                            $
                                            {(
                                                cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) +
                                                delivery -
                                                cartItems.reduce((acc, item) => acc + (item.labeledPrice - item.price) * item.quantity, 0)
                                            ).toFixed(2)}
                                        </span>
                                    </div>
                                    <button className='mt-2 py-3 w-full text-center rounded-md font-semibold text-sm transition duration-300 bg-black text-white hover:bg-gray-800 cursor-pointer'
                                        onClick={() => navigate("/placeorder", { state: { cartItems } })}>
                                        Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
