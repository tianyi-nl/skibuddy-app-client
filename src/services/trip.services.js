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

export { getAllTrips, getTripById, createTrip };