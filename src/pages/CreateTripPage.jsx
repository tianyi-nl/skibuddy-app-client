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
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8 text-center">Create a Trip</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="beginner">Beginner</option>
            <option value="middle">Middle</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Max People</label>
          <input
            type="number"
            name="maxPeople"
            min="1"
            value={formData.maxPeople}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Estimated Budget (€)</label>
          <input
            type="number"
            name="estimatedBudget"
            min="0"
            value={formData.estimatedBudget}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="hasTransportation"
            checked={formData.hasTransportation}
            onChange={handleChange}
            className="w-4 h-4"
          />
          <label className="text-sm font-medium text-gray-700">Transportation provided</label>
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full transition"
        >
          Create Trip
        </button>
      </form>

      {errorMessage && (
        <p className="mt-4 text-center text-red-600 text-sm">{errorMessage}</p>
      )}
    </div>
  );
}

export default CreateTripPage;