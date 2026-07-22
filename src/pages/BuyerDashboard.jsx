import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function BuyerDashboard() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleRent = (item) => {
    alert(`Rental request initiated for ${item.title} at ₹${item.price}/month! Proceeding to checkout...`);
    // Yahan par aap cart ya payment page par navigate kar sakte hain
  };

  if (loading) {
    return <div className="text-center p-10">Loading available rentals...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Available Rentals for You</h1>

      {listings.length === 0 ? (
        <p className="text-center text-gray-500">No properties available for rent right now.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {listings.map((item) => (
            <div key={item.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-xl mb-1">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.location}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-red-500 font-bold">₹{item.price} / month</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                    ★ {item.rating}
                  </span>
                </div>
                <button
                  onClick={() => handleRent(item)}
                  className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-blue-600 transition"
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BuyerDashboard;