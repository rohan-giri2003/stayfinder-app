import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Check credentials against registered users in localStorage
    const existingUsers = JSON.parse(localStorage.getItem("stayfinder_users")) || [];
    const validUser = existingUsers.find((u) => u.email === email && u.password === password);

    if (!validUser) {
      alert("Invalid email or password! Please check your credentials or sign up first.");
      return;
    }

    // Save active user info
    localStorage.setItem("stayfinder_current_user", JSON.stringify(validUser));
    onLogin(validUser);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Welcome to StayFinder</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Log in to your account</p>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition shadow-sm mt-2"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-red-500 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;