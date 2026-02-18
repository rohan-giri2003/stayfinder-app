import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddProperty({ addProperty }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    rating: "",
    image: ""
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 📸 Image Upload Handler
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          image: reader.result
        });
        setPreview(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProperty = {
      ...formData,
      id: Date.now()
    };

    addProperty(newProperty);
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add New Property
        </h2>

        <input
          type="text"
          name="title"
          placeholder="Property Title"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="price"
          placeholder="Price"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (4.5)"
          step="0.1"
          className="w-full border p-3 rounded-lg mb-4"
          onChange={handleChange}
          required
        />

        {/* 📸 Image Upload */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleImageChange}
          required
        />

        {/* Preview */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded-lg"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default AddProperty;