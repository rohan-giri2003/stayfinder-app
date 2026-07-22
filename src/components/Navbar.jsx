import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-red-500">StayFinder</Link>
      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-red-500">Home</Link>
        
        {user ? (
          <>
            <Link to="/buyer-dashboard" className="text-gray-700 hover:text-red-500">Browse Rentals</Link>
            <Link to="/owner-dashboard" className="text-gray-700 hover:text-red-500">Manage Properties</Link>
            <Link to="/add" className="text-gray-700 hover:text-red-500">Add Property</Link>
            <button 
              onClick={handleLogout} 
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;