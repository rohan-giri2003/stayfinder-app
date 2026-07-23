import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ addToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  // Mock professional rental catalog data matching your app requirements
  const allListings = [
    {
      id: "1",
      title: "Double Door Refrigerator",
      category: "Appliances",
      location: "Bangalore",
      price: 1200,
      deposit: 1000,
      rating: 4.5,
      imageUrl: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd38?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "2",
      title: "Automatic Washing Machine",
      category: "Appliances",
      location: "Mumbai",
      price: 900,
      deposit: 800,
      rating: 4.8,
      imageUrl: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "3",
      title: "Split AC 1.5 Ton Inverter",
      category: "Cooling",
      location: "Bangalore",
      price: 1500,
      deposit: 1500,
      rating: 4.7,
      imageUrl: "https://images.unsplash.com/photo-1615743467472-83b632906b3a?auto=format&fit=crop&w=500&q=60"
    },
    {
      id: "4",
      title: "Air Cooler 50L Heavy Duty",
      category: "Cooling",
      location: "Delhi",
      price: 600,
      deposit: 500,
      rating: 4.2,
      imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=500&q=60"
    }
  ];

  // Filter listings based on search, location, and category
  const filteredListings = allListings.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = selectedLocation === "All" || item.location === selectedLocation;
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesLocation && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Search & Filter Section */}
      <div className="bg-white border-b py-8 px-6 shadow-sm mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Rent Appliances Monthly</h1>
            <p className="text-gray-500 text-sm mt-1">Flexible rentals for your home without the heavy price tag.</p>
          </div>

          {/* Location & Search Controls */}
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select 
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
            >
              <option value="All">📍 All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Delhi">Delhi</option>
            </select>

            <input 
              type="text" 
              placeholder="Search fridge, AC, washing machine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2.5 rounded-lg text-sm w-full md:w-72 focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="max-w-7xl mx-auto flex gap-3 mt-6 overflow-x-auto pb-2">
          {["All", "Appliances", "Cooling"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition ${
                selectedCategory === cat 
                  ? "bg-red-500 text-white shadow-sm" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid Section */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Available Rentals ({filteredListings.length})</h2>
          <button 
            onClick={() => navigate("/add")}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-black transition"
          >
            + List New Appliance
          </button>
        </div>

        {filteredListings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl border">
            <p className="text-gray-500 font-medium">No appliances found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="relative">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-52 object-cover" 
                    />
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-md">
                      {item.location}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-md">
                        ★ {item.rating}
                      </span>
                    </div>

                    <div className="mt-4 pt-3 border-t flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block">Monthly Rent</span>
                        <span className="text-xl font-extrabold text-red-500">₹{item.price} <span className="text-xs text-gray-500 font-normal">/ mo</span></span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">Deposit</span>
                        <span className="text-sm font-bold text-gray-700">₹{item.deposit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button 
                    onClick={() => {
                      if (addToCart) {
                        addToCart(item);
                        alert(`${item.title} added to cart!`);
                      } else {
                        navigate("/cart");
                      }
                    }}
                    className="w-full bg-red-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-600 transition shadow-sm"
                  >
                    Add to Cart & Rent
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

export default Home;