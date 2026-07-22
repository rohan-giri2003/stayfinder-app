import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-red-500">StayFinder</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>
        <Link to="/buyer-dashboard" className="text-gray-700 hover:text-red-500 font-medium">Buyer View</Link>
        <Link to="/owner-dashboard" className="text-gray-700 hover:text-red-500 font-medium">Owner Dashboard</Link>
        <Link to="/add" className="text-gray-700 hover:text-red-500 font-medium">List Appliance</Link>
        <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Login</Link>
      </div>
    </nav>
  );
}

export default Navbar;