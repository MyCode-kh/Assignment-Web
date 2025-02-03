import React, { useEffect, useState } from "react";
import axios from "axios";

interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

interface Booking {
  id: number;
  user: { name: string };
  ticket: { name: string };
  quantity: number;
  total_price: number;
}

const AdminDashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const ticketsResponse = await axios.get(
        "http://localhost:8000/api/admin/tickets",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const bookingsResponse = await axios.get(
        "http://localhost:8000/api/admin/bookings",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTickets(ticketsResponse.data);
      setBookings(bookingsResponse.data);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 py-10 px-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        🎟️ Admin Dashboard
      </h2>

      {/* Tickets Section */}
      <div className="max-w-6xl mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Tickets 🎫
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
            >
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                {ticket.name}
              </h4>
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
            </div>
          ))}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="max-w-6xl mx-auto mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Bookings 📋
        </h3>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <ul className="divide-y divide-gray-200 dark:divide-gray-600">
            {bookings.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                No bookings found.
              </p>
            ) : (
              bookings.map((booking) => (
                <li key={booking.id} className="py-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {booking.ticket.name}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    User:{" "}
                    <span className="font-medium">{booking.user.name}</span>
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Quantity: {booking.quantity}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    Total Price:{" "}
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      ${booking.total_price}
                    </span>
                  </p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
