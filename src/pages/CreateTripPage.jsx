import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { createTrip } from "../services/trip.services";
import { uploadImage } from "../services/upload.services";

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
    images: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file)); // instant local preview
    setIsUploading(true);

    uploadImage(file)
      .then((response) => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, response.data.imageUrl],
        }));
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
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
        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-start gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700 pt-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Country</label>
          <input
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Location</label>
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Level</label>
          <select
            name="level"
            value={formData.level}
            onChange={handleChange}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="beginner">Beginner</option>
            <option value="middle">Middle</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Max People</label>
          <input
            type="number"
            name="maxPeople"
            min="1"
            value={formData.maxPeople}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Budget (€)</label>
          <input
            type="number"
            name="estimatedBudget"
            min="0"
            value={formData.estimatedBudget}
            onChange={handleChange}
            required
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <label className="w-40 shrink-0 text-sm font-medium text-gray-700">Transportation</label>
          <input
            type="checkbox"
            name="hasTransportation"
            checked={formData.hasTransportation}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </div>

      {/* Image upload at the top */}
      <div className="mb-8">
        <label className="block w-full h-56 rounded-2xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50">
          {imagePreview ? (
            <img src={imagePreview} alt="Trip preview" className="w-full h-full object-cover" />
          ) : (
            <span className="text-gray-400 text-sm">
              {isUploading ? "Uploading..." : "Click to upload a photo"}
            </span>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
        </label>
      </div>
        <button
          type="submit"
          disabled={isUploading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 rounded-full transition"
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