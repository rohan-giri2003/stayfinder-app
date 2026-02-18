import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddProperty from "./pages/AddProperty";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import propertiesData from "./data/properties";

function App() {
  // Properties State
  const [properties, setProperties] = useState(propertiesData);

  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Wishlist State (with localStorage)
  const [wishlist, setWishlist] = useState(
    JSON.parse(localStorage.getItem("wishlist")) || []
  );

  // User Auth State (with localStorage)
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save Wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Save User to localStorage
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // Add Property
  const addProperty = (newProperty) => {
    setProperties([...properties, newProperty]);
  };

  // Wishlist Toggle
  const toggleWishlist = (property) => {
    const exists = wishlist.find((item) => item.id === property.id);

    if (exists) {
      setWishlist(wishlist.filter((item) => item.id !== property.id));
    } else {
      setWishlist([...wishlist, property]);
    }
  };

  // Login
  const login = (email) => {
    setUser({ email });
  };

  // Logout
  const logout = () => {
    setUser(null);
  };

  // Search Filter
  const filteredProperties = properties.filter((property) =>
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar
        setSearchTerm={setSearchTerm}
        wishlistCount={wishlist.length}
        user={user}
        logout={logout}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              properties={filteredProperties}
              toggleWishlist={toggleWishlist}
              wishlist={wishlist}
            />
          }
        />

        <Route
          path="/wishlist"
          element={
            <Wishlist
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          }
        />

        <Route
          path="/add"
          element={
            user ? (
              <AddProperty addProperty={addProperty} />
            ) : (
              <Login login={login} />
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;