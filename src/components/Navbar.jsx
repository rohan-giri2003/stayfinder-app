import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-red-500 font-bold text-2xl">StayFinder</Link>
      
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-700 hover:text-red-500 font-medium">Home</Link>
        <Link to="/dashboard" className="text-gray-700 hover:text-red-500 font-medium">Dashboard</Link>
        <Link to="/add" className="text-gray-700 hover:text-red-500 font-medium">Add Property</Link>
        <Link to="/login" className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition">
          Login / Signup
        </Link>
      </div>
    </nav>
  );
}