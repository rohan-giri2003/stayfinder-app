import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ onLogout }) {
  const navigate = useNavigate();
  const [modalType, setModalType] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem("stayfinder_current_user")) || { 
    name: "Rohan Giri", 
    email: "rohangiri2003@gmail.com"
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("stayfinder_logged_in");
    localStorage.removeItem("stayfinder_current_user");
    if (onLogout) onLogout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-28 px-6 pt-6 relative">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-extrabold text-gray-900">Profile</h1>
          <button onClick={() => alert("You have 0 unread notifications.")} className="bg-white border p-2.5 rounded-full shadow-sm text-sm cursor-pointer">🔔</button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 mb-6">
          <div className="w-16 h-16 bg-red-100 text-red-600 font-extrabold text-2xl rounded-full flex items-center justify-center">
            {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "R"}
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{currentUser.name}</h2>
            <p className="text-gray-500 text-sm">{currentUser.email}</p>
            <span className="inline-block bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full mt-1">Verified User</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div onClick={() => setModalType("trips")} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-2xl mb-2 block">🧳</span>
            <h3 className="font-bold text-gray-800 text-sm">Past trips</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">0 Bookings</span>
          </div>

          <div onClick={() => setModalType("connections")} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:bg-gray-50 transition">
            <span className="text-2xl mb-2 block">👥</span>
            <h3 className="font-bold text-gray-800 text-sm">Connections</h3>
            <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-2 py-0.5 rounded-full mt-1 inline-block">0 Active</span>
          </div>
        </div>

        <div onClick={() => navigate("/add")} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between mb-6 cursor-pointer hover:bg-gray-50 transition">
          <div>
            <h3 className="font-bold text-gray-900 text-base">Become a host</h3>
            <p className="text-gray-500 text-xs mt-1">List your PG or rental appliances and earn extra income.</p>
          </div>
          <span className="text-3xl">🏠</span>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y">
          <div onClick={() => setModalType("settings")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>⚙️ Account settings</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("help")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>❓ Get help & support</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("view_profile")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👤 View profile details</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("privacy")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>✋ Privacy & Security</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("refer")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>👥 Refer a host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("cohost")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>🤝 Find a co-host</span>
            <span className="text-gray-400">›</span>
          </div>
          <div onClick={() => setModalType("legal")} className="p-4 flex justify-between items-center text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50">
            <span>📖 Legal & Policies</span>
            <span className="text-gray-400">›</span>
          </div>
          <div 
            onClick={handleLogoutClick}
            className="p-4 flex justify-between items-center text-sm font-bold text-red-500 cursor-pointer hover:bg-red-50"
          >
            <span>🚪 Log out</span>
            <span>›</span>
          </div>
        </div>
      </div>

      {modalType && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-md w-full shadow-lg max-h-[90vh] overflow-y-auto">
            
            {modalType === "settings" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">⚙️ Account Settings</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div>
                    <label className="font-semibold block text-xs text-gray-500 mb-1">Display Name</label>
                    <input type="text" defaultValue={currentUser.name} className="w-full border p-2.5 rounded-xl" />
                  </div>
                  <div>
                    <label className="font-semibold block text-xs text-gray-500 mb-1">Email Address</label>
                    <input type="email" defaultValue={currentUser.email} className="w-full border p-2.5 rounded-xl" />
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span>Email Notifications</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-red-500" />
                  </div>
                </div>
              </div>
            )}

            {modalType === "help" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">❓ Help & Support Center</h3>
                <p className="text-sm text-gray-600 mb-4">Need help with a PG booking or appliance rental? Our 24/7 support team is here for you.</p>
                <div className="bg-gray-50 p-4 rounded-xl text-xs space-y-2 text-gray-700">
                  <p>📧 Email: support@stayfinder.com</p>
                  <p>📞 Helpline: +91 1800-STAYFIND</p>
                </div>
              </div>
            )}

            {modalType === "view_profile" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">👤 Full Profile Details</h3>
                <div className="space-y-2 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl">
                  <p><strong>Name:</strong> {currentUser.name}</p>
                  <p><strong>Email:</strong> {currentUser.email}</p>
                  <p><strong>Account Type:</strong> Verified Renter / Guest</p>
                  <p><strong>Member Since:</strong> July 2026</p>
                </div>
              </div>
            )}

            {modalType === "privacy" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">✋ Privacy & Security</h3>
                <p className="text-sm text-gray-600">Your personal data, payment details, and rental agreements are fully encrypted using SSL/TLS protocols.</p>
              </div>
            )}

            {modalType === "refer" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">👥 Refer a Host</h3>
                <p className="text-sm text-gray-600 mb-3">Invite property owners to list their PGs or appliances on StayFinder and earn ₹1,000 per successful onboarding!</p>
                <input type="text" readOnly value="https://stayfinder.app/invite/rohan2026" className="w-full border p-2.5 rounded-xl bg-gray-50 text-xs font-mono text-center" />
              </div>
            )}

            {modalType === "cohost" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">🤝 Find a Co-Host</h3>
                <p className="text-sm text-gray-600">Connect with local property management partners in Bangalore, Mumbai, and Delhi.</p>
              </div>
            )}

            {modalType === "legal" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">📖 Legal & Policies</h3>
                <p className="text-xs text-gray-600 leading-relaxed">StayFinder operates as a digital rental marketplace connecting tenants with verified PG accommodations and appliance providers.</p>
              </div>
            )}

            {modalType === "trips" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">🧳 Past Trips & Bookings</h3>
                <p className="text-sm text-gray-500 text-center py-6">You haven't completed any bookings yet.</p>
              </div>
            )}

            {modalType === "connections" && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">👥 Connections & Co-Tenants</h3>
                <p className="text-sm text-gray-500 text-center py-6">No active roommate connections found.</p>
              </div>
            )}

            <button 
              onClick={() => setModalType(null)}
              className="w-full bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition mt-6 cursor-pointer"
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