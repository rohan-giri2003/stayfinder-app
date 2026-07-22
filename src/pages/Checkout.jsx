import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cartItems, clearCart }) {
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMode, setPaymentMode] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    if (!address || !pincode) {
      alert("Please provide complete delivery address details.");
      return;
    }

    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      navigate("/order-success");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout & Payment</h1>

      <form onSubmit={handlePayment} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
          <h3 className="font-bold text-lg text-gray-800 border-b pb-2">1. Delivery Address</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
            <textarea
              required
              rows="3"
              placeholder="House/Flat No., Building, Street, Area"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
            <input
              type="text"
              required
              placeholder="e.g. 560001"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border p-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-red-500"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-gray-800 border-b pb-2 mb-4">2. Payment Method</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  value="UPI" 
                  checked={paymentMode === "UPI"} 
                  onChange={(e) => setPaymentMode(e.target.value)} 
                />
                <span className="font-medium text-sm">UPI (Google Pay / PhonePe / Paytm)</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  value="Card" 
                  checked={paymentMode === "Card"} 
                  onChange={(e) => setPaymentMode(e.target.value)} 
                />
                <span className="font-medium text-sm">Credit / Debit Card</span>
              </label>

              <label className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input 
                  type="radio" 
                  name="payment" 
                  value="COD" 
                  checked={paymentMode === "COD"} 
                  onChange={(e) => setPaymentMode(e.target.value)} 
                />
                <span className="font-medium text-sm">Pay on Delivery</span>
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-bold hover:bg-red-600 transition disabled:bg-gray-400 mt-6"
          >
            {processing ? "Processing Order..." : `Pay & Confirm Order via ${paymentMode}`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;