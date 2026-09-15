import service from "./index.services";


const createJoinRequest = (requestBody) => {
  return service.post("/join-request", requestBody);
};

const getRequestsForTrip = (tripId) => {
  return service.get(`/join-request/trip/${tripId}`);
};

const getMyRequestForTrip = (tripId) => {
  return service.get(`/join-request/trip/${tripId}/mine`);
};

const acceptJoinRequest = (requestId) => {
  return service.put(`/join-request/${requestId}/accept`);
};

const rejectJoinRequest = (requestId) => {
  return service.put(`/join-request/${requestId}/reject`);
};

const cancelJoinRequest = (requestId) => {
  return service.delete(`/join-request/${requestId}`);
};

export {
  createJoinRequest,
  getRequestsForTrip,
  getMyRequestForTrip,
  acceptJoinRequest,
  rejectJoinRequest,
  cancelJoinRequest,
};
