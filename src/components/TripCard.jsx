import { Link } from "react-router-dom";

function TripCard({ trip }) {
  return (
    <Link
      to={`/trips/${trip._id}`}
      className="group relative block h-120 w-88 overflow-hidden rounded-2xl border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Full-card background image */}
      {trip.image ? (
        <img
          src={trip.images}
          alt={trip.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sky-100 to-blue-200">
          <span className="text-4xl"></span>
        </div>
      )}

      {/* Gradient overlay — darker at the bottom so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />


      {/* Text + button — bottom, over the image */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="line-clamp-1 text-lg font-bold text-white">
          {trip.title}
        </h3>

        <p className="mt-1 text-sm text-gray-200">
          Created by{" "}
          <span className="font-medium text-white">
            {trip.creator?.name || "Unknown"}
          </span>
        </p>

        <div className="mt-3 flex items-center justify-between border-t border-white/20 pt-3">
          <span className="text-sm text-gray-200">View trip</span>

          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-blue-600">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default TripCard;

