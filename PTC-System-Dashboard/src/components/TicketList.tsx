import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../configs/api";

// Define the Ticket type based on the API response structure
interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

const TicketList: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tickets`);
        setTickets(response.data);
      } catch (err) {
        setError("Failed to load tickets. Please try again later.");
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  // Handle "Book Now" click and check if token exists
  const handleBookingClick = (ticketId: number) => {
    const token = localStorage.getItem("token");
    if (!token) {
      // Redirect to login page if no token is found
      navigate("/login");
    } else {
      // Proceed with booking if token exists
      navigate(`/book?ticketId=${ticketId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Available Tickets 🎟️
      </h2>

      {/* Error message display */}
      {error && (
        <div className="bg-red-500 text-white py-2 px-4 rounded-md text-center mb-6">
          {error}
        </div>
      )}

      {/* Ticket grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {tickets.length === 0 ? (
          <p className="col-span-full text-center text-xl text-gray-600 dark:text-gray-300">
            No tickets available at the moment.
          </p>
        ) : (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {ticket.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {ticket.description}
              </p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  ${ticket.price}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {ticket.quantity} left
                </span>
              </div>
              <button
                onClick={() => handleBookingClick(ticket.id)}
                className="mt-4 block text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
              >
                Book Now
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TicketList;
