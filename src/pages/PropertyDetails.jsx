import React from "react";
import { useParams } from "react-router-dom";

function PropertyDetails({ properties }) {
  const { id } = useParams();

  const property = properties.find(
    (p) => p.id.toString() === id
  );

  if (!property) {
    return <h2 className="p-10">Property not found</h2>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="h-96 w-full object-cover"
        />

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-2">
            {property.title}
          </h1>

          <p className="text-gray-600 text-lg">
            📍 {property.location}
          </p>

          <p className="text-xl font-bold mt-4">
            ₹{property.price} / night
          </p>

          <p className="text-yellow-500 text-lg mt-2">
            ⭐ {property.rating}
          </p>

          <p className="mt-6 text-gray-700">
            This is a beautiful stay perfect for
            vacations, work-from-home, and weekend
            getaways.
          </p>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;