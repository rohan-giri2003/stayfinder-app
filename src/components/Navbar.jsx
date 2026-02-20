import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check karna ki user login hai ya nahi
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out!");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-red-500 font-bold text-2xl">StayFinder</Link>
      
      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/add">Add Property</Link>
            <button 
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            to="/login" 
            className="bg-red-500 text-white px-6 py-2 rounded-full"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;