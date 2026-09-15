import "./App.css";
import { Routes, Route } from "react-router";

// pages
import HomePage from "./pages/HomePage"
import Login from "./pages/auth/Login"
import Signup from "./pages/auth/Signup"
import PrivatePageExample from "./pages/PrivatePageExample";
import TripsListPage from "./pages/TripsListPage";
import TripDetailsPage from "./pages/TripDetailsPage";

// components
import Navbar from "./components/Navbar"

function App() {

  return (
    <div>
      <Navbar />

      <br />
      <hr />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private-page-example" element={<PrivatePageExample />} />

         <Route path="/trips" element={<TripsListPage />} />
      <Route path="/trips/:tripId" element={<TripDetailsPage />} />

        {/* error FE routes here... */}

      </Routes>
    </div>
  )
}

export default App
