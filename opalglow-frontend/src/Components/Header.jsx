import { Link } from "react-router-dom"
import { ShoppingCart } from 'lucide-react';
import getCart from "../../Uitils/Cart";
import { useEffect, useState } from "react";

const Header = () => {
  const [itemAmount, setItemAmount] = useState();
  const cartItems = getCart();

  useEffect(() => {
    setItemAmount(cartItems.length);
  },[cartItems])

  return (
    <div className='sticky top-0 w-full h-[60px] bg-gray-800/25 backdrop-blur-md text-rose-900 font-semibold flex justify-end shadow z-10'>
        <div className="flex justify-between items-center w-[25%] h-full mx-[100px]">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/reviews">Reviews</Link>
          <Link to="/aboutus">About Us</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={25} />
            <span className="absolute -top-1 -right-1 bg-white border border-rose-600 text-rose-600 text-xs font-semibold px-1 rounded-full">
              {itemAmount}
            </span>
          </Link>
        </div>
    </div>
  )
}

export default Header