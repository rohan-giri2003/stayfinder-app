import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddProperty() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !location || !price || !preview) {
      alert("Please fill all details and upload an image!");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "listings"), {
        title,
        location,
        price: Number(price),
        imageUrl: preview,
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        createdAt: new Date()
      });

      alert("Appliance listed successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("Failed to list appliance. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">List an Appliance for Rent</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Appliance Title</label>
          <input 
            type="text" 
            placeholder="e.g. Double Door Refrigerator" 
            className="border w-full p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Location</label>
          <input 
            type="text" 
            placeholder="e.g. Bangalore" 
            className="border w-full p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Monthly Rent (₹)</label>
          <input 
            type="number" 
            placeholder="1200" 
            className="border w-full p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3 text-sm" />
          {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded-lg border" />}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className="w-full bg-red-500 text-white p-3 rounded-lg font-bold text-sm hover:bg-red-600 transition disabled:bg-gray-400"
        >
          {loading ? "Listing..." : "Submit Appliance"}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;