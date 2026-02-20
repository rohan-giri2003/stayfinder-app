import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty({ addNewProperty }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !location || !price || !preview) {
      alert("Please fill all fields");
      return;
    }

    const newProperty = {
      id: Date.now(),
      title,
      location,
      price,
      image: preview,
      rating: 4.5,
    };

    addNewProperty(newProperty);

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-6">Add New Property</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md max-w-md"
      >
        <input
          type="text"
          placeholder="Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border w-full p-2 mb-3 rounded"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4"
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full object-cover rounded mb-4"
          />
        )}

        <button
          type="submit"
          className="bg-black text-white w-full py-2 rounded hover:bg-gray-800 transition"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;