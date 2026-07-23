import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function BuyerDashboard({ addToCart }) {
  const [city, setCity] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("Stays");
  const navigate = useNavigate();

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
    }
  ];

  const applianceListings = [
    {
      id: "app-1",
      title: "Double Door Refrigerator",
      location: "Bangalore",
      type: "Appliance",
      price: 1200,
      deposit: 1000,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd38?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "app-2",
      title: "Automatic Washing Machine",
      location: "Mumbai",
      type: "Appliance",
      price: 900,
      deposit: 800,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "app-3",
      title: "Split AC 1.5 Ton Inverter",
      location: "Bangalore",
      type: "Cooling",
      price: 1500,
      deposit: 1500,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1615743467472-83b632906b3a?auto=format&fit=crop&w=500&q=60"
    }
  ];

  const currentData = category === "Stays" ? pgListings : applianceListings;

  const filteredItems = currentData.filter((item) => {
    const matchesCity = city === "All" || item.location === city;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-28">
      <div className="bg-white border-b py-6 px-8 shadow-sm mb-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">Explore Stays & Rental Appliances</h1>
            <p className="text-gray-500 text-sm mt-0.5">Find a place to stay and add appliances for your home easily.</p>
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              className="border p-2.5 rounded-xl text-sm bg-white font-medium focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="All">📍 All Cities</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>

            <input 
              type="text" 
              placeholder="Search stay or appliance..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2.5 rounded-xl text-sm w-full md:w-72 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex gap-3 mt-6">
          <button
            onClick={() => setCategory("Stays")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              category === "Stays" 
                ? "bg-red-500 text-white shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🏠 PGs & Stays
          </button>
          <button
            onClick={() => setCategory("Appliances")}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              category === "Appliances" 
                ? "bg-red-500 text-white shadow-sm" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            🛋️ Rental Appliances
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            {category === "Stays" ? "Available Stays & Rooms" : "Available Appliances for Rent"} ({filteredItems.length})
          </h2>
          <button 
            onClick={() => navigate("/add")}
            className="bg-gray-900 text-white px-4 py-2.5 rounded-xl text-xs font-bold hover:bg-black transition shadow-sm cursor-pointer"
          >
            + List Property / Appliance
          </button>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border">
            <p className="text-gray-500 font-medium">No items found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="relative">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.location}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-md">
                      {item.type}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-base text-gray-800">{item.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-0.5 rounded-md">
                        ★ {item.rating}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block">Monthly Rent</span>
                        <span className="text-lg font-extrabold text-red-500">₹{item.price} <span className="text-xs text-gray-500 font-normal">/ mo</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Security Deposit</span>
                        <span className="text-sm font-bold text-gray-700">₹{item.deposit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => {
                      addToCart(item);
                      alert(`${item.title} added to your cart!`);
                    }}
                    className="w-full bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition shadow-sm cursor-pointer"
                  >
                    {category === "Stays" ? "Book Stay & Add to Cart" : "Rent Appliance"}
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