import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

function Navbar() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
    } catch (error) {
      console.error("Logout error: ", error);
    }
  };

  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-500">
        StayFinder
      </Link>
      <div className="flex gap-6 items-center font-medium text-gray-700">
        <Link to="/" className="hover:text-red-500 transition">Home</Link>
        <Link to="/buyer-dashboard" className="hover:text-red-500 transition">Buyer View</Link>
        <Link to="/owner-dashboard" className="hover:text-red-500 transition">Owner Dashboard</Link>
        <Link to="/add" className="hover:text-red-500 transition">List Appliance</Link>
        
        {auth.currentUser ? (
          <button 
            onClick={handleLogout}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;