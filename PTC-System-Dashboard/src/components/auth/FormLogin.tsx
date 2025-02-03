import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../configs/api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../utils/constants";
import LoadingIndicator from "./LoadingIndicator";
import girl_management from "../../assets/girl_management.png";

function FormLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = () => {
    setRemember(!remember);
  };

  const handleSubmit = async (e: any) => {
    setLoading(true);
    setError("");
    e.preventDefault();

    try {
      // Make POST request for login
      const res = await api.post("http://localhost:3000/api/v1.0/auth/signin", {
        email,
        password,
      });

      // Store tokens
      localStorage.setItem(ACCESS_TOKEN, res.data.token);
      localStorage.setItem(REFRESH_TOKEN, res.data.token); // Assuming both are the same for now

      if (remember) {
        localStorage.setItem("remember", "true");
      }

      navigate("/"); // Redirect to home page or dashboard
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.data.message === "Invalid credentials") {
          setError("Incorrect email or password.");
        } else {
          setError("Something went wrong. Please try again later.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex min-h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex w-full max-w-4xl rounded-3xl shadow-lg overflow-hidden bg-white">
        <motion.div
          className="w-full md:w-1/2 p-8 bg-gradient-to-r from-blue-400 to-pink-500 flex flex-col items-center justify-center text-center"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-semibold text-white mb-6">
            Manage Your Business Like a Pro
          </h2>
          <p className="text-lg text-white mb-8">
            Streamline your tasks and enhance productivity with our powerful
            platform.
          </p>
          <img
            src={girl_management}
            alt="Management"
            className="w-full h-56 object-cover rounded-lg shadow-xl"
          />
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 p-8"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Welcome Back!
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="text-red-600 text-center mb-2">
                <p>{error}</p>
              </div>
            )}

            {loading && <LoadingIndicator />}

            <div className="flex items-center my-5 justify-between">
              <div className="flex items-start space-x-2">
                <input
                  id="remember"
                  type="checkbox"
                  checked={remember}
                  onChange={handleCheckboxChange}
                  className="w-4 h-4"
                />
                <label htmlFor="remember" className="text-sm text-gray-500">
                  Stay logged in
                </label>
              </div>
              <a href="#" className="text-sm text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Log In
            </button>
          </form>
          <div className="mt-6 text-center">
            <p>
              New to the platform?{" "}
              <a href="/register" className="text-blue-600">
                Sign up here
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FormLogin;
