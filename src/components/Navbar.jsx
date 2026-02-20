// src/components/Navbar.jsx

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "15px", background: "#ff385c", color: "white" }}>
      <Link to="/" style={{ marginRight: "15px", color: "white" }}>
        Home
      </Link>

      <Link to="/dashboard" style={{ marginRight: "15px", color: "white" }}>
        Dashboard
      </Link>

      <Link to="/login" style={{ color: "white" }}>
        Login
      </Link>
    </nav>
  );
}

export default Navbar;