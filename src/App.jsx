import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your components and pages
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
// If you need other pages like PropertyDetails, import them here

function App() {
  return (
    <div>
      {/* Navbar sits outside Routes so it appears on every page */}
      <Navbar />
      
      <Routes>
        {/* Your actual application routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Add more routes later as needed */}
      </Routes>
    </div>
  );
}

export default App;