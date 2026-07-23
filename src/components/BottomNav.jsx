import React from "react";
import { Link, useLocation } from "react-router-dom";

function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2.5 px-6 flex justify-around items-center z-50 shadow-lg">
      <Link to="/" className={`flex flex-col items-center text-xs font-semibold ${path === "/" ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}>
        <span className="text-xl">🔍</span>
        <span className="mt-0.5">Explore</span>
      </Link>
      
      <Link to="/wishlists" className={`flex flex-col items-center text-xs font-semibold ${path === "/wishlists" ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}>
        <span className="text-xl">🤍</span>
        <span className="mt-0.5">Wishlists</span>
      </Link>
      
      <Link to="/trips" className={`flex flex-col items-center text-xs font-semibold ${path === "/trips" ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}>
        <span className="text-xl">✈️</span>
        <span className="mt-0.5">Trips</span>
      </Link>
      
      <Link to="/messages" className={`flex flex-col items-center text-xs font-semibold ${path === "/messages" ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}>
        <span className="text-xl">💬</span>
        <span className="mt-0.5">Messages</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center text-xs font-semibold ${path === "/profile" ? "text-red-500" : "text-gray-500 hover:text-gray-800"}`}>
        <span className="text-xl">👤</span>
        <span className="mt-0.5">Profile</span>
      </Link>
    </div>
  );
}

export default BottomNav;