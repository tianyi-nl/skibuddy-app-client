import service from "./index.services";

const getAllTrips = () => {
  return service.get("/trip");
};

const getTripById = (tripId) => {
  return service.get(`/trip/${tripId}`);
};

const createTrip = (requestBody) => {
  return service.post("/trip", requestBody);
};

const updateTrip = (tripId, requestBody) => {
  return service.put(`/trip/${tripId}`, requestBody);
};

const deleteTrip = (tripId) => {
  return service.delete(`/trip/${tripId}`);
};

const getMyTrips = () => {
  return service.get("/trip/mine/all");
};

export { getAllTrips, getTripById, createTrip, updateTrip, deleteTrip, getMyTrips };