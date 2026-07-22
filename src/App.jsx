import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerDashboard from "./pages/BuyerDashboard";
import OwnerDashboard from "./pages/OwnerDashboard";
import AddProperty from "./pages/AddProperty";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const exists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (exists) {
        return prevItems;
      }
      return [...prevItems, item];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard addToCart={addToCart} />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/add" element={<AddProperty />} />
        <Route 
          path="/cart" 
          element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} 
        />
        <Route 
          path="/checkout" 
          element={<Checkout cartItems={cartItems} clearCart={clearCart} />} 
        />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;