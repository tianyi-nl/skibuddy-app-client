import { Link } from "react-router-dom";

function Navbar() {

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/login">Login</Link>
      <Link to="/private-page-example">Private Page Example</Link>
      <Link>Logout</Link>
    </nav>
  );
}

export default Navbar;
