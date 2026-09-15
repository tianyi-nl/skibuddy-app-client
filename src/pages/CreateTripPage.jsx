import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { createTrip } from "../services/trip.services";

function CreateTripPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    country: "",
    location: "",
    level: "beginner",
    startDate: "",
    endDate: "",
    maxPeople: 1,
    estimatedBudget: 0,
    hasTransportation: false,
  });

  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTrip(formData)
      .then((response) => {
        navigate(`/trips/${response.data._id}`);
      })
      .catch((error) => {
        console.log(error);
        const errorDescription = error.response?.data?.message || "Something went wrong";
        setErrorMessage(errorDescription);
      });
  };

  if (!isLoggedIn) {
    return <p>You must be logged in to create a trip.</p>;
  }

  return (
    <div>
      <h1>Create a Trip</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input name="title" value={formData.title} onChange={handleChange} required />

        <label>Description:</label>
        <textarea name="description" value={formData.description} onChange={handleChange} />

        <label>Country:</label>
        <input name="country" value={formData.country} onChange={handleChange} required />

        <label>Location:</label>
        <input name="location" value={formData.location} onChange={handleChange} required />

        <label>Level:</label>
        <select name="level" value={formData.level} onChange={handleChange}>
          <option value="beginner">Beginner</option>
          <option value="middle">Middle</option>
          <option value="advanced">Advanced</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />

        <label>End Date:</label>
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />

        <label>Max People:</label>
        <input type="number" name="maxPeople" min="1" value={formData.maxPeople} onChange={handleChange} required />

        <label>Estimated Budget (€):</label>
        <input type="number" name="estimatedBudget" min="0" value={formData.estimatedBudget} onChange={handleChange} required />

        <label>
          <input
            type="checkbox"
            name="hasTransportation"
            checked={formData.hasTransportation}
            onChange={handleChange}
          />
          Transportation provided
        </label>

        <button type="submit">Create Trip</button>
      </form>

      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default CreateTripPage;