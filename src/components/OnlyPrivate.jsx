import React from 'react'
import { AuthContext } from '../context/auth.context'
import { Navigate } from 'react-router-dom'



//this component will protect pages from being accessed by users that are not logged in

function OnlyPrivate(props) {
  
  const { isLoggedIn}= useContext(AuthContext)
  if (isLoggedIn){
    return props.children // you can check the page
  } else {
    return <Navigate to = "/login"/>
   }
  
  
    return props.children
}

export default OnlyPrivate