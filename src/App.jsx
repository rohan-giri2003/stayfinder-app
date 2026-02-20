import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import BuyerDashboard from "./pages/BuyerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import propertiesData from "./data/properties";

function App() {
  const [properties, setProperties] = useState(propertiesData);

  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home properties={properties} />} />
        <Route
          path="/owner-dashboard"
          element={<OwnerDashboard addProperty={addProperty} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;