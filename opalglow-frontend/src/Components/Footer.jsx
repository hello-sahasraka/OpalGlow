import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-200/90 text-gray-700 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-rose-500">OpalGlow</h2>
          <p className="mt-3 text-sm text-gray-500">
            Luxury cosmetics crafted to bring out your natural radiance.  
            Discover skincare, haircare, and beauty designed for every day.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-rose-500 transition"><Facebook size={20} /></a>
            <a href="#" className="hover:text-rose-500 transition"><Instagram size={20} /></a>
            <a href="#" className="hover:text-rose-500 transition"><Twitter size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/products" className="hover:text-rose-500">Products</Link></li>
            <li><Link to="/about" className="hover:text-rose-500">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-rose-500">Contact</Link></li>
            <li><Link to="/blog" className="hover:text-rose-500">Beauty Blog</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Care</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-rose-500">FAQ</a></li>
            <li><a href="#" className="hover:text-rose-500">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-rose-500">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-rose-500">Terms of Service</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <MapPin size={16} /> <span>123 Beauty St, Colombo, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> <span>+94 77 123 4567</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} /> <span>support@opalglow.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} OpalGlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
