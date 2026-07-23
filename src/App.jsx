import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import BuyerDashboard from "./pages/BuyerDashboard";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import BottomNav from "./components/BottomNav";

function App() {
  const [cart, setCart] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
  };

  return (
    <Router>
      <Routes>
        {!isAuthenticated ? (
          <>
            <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<BuyerDashboard addToCart={addToCart} />} />
            <Route path="/wishlists" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/trips" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
            <Route path="/messages" element={<div className="p-16 text-center font-bold text-gray-500 text-lg">No new messages</div>} />
            <Route path="/profile" element={<Profile onLogout={() => setIsAuthenticated(false)} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {isAuthenticated && <BottomNav />}
    </Router>
  );
}

export default App;