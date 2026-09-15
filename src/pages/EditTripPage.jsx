import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { getTripById, updateTrip, deleteTrip } from "../services/trip.services";

function EditTripPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();
  const { loggedUserId } = useContext(AuthContext);

  const [formData, setFormData] = useState(null);
  const [notAuthorized, setNotAuthorized] = useState(false);

  useEffect(() => {
    getTripById(tripId)
      .then((response) => {
        const trip = response.data;

        if (trip.creator?._id !== loggedUserId) {
          setNotAuthorized(true);
          return;
        }

        setFormData({
          title: trip.title,
          description: trip.description,
          country: trip.country,
          location: trip.location,
          level: trip.level,
          startDate: trip.startDate?.slice(0, 10),
          endDate: trip.endDate?.slice(0, 10),
          maxPeople: trip.maxPeople,
          estimatedBudget: trip.estimatedBudget,
          hasTransportation: trip.hasTransportation,
        });
      })
      .catch((error) => console.log(error));
  }, [tripId, loggedUserId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrip(tripId, formData)
      .then(() => navigate(`/trips/${tripId}`))
      .catch((error) => console.log(error));
  };

  const handleDelete = () => {
    deleteTrip(tripId)
      .then(() => navigate("/trips"))
      .catch((error) => console.log(error));
  };

  if (notAuthorized) {
    return <p>You are not authorized to edit this trip.</p>;
  }

  if (!formData) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Country:</label>
        <input name="country" value={formData.country} onChange={handleChange} />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} />

        <label>Level:</label>
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="beginner">Beginner</option>
          <option value="middle">Middle</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />

        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />

        <label>Max People:</label>
        <input type="number" name="maxPeople" value={formData.maxPeople} onChange={handleChange} />

        <label>Estimated Budget (€):</label>
        <input type="number" name="estimatedBudget" value={formData.estimatedBudget} onChange={handleChange} />

        <label>
          <input
            type="checkbox"
            name="hasTransportation"
            checked={formData.hasTransportation}
            onChange={handleChange}
          />
          Transportation provided
        </label>

        <button type="submit">Save Changes</button>
      </form>

      <button onClick={handleDelete}>Delete Trip</button>
    </div>
  );
}

export default EditTripPage;