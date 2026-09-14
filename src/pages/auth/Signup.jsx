import { useState } from "react";

function Signup() {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();

    // ... contact backend to register the user
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
