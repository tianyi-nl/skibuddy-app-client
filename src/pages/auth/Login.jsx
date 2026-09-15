import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";


function Login() {

const { setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);


  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };
    try {
      // ... contact backend to validate the user's credentials

      const response = await service.post ("/auth/login", body)
      //const response = await axios.post(
       // `${import.meta.env.VITE_SERVER_URL}/api/auth/login`,
       // body,
      //);
      console.log(response);
      
      //store the token in localStorge
      localStorage.setItem("authToken", response.data.authToken);
      
      //update the auth states correctly
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      
      navigate("/my-trips");
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        // we should send the user to an error page
      }
    }
  };

  return (
    <div>
      <h1>Login Form</h1>

      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />

        <button type="submit">Login</button>
        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
