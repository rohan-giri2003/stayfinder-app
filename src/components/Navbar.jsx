import React, { useState, useEffect } from "react";
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
    alert("Bhai, logout ho gaya!");
    navigate("/login");
  };

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <Link to="/" className="text-red-500 font-bold text-2xl">StayFinder</Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="text-gray-700">Home</Link>
        {user ? (
          <>
            <Link to="/add" className="text-gray-700">Add Property</Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full">Logout</button>
          </>
        ) : (
          <Link to="/login" className="bg-red-500 text-white px-6 py-2 rounded-full">Login</Link>
        )}
      </div>
    </nav>
  );
}
export default Navbar;