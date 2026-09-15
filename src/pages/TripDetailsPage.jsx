import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getTripById } from "../services/trip.services";
import {
  createJoinRequest,
  getRequestsForTrip,
  getMyRequestForTrip,
  acceptJoinRequest,
  rejectJoinRequest,
  cancelJoinRequest,
} from "../services/joinRequest.services";

function TripDetailsPage() {
  const { tripId } = useParams();
  const { isLoggedIn, loggedUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [myRequest, setMyRequest] = useState(null);
  const [requests, setRequests] = useState([]);

  const isCreator = trip && loggedUserId === trip.creator?._id;

  const loadTrip = () => {
    getTripById(tripId)
      .then((response) => setTrip(response.data))
      .catch((error) => console.log(error));
  };

  const loadMyRequest = () => {
    if (!isLoggedIn) return;
    getMyRequestForTrip(tripId)
      .then((response) => setMyRequest(response.data))
      .catch((error) => console.log(error));
  };

  const loadRequestsForTrip = () => {
    getRequestsForTrip(tripId)
      .then((response) => setRequests(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    loadTrip();
  }, [tripId]);

  useEffect(() => {
    if (!trip || !isLoggedIn) return;

    if (loggedUserId === trip.creator?._id) {
      loadRequestsForTrip();
    } else {
      loadMyRequest();
    }
  }, [trip, isLoggedIn]);

  const handleJoinRequest = () => {
    createJoinRequest({ trip: tripId, message: "" })
      .then(() => loadMyRequest())
      .catch((error) => console.log(error));
  };

  const handleCancelRequest = () => {
    cancelJoinRequest(myRequest._id)
      .then(() => setMyRequest(null))
      .catch((error) => console.log(error));
  };

  const handleAccept = (requestId) => {
    acceptJoinRequest(requestId)
      .then(() => loadRequestsForTrip())
      .catch((error) => console.log(error.response?.data?.message));
  };

  const handleReject = (requestId) => {
    rejectJoinRequest(requestId)
      .then(() => loadRequestsForTrip())
      .catch((error) => console.log(error));
  };

  if (!trip) return <p>Loading...</p>;


  return (
    <div>
      <h1>{trip.title}</h1>
      <p>{trip.description}</p>
      <p>{trip.location}, {trip.country}</p>
      <p>Level: {trip.level}</p>
      <p>Max people: {trip.maxPeople}</p>
      <p>Estimated budget: €{trip.estimatedBudget}</p>
      <p>Transportation: {trip.hasTransportation ? "Yes" : "No"}</p>
      <p>Created by: {trip.creator?.name}</p>

      {/* CREATOR VIEW */}
      {isLoggedIn && isCreator && (
        <div>
          <button onClick={() => navigate(`/trips/${tripId}/edit`)}>Edit Trip</button>

          <h3>Join Requests</h3>
          {requests.length === 0 && <p>No requests yet.</p>}
          {requests.map((req) => (
            <div key={req._id}>
              <p>{req.user?.name} — {req.status}</p>
              {req.status === "pending" && (
                <>
                  <button onClick={() => handleAccept(req._id)}>Accept</button>
                  <button onClick={() => handleReject(req._id)}>Reject</button>
                </>
              )}
            </div>
          ))}
        </div>
      )}

      {/* NON-CREATOR VIEW */}
      {isLoggedIn && !isCreator && (
        <div>
          {!myRequest && (
            <button onClick={handleJoinRequest}>Request to Join</button>
          )}
          {myRequest && myRequest.status === "pending" && (
            <div>
              <p>Your request is pending.</p>
              <button onClick={handleCancelRequest}>Cancel Request</button>
            </div>
          )}
          {myRequest && myRequest.status === "accepted" && (
            <p>You're in! ✅</p>
          )}
          {myRequest && myRequest.status === "rejected" && (
            <p>Your request was rejected.</p>
          )}
        </div>
      )}

      {!isLoggedIn && <p>Log in to request joining this trip.</p>}
    </div>
  );
}

export default TripDetailsPage;
