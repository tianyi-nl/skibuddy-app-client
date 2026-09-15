import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllTrips } from "../services/trip.services";

function TripsListPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getAllTrips()
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h1>Ski Trips</h1>
      {trips.map((trip) => (
        <div key={trip._id}>
          <h3>{trip.title}</h3>
          <p>{trip.location}, {trip.country}</p>
          <p>Created by: {trip.creator?.name}</p>
          <Link to={`/trips/${trip._id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
}

export default TripsListPage;