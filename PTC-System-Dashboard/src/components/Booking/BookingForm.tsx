import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { apiUrl } from "../../configs/api";

const BookingForm: React.FC = () => {
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  const ticketId = new URLSearchParams(location.search).get("ticketId");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity <= 0) {
      setError("Quantity must be at least 1.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authorization token found.");
        setLoading(false);
        navigate("/login"); // Redirect to login page if no token
        return;
      }

      const response = await axios.post(
        `${apiUrl}/bookings`,
        { ticketId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 201) {
        navigate("/bookings");
      } else {
        setError("Booking failed. Please try again.");
      }
    } catch (err) {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          Book Ticket
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-white mb-2">
              Quantity:
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? <span className="animate-spin">🔄</span> : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
