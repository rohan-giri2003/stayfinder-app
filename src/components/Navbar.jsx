import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-500">
        StayFinder
      </Link>
      <div className="flex gap-6 items-center font-medium text-gray-700">
        <Link to="/" className="hover:text-red-500 transition">Home</Link>
        <Link to="/buyer-dashboard" className="hover:text-red-500 transition">Buyer Dashboard</Link>
        <Link to="/owner-dashboard" className="hover:text-red-500 transition">Owner Dashboard</Link>
        <Link to="/add" className="hover:text-red-500 transition">Add Property</Link>
        <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;