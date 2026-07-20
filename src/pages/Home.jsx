import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import PropertyCard from "../components/PropertyCard";
import Hero from "../components/Hero";

export default function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "properties"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(data);
      } catch (err) {
        console.error("Error fetching properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStays();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Explore Stays</h2>

        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        ) : properties.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No properties found in database.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item.id} property={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}