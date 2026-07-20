import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // buyer or owner
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user role in Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role,
        uid: user.uid,
      });

      alert("Signup successful!");
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Create Account</h2>
        
        {error && <p className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500" 
              required 
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">I am a:</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)} 
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="buyer">Buyer / Customer</option>
              <option value="owner">Property Owner</option>
            </select>
          </div>

          <button 
            type="submit" 
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-bold"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account? <Link to="/login" className="text-red-500 font-semibold">Login</Link>
        </p>
      </div>
    </div>
  );
}