import { useState, useEffect } from "react";
import { getAllTrips } from "../services/trip.services";
import TripCard from "../components/TripCard";

function TripsListPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    getAllTrips()
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ski Trips</h1>
        <p className="mt-2 text-gray-500">
          Browse all upcoming ski trips.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </section>
  );
}

export default TripsListPage;