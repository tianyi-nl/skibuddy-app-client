import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setLoggedUserId } =
    useContext(AuthContext);

  const handelLogout = () => {
    localStorage.removeItem("authToken");

    setIsLoggedIn(false);
    setLoggedUserId(null);

    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>

      {!isLoggedIn && <Link to="/signup">Signup</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}

      {isLoggedIn && (
        <Link to="/private-page-example">Private Page Example</Link>
      )}
      {isLoggedIn && <button onClick={handelLogout}>Logout</button>}
    </nav>
  );
}

export default Navbar;
