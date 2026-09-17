import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import service from "../../services/index.services";
import { uploadImage } from "../../services/upload.services";
import bdimg from "../../assets/loginsignupimg.jpg"

function Signup() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImagePreview(URL.createObjectURL(file));
    setIsUploading(true);

    uploadImage(file)
      .then((response) => {
        setProfilePicture(response.data.imageUrl);
        setIsUploading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsUploading(false);
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
      name: username,
      ...(profilePicture && { profilePicture }),
    };

    try {
      await service.post("/auth/signup", body);

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response?.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white lg:flex">

      {/* LEFT SIDE - SIGNUP FORM */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Create your account
            </h1>
          </div>

          {/* Profile picture upload — optional */}
          <div className="flex flex-col items-center mb-8">
            <label className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer overflow-hidden bg-gray-50">
              {imagePreview ? (
                <img src={imagePreview} alt="Profile preview" className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-400 text-xs text-center px-2">
                  {isUploading ? "Uploading..." : "Add photo"}
                </span>
              )}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            <p className="mt-2 text-xs text-gray-400">Optional</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-5">

            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                required
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Signup button */}
            <button
              type="submit"
              disabled={isUploading}
              className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:bg-gray-400"
            >
              Sign up
            </button>
          </form>

          {/* Login link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden w-1/2 p-6 lg:block">
        <div className="relative h-[780px] min-h-[700px] w-full max-w-[560px] overflow-hidden rounded-3xl">
          <img
            src={bdimg}
            alt="Ski trip illustration"
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
      </div>

    </div>
  );
}

export default Signup;