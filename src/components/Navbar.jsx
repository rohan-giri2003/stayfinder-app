import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold text-red-500">
        StayFinder
      </Link>

      <div className="flex gap-6 items-center">
        <Link to="/" className="hover:text-red-500">
          Home
        </Link>

        <Link to="/buyer-dashboard" className="hover:text-red-500">
          Dashboard
        </Link>

        <Link
          to="/login"
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;