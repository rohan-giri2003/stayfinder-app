import React from "react";
import { Link } from "react-router-dom";

export default function PropertyCard({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <img
        src={property.imageUrl || "https://via.placeholder.com/300"}
        alt={property.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-800 truncate">{property.title || "Beautiful Stay"}</h3>
        <p className="text-gray-500 text-sm mt-1">{property.location || "India"}</p>
        <p className="text-gray-900 font-semibold mt-3">
          Rs. {property.price || "N/A"} <span className="text-sm font-normal text-gray-500">/ night</span>
        </p>
      </div>
    </div>
  );
}