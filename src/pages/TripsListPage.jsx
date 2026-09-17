import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllTrips } from "../services/trip.services";
import TripCard from "../components/TripCard";

function TripsListPage() {
  const [trips, setTrips] = useState([]);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("location") || "";

  useEffect(() => {
    getAllTrips()
      .then((response) => setTrips(response.data))
      .catch((error) => console.log(error));
  }, []);

  const filteredTrips = trips.filter((trip) => {
    const searchText = query.toLowerCase();
    return (
      trip.location.toLowerCase().includes(searchText) ||
      trip.country.toLowerCase().includes(searchText)
    );
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {query ? `Results for "${query}"` : "Ski Trips"}
        </h1>
        <p className="mt-2 text-gray-500">
          {query
            ? `${filteredTrips.length} trip${filteredTrips.length !== 1 ? "s" : ""} found.`
            : "Browse all upcoming ski trips."}
        </p>
      </div>

      {filteredTrips.length === 0 ? (
        <p className="text-gray-500">No trips match your search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTrips.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
        </div>
      )}
    </section>
  );
}

export default TripsListPage;