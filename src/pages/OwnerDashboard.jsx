import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";

function OwnerDashboard() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOwnerProperties = async () => {
    try {
      const q = query(
        collection(db, "listings"),
        where("ownerId", "==", auth.currentUser?.uid || "anonymous")
      );
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map((docItem) => ({
        id: docItem.id,
        ...docItem.data(),
      }));
      setProperties(items);
    } catch (error) {
      console.error("Error fetching owner properties: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOwnerProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await deleteDoc(doc(db, "listings", id));
        setProperties(properties.filter((item) => item.id !== id));
        alert("Property deleted successfully!");
      } catch (error) {
        console.error("Error deleting property: ", error);
        alert("Failed to delete property.");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-10">Loading your properties...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Manage Your Properties</h1>

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">You have not listed any properties yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {properties.map((item) => (
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
                  onClick={() => handleDelete(item.id)}
                  className="w-full bg-red-500 text-white py-2 rounded font-bold hover:bg-red-600 transition"
                >
                  Delete Property
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OwnerDashboard;