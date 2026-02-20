import { useState } from "react";

function OwnerDashboard({ addProperty }) {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({
        ...formData,
        image: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imageURL = URL.createObjectURL(formData.image);

    const newProperty = {
      id: Date.now(),
      title: formData.title,
      location: formData.location,
      price: formData.price,
      image: imageURL,
    };

    addProperty(newProperty);

    alert("Property Added Successfully ✅");

    setFormData({
      title: "",
      location: "",
      price: "",
      image: null,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Owner Dashboard</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded-lg"
        />

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          required
          className="w-full"
        />

        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
        >
          Add Property
        </button>
      </form>
    </div>
  );
}

export default OwnerDashboard;