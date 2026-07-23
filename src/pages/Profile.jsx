import React from "react";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 pb-28 px-6 pt-6">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
          <button className="bg-white border p-2.5 rounded-full shadow-sm text-sm">🔔</button>
        </div>

        {/* User Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 font-extrabold text-2xl rounded-full flex items-center justify-center">
            R
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Rohan</h2>
            <p className="text-gray-500 text-sm">Guest</p>
          </div>
        </div>

        {/* Quick Menu Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-2xl mb-2 block">🧳</span>
            <h3 className="font-bold text-gray-800 text-sm">Past trips</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">NEW</span>
          </div>

          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-bold text-gray-800 text-sm">Connections</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">NEW</span>
          </div>
        </div>

        {/* Become a Host Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Become a host</h3>
            <p className="text-gray-500 text-xs mt-1">It's easy to start hosting and earn extra income.</p>
          </div>
          <span className="text-3xl">🏠</span>
        </div>

        {/* Settings List Matching Screenshot */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>⚙️ Account settings</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>❓ Get help</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👤 View profile</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>✋ Privacy</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👥 Refer a host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>🤝 Find a co-host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>📖 Legal</span>
            <span className="text-gray-400">›</span>
          </div>
          <div 
            onClick={() => {
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
    </div>
  );
}

export default Profile;