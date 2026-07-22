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
        console.error("Error fetching listings: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) {
    return <div className="text-center p-20 font-semibold text-gray-600">Loading available rentals...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Available Appliances for Rent</h1>
        <button 
          onClick={() => navigate("/add")}
          className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
        >
          List New Appliance
        </button>
      </div>

      {listings.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl border">
          <p className="text-gray-500 mb-4">No properties listed yet. Click below to add an appliance.</p>
          <button 
            onClick={() => navigate("/add")}
            className="bg-red-500 text-white px-5 py-2.5 rounded-lg font-bold text-sm"
          >
            List Appliance
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col justify-between">
              <div>
                <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-xl text-gray-800 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">{item.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-red-500 font-extrabold text-lg">₹{item.price} <span className="text-xs text-gray-500 font-normal">/ month</span></span>
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded font-bold">
                      ★ {item.rating}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 pt-0">
                <button 
                  onClick={() => {
                    addToCart ? addToCart(item) : navigate("/cart");
                  }}
                  className="w-full bg-red-500 text-white py-2.5 rounded-lg font-bold text-sm hover:bg-red-600 transition"
                >
                  Rent Now / Add to Cart
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