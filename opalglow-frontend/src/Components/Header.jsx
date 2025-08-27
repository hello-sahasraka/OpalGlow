import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, ShoppingBag } from 'lucide-react';
import getCart from "../../Uitils/Cart";
import { useEffect, useState } from "react";
import UserData from "./UserData";
import opalglow from "../assets/opalglow.png";

const Header = () => {
  const [itemAmount, setItemAmount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const updateCartCount = () => {
    const cartItems = getCart();
    setItemAmount(cartItems.length);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/reviews", label: "Reviews" },
    { path: "/aboutus", label: "AboutUs" },
  ];

  return (
    <div className="sticky top-0 w-full h-[60px] bg-rose-300/25 backdrop-blur-lg text-rose-900 font-semibold flex justify-between items-center px-4 sm:px-8 lg:px-20 shadow z-30">
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden w-full flex justify-between items-center relative">
        <button onClick={() => setMenuOpen(!menuOpen)}>
          <Menu size={28} />
        </button>

        <Link to="/" className="lg:mx-0 mx-auto p-0 absolute left-1/2 transform -translate-x-1/2 ">
          <img src={opalglow} alt="OpalGlow Logo" className="h-8 scale-75" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex justify-between items-center w-full h-full">
        <Link to="/">
          <img src={opalglow} alt="OpalGlow Logo" className="h-9 scale-75" />
        </Link>
        <div className="flex justify-between items-center w-[35%] h-full">
          {
            navLinks.map(({ path, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-200 text-sm text-rose-900 font-medium
                ${isActive ? "bg-rose-600 text-white shadow-md" : "hover:bg-rose-800 text-gray-300 hover:text-white"}`}>{label}</Link>
              )
            })
          }
          <div title="View Cart" className="bg-rose-300 p-2 rounded-full relative ">
            <Link
              to="/cart" className={`${location.pathname === "/cart" && "text-rose-700 scale-105"}`}>
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 bg-white border border-rose-700 text-rose-700 text-xs font-semibold px-1 rounded-full">
                {itemAmount}
              </span>
            </Link>
          </div>
        </div>
        <UserData />
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-[60px] left-0 w-full bg-white border-t border-gray-200 shadow-lg lg:hidden z-50">
          <div className="flex flex-col text-gray-800 font-medium py-4 px-6 space-y-4">
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/reviews" onClick={() => setMenuOpen(false)}>Reviews</Link>
            <Link to="/aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
            <Link to="/cart" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
              <ShoppingBag size={20} />
              <span className="relative">
                Cart
                <span className="absolute -top-2 -right-3 bg-rose-700 text-white text-xs font-bold px-1 rounded-full">
                  {itemAmount}
                </span>
              </span>
            </Link>

            {/* User Data Section for Mobile */}
            <div className="border-t border-gray-300 mt-2 pt-4 scale-90">
              <UserData />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
