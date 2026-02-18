import { Link } from "react-router-dom";

function Navbar({ setSearchTerm, wishlistCount, user, logout }) {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">

      {/* Logo */}
      <Link to="/" className="text-xl font-bold">
        StayFinder
      </Link>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search location..."
        className="border px-4 py-2 rounded-full w-64"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {/* Wishlist */}
        <Link to="/wishlist" className="font-semibold">
          ❤️ Wishlist ({wishlistCount})
        </Link>

        {/* Auth Button */}
        {user ? (
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/add"
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Login
          </Link>
        )}

      </div>

    </nav>
  );
}

export default Navbar;