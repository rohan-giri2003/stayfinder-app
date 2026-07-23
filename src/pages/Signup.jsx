import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    // Save user details to localStorage to simulate a real backend database
    const existingUsers = JSON.parse(localStorage.getItem("stayfinder_users")) || [];
    const userExists = existingUsers.some((u) => u.email === email);

    if (userExists) {
      alert("User with this email already exists! Please login.");
      navigate("/login");
      return;
    }

    existingUsers.push({ name, email, password });
    localStorage.setItem("stayfinder_users", JSON.stringify(existingUsers));
    
    alert("Account created successfully! Please login with your credentials.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-sm border max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-center text-gray-900 mb-2">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Join StayFinder to rent stays & PGs</p>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              placeholder="Rohan Giri"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">Password (min 6 chars)</label>
            <input 
              type="password" 
              required
              minLength="6"
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
            Sign up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="text-red-500 font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;