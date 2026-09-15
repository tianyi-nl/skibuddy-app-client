import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMyTrips } from "../services/trip.services";

function MyTripsPage() {
  const [createdTrips, setCreatedTrips] = useState([]);
  const [myJoinRequests, setMyJoinRequests] = useState([]);
  const [view, setView] = useState("created"); // "created" or "joined"

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
      <h1>My Trips</h1>

      <button onClick={() => setView("created")}>Trips I Created</button>
      <button onClick={() => setView("joined")}>Trips I've Requested to Join</button>

      {view === "created" && (
        <div>
          {createdTrips.length === 0 && <p>You haven't created any trips yet.</p>}
          {createdTrips.map((trip) => (
            <div key={trip._id}>
              <h3>{trip.title}</h3>
              <p>{trip.location}, {trip.country}</p>
              <Link to={`/trips/${trip._id}`}>View / Edit</Link>
            </div>
          ))}
        </div>
      )}

      {view === "joined" && (
        <div>
          {myJoinRequests.length === 0 && <p>You haven't requested to join any trips yet.</p>}
          {myJoinRequests.map((request) => (
            <div key={request._id}>
              <h3>{request.trip?.title}</h3>
              <p>{request.trip?.location}, {request.trip?.country}</p>
              <p>Status: {request.status}</p>
              <Link to={`/trips/${request.trip?._id}`}>View Trip</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTripsPage;