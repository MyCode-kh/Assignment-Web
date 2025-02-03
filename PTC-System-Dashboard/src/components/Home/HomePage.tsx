import React from "react";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">Welcome to Ticket Booking</h1>
        <p className="text-xl mb-8">
          Book your tickets for the best events in town. Fast, easy, and secure!
        </p>
        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="bg-transparent border-2 border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Easy Booking</h3>
            <p>Quick and hassle-free ticket booking process.</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Secure Payments</h3>
            <p>Safe and reliable payment methods.</p>
          </div>
          <div className="bg-white bg-opacity-10 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">24/7 Support</h3>
            <p>We're here to help you anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
