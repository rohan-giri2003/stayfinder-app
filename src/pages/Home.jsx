import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import PropertyCard from "../components/PropertyCard";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

function Home() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "listings"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProperties(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <Hero />
      <div className="p-10">
        <h2 className="text-2xl font-bold mb-6">Explore Stays</h2>
        {loading ? (
          <p>Loading properties...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {properties.map((item) => (
              <PropertyCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;