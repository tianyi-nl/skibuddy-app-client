import { useState, useEffect } from "react";
import { getAllTrips } from "../services/trip.services";
import HeroVideo from "../components/HeroVideo";
import ComingTripsSection from "../components/ComingTripsSection";
import SearchBar from "../components/SearchBar";
import CreatorSection from "../components/CreatorSection";

function HomePage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getAllTrips()
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <HeroVideo />
      <ComingTripsSection trips={trips} />
      <SearchBar />
      <CreatorSection trips={trips} />
    </div>
  );
}

export default HomePage;
