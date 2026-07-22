import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Home({ addToCart }) {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const items = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setListings(items);
      } catch (error) {
        console.error("Error fetching listings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="text-center py-20 font-semibold text-gray-600">Loading available rentals...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Available Appliances for Rent</h1>
          <p className="text-gray-500 mt-1">Browse monthly rentals and add them to your cart.</p>
        </div>
        <button 
          onClick={() => navigate("/add")}
          className="bg-red-500 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-red-600 transition"
        >
          List New Appliance
        </button>
      </div>

      {listings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border">
          <p className="text-gray-500 mb-4">No appliances listed yet. Click below to add your first item.</p>
          <button 
            onClick={() => navigate("/add")}
            className="bg-black text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gray-800 transition"
          >
            List Appliance
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between">
              <div>
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-52 object-cover" 
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                      ★ {item.rating || "4.5"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{item.location}</p>
                  <div className="border-t pt-3 flex justify-between items-center">
                    <div>
                      <span className="text-xs text-gray-400 block">Monthly Rent</span>
                      <span className="text-xl font-extrabold text-red-500">₹{item.price} <span className="text-xs text-gray-500 font-normal">/ mo</span></span>
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
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-600 transition"
                >
                  Add to Cart & Rent
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;