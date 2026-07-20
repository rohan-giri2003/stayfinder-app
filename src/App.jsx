import React from "react";
import { Routes, Route } from "react-router-dom";

// Abhi ke liye inko comment rakhte hain check karne ke liye
// import Navbar from "./components/Navbar"; 
// import Home from "./pages/Home";

function App() {
  return (
    <div>
      <h1 style={{textAlign: 'center', marginTop: '50px'}}>
        Bhai, agar ye dikh raha hai toh Router setup sahi hai!
      </h1>
      <p style={{textAlign: 'center'}}>
        Ab ek-ek karke Navbar aur Home ko uncomment karenge.
      </p>
      <Routes>
        <Route path="/" element={<div>Home Page Test</div>} />
      </Routes>
    </div>
  );
}

export default App;