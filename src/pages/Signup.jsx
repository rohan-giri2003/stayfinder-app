import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Buyer");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    // Successful registration simulation matching your roadmap
    alert(`Account created successfully as ${role}!`);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create an Account</h2>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm bg-white focus:outline-none focus:ring-1 focus:ring-red-500"
            >
              <option value="Buyer">Buyer / Renter</option>
              <option value="Owner">Appliance Owner</option>
            </select>
          </div>

          <button 
            type="submit"
            className="w-full bg-red-500 text-white py-3 rounded-lg font-bold text-sm hover:bg-red-600 transition"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-red-500 font-semibold hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;