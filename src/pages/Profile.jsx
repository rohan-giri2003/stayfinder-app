import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  // Get current logged in user details if available
  const currentUser = JSON.parse(localStorage.getItem("stayfinder_current_user")) || { name: "Rohan Giri", email: "rohangiri2003@gmail.com" };

  return (
    <div className="min-h-screen bg-gray-50 pb-28 px-6 pt-6 relative">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
          <button onClick={() => alert("No new notifications")} className="bg-white border p-2.5 rounded-full shadow-sm text-sm cursor-pointer">🔔</button>
        </div>

        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 font-extrabold text-2xl rounded-full flex items-center justify-center">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "R"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-500 text-sm">{currentUser.email}</p>
          </div>
        </div>

        {/* Quick Menu Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div onClick={() => alert("No past trips found. Book your first stay!")} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-2xl mb-2 block">🧳</span>
            <h3 className="font-bold text-gray-800 text-sm">Past trips</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">NEW</span>
          </div>

          <div onClick={() => alert("Your connections list is empty.")} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-bold text-gray-800 text-sm">Connections</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">NEW</span>
          </div>
        </div>

        {/* Become a Host Card */}
        <div onClick={() => navigate("/add")} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-6 cursor-pointer hover:bg-gray-50 transition">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Become a host</h3>
            <p className="text-gray-500 text-xs mt-1">It's easy to start hosting and earn extra income.</p>
          </div>
          <span className="text-3xl">🏠</span>
        </div>

        {/* Interactive Settings List */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
          <div onClick={() => setActiveModal("Account Settings")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>⚙️ Account settings</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setActiveModal("Get Help & Support")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>❓ Get help</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setActiveModal("View Profile Details")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👤 View profile</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setActiveModal("Privacy & Sharing")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>✋ Privacy</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => alert("Referral link copied to clipboard!")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👥 Refer a host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => alert("Co-host matching feature coming soon.")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>🤝 Find a co-host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setActiveModal("Legal Terms")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>📖 Legal</span>
            <span className="text-gray-400">›</span>
          </div>
          <div 
            onClick={() => {
              localStorage.removeItem("stayfinder_current_user");
              if(onLogout) onLogout();
              navigate("/login");
            }}
            className="p-4 flex justify-between items-center text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50"
          >
            <span>🚪 Log out</span>
            <span>›</span>
          </div>
        </div>
      </div>

      {/* Interactive Modal Popup for Settings */}
      {activeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{activeModal}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {activeModal === "Account Settings" && "Manage your email, password, and notification preferences securely."}
              {activeModal === "Get Help & Support" && "Contact our 24/7 customer support team at support@stayfinder.com"}
              {activeModal === "View Profile Details" && `Name: ${currentUser.name}\nEmail: ${currentUser.email}\nRole: Verified Guest`}
              {activeModal === "Privacy & Sharing" && "Your personal data is encrypted and secure with us."}
              {activeModal === "Legal Terms" && "StayFinder Rental Terms & Conditions v2.4 apply to all bookings."}
            </p>
            <button 
              onClick={() => setActiveModal(null)}
              className="w-full bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;