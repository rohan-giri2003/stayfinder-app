import React from "react";
import { Link } from "react-router-dom";

function Navbar({ cartCount }) {
  return (
    <nav className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-extrabold text-red-500 tracking-wide">StayFinder</Link>
      
      <div className="flex gap-6 items-center text-sm font-medium">
        <Link to="/" className="text-gray-700 hover:text-red-500 transition">Home</Link>
        <Link to="/buyer-dashboard" className="text-gray-700 hover:text-red-500 transition">Buyer View</Link>
        <Link to="/owner-dashboard" className="text-gray-700 hover:text-red-500 transition">Owner Dashboard</Link>
        <Link to="/add" className="text-gray-700 hover:text-red-500 transition">List Appliance</Link>
        <Link to="/cart" className="text-gray-700 hover:text-red-500 transition relative">
          Cart {cartCount > 0 && <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full ml-1">{cartCount}</span>}
        </Link>
        <Link 
          to="/login" 
          className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition font-bold"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;