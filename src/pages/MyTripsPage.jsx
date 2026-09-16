import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyTrips } from "../services/trip.services";
import TripCard from "../components/TripCard";

function MyTripsPage() {
  const navigate = useNavigate();
  const [createdTrips, setCreatedTrips] = useState([]);
  const [myJoinRequests, setMyJoinRequests] = useState([]);
  const [view, setView] = useState("created");

  useEffect(() => {
    getMyTrips()
      .then((response) => {
        setCreatedTrips(response.data.createdTrips);
        setMyJoinRequests(response.data.myJoinRequests);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Trips</h1>
        <button
          onClick={() => navigate("/trips/create")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition"
        >
          Post a Ski Trip
        </button>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setView("created")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            view === "created" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Trips I Created
        </button>
        <button
          onClick={() => setView("joined")}
          className={`px-4 py-2 rounded-full font-medium transition ${
            view === "joined" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Trips I've Requested to Join
        </button>
      </div>

      {view === "created" && (
        <div>
          {createdTrips.length === 0 ? (
            <p className="text-gray-500">You haven't created any trips yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {createdTrips.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
            </div>
          )}
        </div>
      )}

      {view === "joined" && (
        <div>
          {myJoinRequests.length === 0 ? (
            <p className="text-gray-500">You haven't requested to join any trips yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myJoinRequests.map((request) => (
                <div key={request._id} className="relative">
                  <TripCard trip={request.trip} />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold capitalize shadow ${
                      request.status === "accepted"
                        ? "bg-green-500 text-white"
                        : request.status === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-gray-900"
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MyTripsPage;