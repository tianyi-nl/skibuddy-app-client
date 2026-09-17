
import TripCard from "./TripCard";

function ComingTripsSection({ trips }) {
  const recentTrips = trips.slice(0, 3);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12 mt-[120px]">
      {/* Section heading */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Coming Ski Trips
        </h2>

        <p className="mt-2 text-gray-500">
          Check out our most recent ski trips.
        </p>
      </div>

      {/* Trip cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-[48px]">
        {recentTrips.map((trip) => (
          <TripCard key={trip._id} trip={trip} />
        ))}
      </div>
    </section>
  );
}

export default ComingTripsSection;

