import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import service from "../../services/index.services";
import bgimage from "../../assets/loginbgimg.jpg"

function Login() {
  const { setIsLoggedIn, setLoggedUserId } = useContext(AuthContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const response = await service.post("/auth/login", body);

      localStorage.setItem("authToken", response.data.authToken);

      setIsLoggedIn(true);
      setLoggedUserId(response.data.payload._id);

      navigate("/my-trips");
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

      {/* LEFT SIDE - LOGIN FORM */}
      <div className="flex w-full items-center justify-center px-6 py-12 lg:w-1/2 lg:px-16">

        <div className="w-full max-w-md">

          {/* Logo / Brand */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back!
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700 "
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
                placeholder="Enter your password"
                required
                className="w-full rounded-full border border-gray-300 px-5 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
            </div>

            {/* Forgot password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-gray-600 transition hover:text-black hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error */}
            {errorMessage && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {errorMessage}
              </p>
            )}

            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-full bg-black py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
            >
              Login
            </button>
          </form>

        

          {/* Signup link */}
          <p className="mt-12 text-center text-sm text-gray-500">
            Not a member?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-700"
            >
              Register now
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT SIDE - IMAGE */}
      <div className="hidden w-1/2 p-6 lg:block">

        <div className="relative flex h-[780px] min-h-[700px] w-[560px] items-center justify-center overflow-hidden rounded-3xl ">

          <img
            src={bgimage}
            alt="Ski trip illustration"
            className="h-full w-full object-cover"
          />

        </div>
      </div>

    </div>
  );
}

export default Login;
