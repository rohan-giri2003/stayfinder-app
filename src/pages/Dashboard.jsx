import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ user }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to your Dashboard 🎉
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">
          Logged in as: {user}
        </h2>

        <p className="mt-3 text-gray-600">
          Manage your properties and grow your listings.
        </p>

        <button
          onClick={() => navigate("/add-property")}
          className="mt-6 bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          + Add Property
        </button>
      </div>
    </div>
  );
}

export default Dashboard;