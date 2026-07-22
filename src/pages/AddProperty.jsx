import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function AddProperty() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  // Image ko Base64 string mein convert karne ke liye taaki bina storage ke save ho sake
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result); // Base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !location || !price || !preview) {
      alert("Bhai, saari details aur photo bharna zaroori hai!");
      return;
    }

    setLoading(true);

    try {
      // Direct Firestore mein data aur image ka preview URL save kar do
      await addDoc(collection(db, "listings"), {
        title,
        location,
        price: Number(price),
        imageUrl: preview,
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        ownerId: auth.currentUser?.uid || "anonymous",
        createdAt: new Date()
      });

      alert("Property successfully add ho gayi!");
      navigate("/");
    } catch (error) {
      console.error("Error adding property: ", error);
      alert("Kuch gadbad ho gayi!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Property</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Property Title</label>
          <input 
            type="text" 
            placeholder="e.g. Modern Appliance Setup" 
            className="border w-full p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Location</label>
          <input 
            type="text" 
            placeholder="e.g. Bangalore" 
            className="border w-full p-2 rounded"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price per month (₹)</label>
          <input 
            type="number" 
            placeholder="1500" 
            className="border w-full p-2 rounded"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="mb-3" />
          {preview && <img src={preview} alt="Preview" className="w-full h-40 object-cover rounded" />}
        </div>

        <button 
          disabled={loading}
          type="submit" 
          className={`w-full text-white p-3 rounded-lg font-bold transition ${loading ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {loading ? "Adding..." : "List Property"}
        </button>
      </form>
    </div>
  );
}

export default AddProperty;