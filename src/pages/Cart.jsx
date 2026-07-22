import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cartItems, removeFromCart }) {
  const navigate = useNavigate();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [tncAccepted, setTncAccepted] = useState(false);

  const monthlyTotal = cartItems.reduce((acc, item) => acc + Number(item.price || 0), 0);
  const securityDeposit = cartItems.length > 0 ? 1000 * cartItems.length : 0;
  const grandTotal = Math.max(0, monthlyTotal + securityDeposit - discount);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === "RENT20") {
      setDiscount(500);
      alert("Coupon RENT20 applied successfully! ₹500 discount added.");
    } else {
      alert("Invalid coupon code. Try 'RENT20'.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-6">Explore available appliances and rent today.</p>
        <button 
          onClick={() => navigate("/buyer-dashboard")}
          className="bg-red-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-600 transition"
        >
          Browse Appliances
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Rental Cart Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded-lg" />
                <div>
                  <h4 className="font-bold text-gray-800">{item.title}</h4>
                  <p className="text-sm text-gray-500">Monthly Rent: ₹{item.price}</p>
                  <p className="text-xs text-gray-400">Refundable Deposit: ₹1000</p>
                </div>
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 text-sm font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="bg-white p-6 rounded-xl shadow-sm border mt-6">
            <h3 className="font-bold text-gray-800 mb-3">Apply Promotional Coupon</h3>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="Enter coupon code (e.g., RENT20)"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="border p-2.5 rounded-lg flex-grow text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
              />
              <button 
                onClick={applyCoupon}
                className="bg-gray-900 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-black transition"
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border h-fit space-y-4">
          <h3 className="font-bold text-lg text-gray-800 border-b pb-3">Price Breakup</h3>
          
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total Monthly Rent</span>
            <span>₹{monthlyTotal}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <span>Refundable Security Deposit</span>
            <span>₹{securityDeposit}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm text-green-600 font-semibold">
              <span>Coupon Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}

          <div className="border-t pt-3 flex justify-between font-extrabold text-lg text-gray-900">
            <span>Total Payable</span>
            <span>₹{grandTotal}</span>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2 cursor-pointer text-xs text-gray-600">
              <input 
                type="checkbox" 
                checked={tncAccepted} 
                onChange={(e) => setTncAccepted(e.target.checked)}
                className="mt-0.5" 
              />
              <span>I agree to the Terms & Conditions regarding monthly rental tenure, security deposit returns, and appliance maintenance rules.</span>
            </label>
          </div>

          <button
            onClick={() => {
              if (!tncAccepted) {
                alert("Please accept the Terms & Conditions to proceed.");
                return;
              }
              navigate("/checkout");
            }}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-bold text-center block hover:bg-red-600 transition"
          >
            Proceed to Delivery & Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;