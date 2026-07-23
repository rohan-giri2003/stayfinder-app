import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem("stayfinder_users")) || [];
    const validUser = existingUsers.find((u) => u.email === email && u.password === password);

    if (!validUser) {
      alert("Invalid email or password! Please check your credentials or sign up first.");
      return;
    }

    localStorage.setItem("stayfinder_logged_in", "true");
    localStorage.setItem("stayfinder_current_user", JSON.stringify(validUser));
    onLogin(validUser);
    navigate("/");
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail) {
      alert("Please enter your registered email.");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("stayfinder_users")) || [];
    const userExists = existingUsers.some((u) => u.email === resetEmail);

    if (userExists) {
      alert(`Password reset instructions sent to ${resetEmail}.`);
      setShowForgot(false);
      setResetEmail("");
    } else {
      alert("This email is not registered with StayFinder.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative">
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
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <button 
                type="button" 
                onClick={() => setShowForgot(true)}
                className="text-xs text-red-500 font-semibold hover:underline cursor-pointer"
              >
                Forgot password?
              </button>
            </div>
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
            className="w-full bg-red-500 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-red-600 transition shadow-sm mt-2 cursor-pointer"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-red-500 font-semibold hover:underline">Sign up</Link>
        </p>
      </div>

      {showForgot && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl max-w-sm w-full shadow-lg">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reset Password</h3>
            <p className="text-xs text-gray-500 mb-4">Enter your registered email address to receive password reset instructions.</p>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <input 
                type="email" 
                required
                placeholder="Enter your email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border p-3 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowForgot(false)}
                  className="w-1/2 bg-gray-200 text-gray-700 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="w-1/2 bg-red-500 text-white py-2.5 rounded-xl font-bold text-sm hover:bg-red-600 transition cursor-pointer"
                >
                  Send Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;