import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const body = {
      email,
      password,
      name: username,
    };

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/auth/signup`,body)
      console.log("all good user created")
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
      <h1>Signup Form</h1>

      <form onSubmit={handleSignup}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
