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
  const [message, setMessage] = useState("");

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
    createJoinRequest({ trip: tripId, message })
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

  if (!trip) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-6">{trip.title}</h1>

      {/* Big image */}
      <div className="w-full h-120 rounded-2xl overflow-hidden bg-gray-100 mb-8">
        {trip.images?.[0] ? (
          <img
            src={trip.images[0]}
            alt={trip.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-5xl">
            🏔️
          </div>
        )}
      </div>

      {/* Main content: left column + right card */}
      <div className="flex gap-10">
        {/* LEFT COLUMN */}
        <div className="flex-1 flex flex-col items-start">
          {/* Creator avatar */}
          <img
            src={trip.creator?.profilePicture}
            alt={trip.creator?.name}
            className="w-28 h-28 rounded-full object-cover mb-6"
          />

          {/* Description */}
          <h3 className="font-bold text-lg mb-2">Description</h3>
          <p className="text-gray-600 leading-relaxed">{trip.description}</p>

          {/* Details grid */}
          <div className="grid grid-cols-2 gap-y-4 gap-x-8 w-full mt-12">
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold">Country:</h4>
              <p className="text-gray-600">{trip.country}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold">Location:</h4>
              <p className="text-gray-600">{trip.location}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold">Level:</h4>
              <p className="text-gray-600 capitalize">{trip.level}</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h4 className="font-bold">Estimated budget:</h4>
              <p className="text-gray-600">€{trip.estimatedBudget}</p>
            </div>
          </div>

          {/* JOIN REQUESTS — creator only, now in the left column */}
          {isLoggedIn && isCreator && (
            <div className="w-full mt-28 ">
              <h3 className="font-bold text-lg mb-4 flex flex-col items-start">Join Requests</h3>

              {requests.length === 0 && (
                <p className="text-gray-500 text-sm">No requests yet.</p>
              )}

              <div className="space-y-4">
                {requests.map((req) => (
                  <div
                    key={req._id}
                    className="flex items-center justify-between   rounded-xl p-4"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={req.user?.profilePicture}
                        alt={req.user?.name}
                        className="w-16 h-16 rounded-full object-cover "
                      />
                      <div>
                        <p className="font-medium">{req.user?.name}</p>
                        <p className="text-xs text-gray-500 capitalize">{req.status}</p>
                      </div>
                    </div>

                    {req.status === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleAccept(req._id)}
                          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium px-4 py-1.5 rounded-full transition"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CARD — now simplified, just dates/capacity + main action */}
        <div className="w-80 shrink-0 border border-gray-200 rounded-2xl p-6 bg-white h-fit">
          <div className="space-y-4 mb-6">
            <div>
              <h4 className="font-bold">Start date</h4>
              <p className="text-gray-600">
                {new Date(trip.startDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-bold">End date</h4>
              <p className="text-gray-600">
                {new Date(trip.endDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <h4 className="font-bold">Max people</h4>
              <p className="text-gray-600">{trip.maxPeople}</p>
            </div>
          </div>

          {/* CREATOR VIEW — just Edit now */}
          {isLoggedIn && isCreator && (
            <button
              onClick={() => navigate(`/trips/${tripId}/edit`)}
              className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-full transition"
            >
              Edit Trip
            </button>
          )}

          {/* NON-CREATOR VIEW */}
          {isLoggedIn && !isCreator && (
            <div>
              {!myRequest && (
                <>
                  <label className="font-bold block mb-2">Message:</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="Say a few words..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4 outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleJoinRequest}
                    className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-full transition"
                  >
                    Send request
                  </button>
                </>
              )}

              {myRequest && myRequest.status === "pending" && (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Your request is pending.
                  </p>
                  <button
                    onClick={handleCancelRequest}
                    className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-full transition"
                  >
                    Cancel Request
                  </button>
                </div>
              )}

              {myRequest && myRequest.status === "accepted" && (
                <p className="text-green-600 font-medium">You're in! ✅</p>
              )}

              {myRequest && myRequest.status === "rejected" && (
                <p className="text-red-500 font-medium">
                  Your request was rejected.
                </p>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <p className="text-gray-500 text-sm">
              Log in to request joining this trip.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TripDetailsPage;