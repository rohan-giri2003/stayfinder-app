import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Welcome back!");
      navigate("/");
    } catch (error) {
      alert("Invalid email or password!");
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <input 
          type="email" placeholder="Email" className="border w-full p-2 mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" placeholder="Password" className="border w-full p-2 mb-6 rounded"
          onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">
          Login
        </button>
        <p className="mt-4 text-center">
          New user? <Link to="/signup" className="text-red-500">Create Account</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;