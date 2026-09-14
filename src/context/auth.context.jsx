import React from "react";
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

const AuthContext = createContext();


function AuthWrapper({ children }) {
  //todo add the states and function here
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isVerifyingUser, setIsVerifyingUser] = useState(true);

  const verifyUser = async () => {
  

    const authToken = localStorage.getItem("authToken");

    try {
     // const response = await axios.get(
       // `${import.meta.env.VITE_SERVER - URL}/api/auth/verify`,
       // {
          //headers: {
            // authorization: `Bearer ${authToken}`,
          //},
       // },
     // );

     const response = await service.get()

      // the token is valid
      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);
      setIsVerifyingUser(false)
    } catch (error) {
      // the token is not valid

      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsVerifyingUser(false)
    }
  };

  useEffect(() => {
    verifyUser(); // we call this when the app loads for the first time to check if the user already has a valid
  }, []);

  const passedContext = {
    isLoggedIn,
    setIsLoggedIn,
    loggedUserId,
    setLoggedUserId,
    verifyUser,
  };

  if (isVerifyingUser) {
    return <h3>verifying user credentials ...</h3>;
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };