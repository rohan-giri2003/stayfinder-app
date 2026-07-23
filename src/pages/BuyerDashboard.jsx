import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BuyerDashboard({ addToCart }) {
  const [city, setCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Real PG & Room listings for rent
  const pgListings = [
    {
      id: "pg-1",
      title: "Cozy Single Room PG in Koramangala",
      location: "Bangalore",
      type: "Single Room",
      price: 8500,
      deposit: 15000,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "pg-2",
      title: "Double Sharing Furnished Flat",
      location: "Mumbai",
      type: "Double Sharing",
      price: 12000,
      deposit: 24000,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "pg-3",
      title: "Working Professionals Luxury PG",
      location: "Bangalore",
      type: "Private Room",
      price: 9500,
      deposit: 18000,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "pg-4",
      title: "Budget Student Accommodation",
      location: "Delhi",
      type: "Triple Sharing",
      price: 6000,
      deposit: 10000,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=500&q=60"
    }
  ];

  const filteredProperties = pgListings.filter((item) => {
    const matchesCity = city === "All" || item.location === city;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Search & Filter Header */}
      <div className="bg-white border-b py-6 px-8 shadow-sm mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Find PGs, Rooms & Flats for Rent</h1>
            <p className="text-gray-500 text-sm mt-0.5">Explore verified rental properties with zero brokerage.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="border p-2.5 rounded-lg text-sm bg-white font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="All">📍 All Cities</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>

            <input 
              type="text" 
              placeholder="Search by locality or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2.5 rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>
      </div>

      {/* Property Cards Grid */}
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Available Properties ({filteredProperties.length})</h2>

        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <p className="text-gray-500 font-medium">No properties found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <div key={property.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {property.location}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      {property.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base text-gray-800">{property.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-md">
                        ★ {property.rating}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block">Monthly Rent</span>
                        <span className="text-lg font-extrabold text-red-500">₹{property.price} <span className="text-xs text-gray-500 font-normal">/ mo</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Security Deposit</span>
                        <span className="text-sm font-bold text-gray-700">₹{property.deposit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => {
                      if (addToCart) {
                        addToCart(property);
                        alert(`${property.title} added to your booking list!`);
                      } else {
                        navigate("/cart");
                      }
                    }}
                    className="w-full bg-red-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 transition shadow-sm"
                  >
                    Rent Now / Book Visit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BuyerDashboard;