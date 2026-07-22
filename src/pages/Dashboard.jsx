import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function BuyerDashboard({ addToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addedIds, setAddedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppliances = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(data);
      } catch (error) {
        console.error("Error fetching appliances:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliances();
  }, []);

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedIds((prev) => [...prev, item.id]);
  };

  if (loading) {
    return <div className="text-center py-20 font-semibold text-gray-600">Loading appliances for rent...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Monthly Appliance Rentals</h1>
          <p className="text-gray-500 mt-1">Select appliances, add to cart, and schedule delivery.</p>
        </div>
        <button 
          onClick={() => navigate("/cart")} 
          className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition font-medium"
        >
          View Cart
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-xl shadow-sm border">
          <p className="text-gray-500">No appliances listed yet. Switch to Owner View to list an appliance.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isAdded = addedIds.includes(item.id);
            return (
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
                    <p className="text-sm text-gray-500 mb-4">{item.location || "Available for home delivery"}</p>
                    <div className="border-t pt-3 flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block">Rent Monthly</span>
                        <span className="text-xl font-extrabold text-red-500">₹{item.price} <span className="text-xs text-gray-500 font-normal">/ mo</span></span>
                      </div>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Refurbished & Tested</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={isAdded}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                      isAdded 
                        ? "bg-green-600 text-white cursor-default" 
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    {isAdded ? "Added to Cart ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;