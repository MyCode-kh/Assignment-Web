import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../configs/api";

interface Booking {
  id: number;
  ticket: { name: string; price: number };
  quantity: number;
  total_price: number;
}

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${apiUrl}/bookings`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(response.data);
    };
    fetchBookings();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen py-12">
      <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg dark:bg-gray-500">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
          Booking History
        </h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No bookings found.
          </p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li
                key={booking.id}
                className="p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {booking.ticket.name}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-gray-700 dark:text-gray-300">
                    Quantity: {booking.quantity}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    Total Price: ${booking.total_price}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BookingHistory;
