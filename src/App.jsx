import "./App.css";
import { Routes, Route } from "react-router";
import OnlyPrivate from "./components/OnlyPrivate";

// pages
import HomePage from "./pages/HomePage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import TripsListPage from "./pages/TripsListPage";
import TripDetailsPage from "./pages/TripDetailsPage";
import EditTripPage from "./pages/EditTripPage";
import CreateTripPage from "./pages/CreateTripPage";
import MyTripsPage from "./pages/MyTripsPage";
// components
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Footer from "./components/Footer";


function App() {
  return (
    <div>
      <Navbar />
       <Layout>
       
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        

        <Route path="/trips" element={<TripsListPage />} />
        <Route path="/trips/:tripId" element={<TripDetailsPage />} />
        <Route path="/trips/:tripId/edit" element={<OnlyPrivate><EditTripPage /></OnlyPrivate>}/>
        <Route path="/trips/create" element={<OnlyPrivate><CreateTripPage /></OnlyPrivate>}/>
        <Route path="/my-trips" element={<OnlyPrivate><MyTripsPage /></OnlyPrivate>}/>

        {/* error FE routes here... */}
      </Routes>
      </Layout>
        <Footer />
    </div>
  );
}

export default App;
