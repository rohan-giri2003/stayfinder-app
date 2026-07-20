import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer"); // Default role buyer rahega
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Firebase Auth mein account create karo
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Firestore database mein user ka role save karo
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        role: role, // "buyer" ya "owner"
        createdAt: new Date()
      });

      // 3. Success ke baad login page ya dashboard par bhej do
      if (role === "owner") {
        navigate("/owner-dashboard");
      } else {
        navigate("/buyer-dashboard");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSignup} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
        
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">I am a:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border p-2 rounded bg-white"
          >
            <option value="buyer">Buyer (Customer)</option>
            <option value="owner">Owner (Property Lister)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded font-bold hover:bg-red-600 mb-4">
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-red-500 font-bold">Login</Link>
        </p>
      </form>
    </div>
  );
}