import React from 'react';
import getCart, { removeFromCart } from '../../Uitils/Cart';
import { useNavigate } from 'react-router-dom';

const CartCard = ({ item, onRemove }) => {
    const { name, image, price, labeledPrice, altNames, id, quantity } = item;
    const navigate = useNavigate();

    const buyNow = () => {
        const cartItems = [item];
        navigate("/placeorder", { state: { cartItems } })
    }

    return (
        <div className='w-full py-3 px-1 border-b border-b-gray-300 flex flex-col sm:flex-row gap-4 sm:gap-6 rounded-md'>
            {/* Product Image */}
            <img
                src={image}
                alt={name}
                className='w-full sm:w-[175px] h-[200px] sm:h-full aspect-square object-cover rounded-md shadow-md'
            />

            {/* Product Info */}
            <div className='w-full flex flex-col justify-between gap-2'>
                <div className='flex justify-between items-center flex-wrap gap-2'>
                    <div className='text-base sm:text-lg font-semibold text-gray-900'>{name}</div>
                    <div className='text-base sm:text-lg font-semibold text-rose-600'>${price}</div>
                </div>

                <div className='text-sm text-gray-400'>Alt Names: {altNames.join(' | ')}</div>
                <div className='text-sm text-gray-400'>Product ID: {id}</div>
                <div className='text-sm text-gray-400'>Quantity: {quantity}</div>

                {/* Action Buttons */}
                <div className='w-full lg:w-2/3 flex flex-col sm:flex-row gap-3 mt-2'>
                    <button 
                        className='py-2 w-full text-center rounded-md font-semibold text-sm bg-black text-white hover:bg-gray-800 transition cursor-pointer'
                        onClick={buyNow}
                        >
                        Buy
                    </button>
                    <button
                        className='py-2 w-full text-center rounded-md font-semibold text-sm bg-red-600 text-white hover:bg-red-500 transition cursor-pointer'
                        onClick={() => onRemove(id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartCard;
