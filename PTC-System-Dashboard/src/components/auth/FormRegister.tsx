import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../configs/api";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import girl_management from "../../assets/girl_management.png";

function FormRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post("http://localhost:3000/api/v1.0/auth/signup", {
        name,
        email,
        password,
      });

      console.log("Registration successful", res);
      navigate("/login"); // Redirect to login after successful registration
    } catch (error) {
      alert("Error occurred during registration. Please try again.");
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
          className="w-full md:w-1/2 p-8"
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit}>
            <h1 className="text-4xl font-semibold text-center text-green-600 mb-6">
              Register
            </h1>

            <div className="mb-4">
              <input
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full Name"
              />
            </div>

            <div className="mb-4">
              <input
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="mb-6">
              <input
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>

            {loading && <LoadingIndicator />}

            <button
              className="w-full p-4 bg-green-600 text-white rounded-lg hover:bg-green-700"
              type="submit"
            >
              Register
            </button>

            <div className="mt-6 text-center">
              <p>
                Already have an account?{" "}
                <a href="/login" className="text-blue-600">
                  Login here
                </a>
              </p>
            </div>
          </form>
        </motion.div>

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
      </div>
    </motion.div>
  );
}

export default FormRegister;
