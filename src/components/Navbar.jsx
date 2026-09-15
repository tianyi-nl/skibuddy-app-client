import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setLoggedUserId(null);
    navigate("/");
  };

  return (
   <nav className="sticky top-0 z-50 flex items-center justify-between bg-white px-16 py-4">
      {/* Left — logo/brand placeholder */}
      <div className="text-bg-blue-600 font-bold text-lg">SkiBuddy</div>

      {/* Center — nav links */}
      <div className="flex gap-8 text-black font-medium text-lg">
        <Link to="/" className="hover:text-blue-600 transition">Home</Link>
        <Link to="/trips" className="hover:text-blue-200 transition">Ski Trips</Link>
        {isLoggedIn && (
          <Link to="/my-trips" className="hover:text-blue-200 transition">My Trips</Link>
        )}
      </div>

      {/* Right — auth actions */}
      <div className="flex gap-4 items-center">
        {!isLoggedIn && (
          <Link
            to="/signup"
            className="text-white font-medium hover:text-blue-200 transition"
          >
            Signup
          </Link>
        )}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Login
          </Link>
        )}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 font-semibold px-4 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;