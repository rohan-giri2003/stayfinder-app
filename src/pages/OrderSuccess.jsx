import React from "react";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-white p-10 rounded-2xl shadow-sm border max-w-md w-full">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 font-bold">
          ✓
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Confirmed!</h2>
        <p className="text-gray-600 text-sm mb-6">
          Thank you for renting with StayFinder. Your monthly subscription has been initialized.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg text-left text-sm space-y-2 border mb-6">
          <div className="font-bold text-gray-700">Delivery Status Tracker:</div>
          <div className="text-green-600 font-semibold">● Order Confirmed & Verified</div>
          <div className="text-gray-500">○ Quality Inspection & Sanitize</div>
          <div className="text-gray-500">○ Out for Installation</div>
          <div className="text-xs text-gray-400 mt-2">Estimated Delivery: Within 48 hours</div>
        </div>

        <button
          onClick={() => navigate("/buyer-dashboard")}
          className="w-full bg-black text-white py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;