import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getMyTrips } from "../services/trip.services";

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
    <div>
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
          {createdTrips.length === 0 && <p>You haven't created any trips yet.</p>}
          {createdTrips.map((trip) => (
            <div key={trip._id} className="border-b py-3">
              <h3 className="font-bold">{trip.title}</h3>
              <p className="text-gray-500 text-sm">{trip.location}, {trip.country}</p>
              <Link to={`/trips/${trip._id}`} className="text-blue-600 text-sm">
                View / Edit
              </Link>
            </div>
          ))}
        </div>
      )}

      {view === "joined" && (
        <div>
          {myJoinRequests.length === 0 && <p>You haven't requested to join any trips yet.</p>}
          {myJoinRequests.map((request) => (
            <div key={request._id} className="border-b py-3">
              <h3 className="font-bold">{request.trip?.title}</h3>
              <p className="text-gray-500 text-sm">{request.trip?.location}, {request.trip?.country}</p>
              <p className="text-sm">Status: {request.status}</p>
              <Link to={`/trips/${request.trip?._id}`} className="text-blue-600 text-sm">
                View Trip
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTripsPage;