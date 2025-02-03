import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketList from "./components/TicketList";
import BookingForm from "./components/Booking/BookingForm";
import BookingHistory from "./components/Booking/BookingHistory";
import AdminDashboard from "./components/Admin/AdminDashboard";
import HomePage from "./components/Home/HomePage"; // New HomePage component
import FormRegister from "./components/auth/FormRegister";
import FormLogin from "./components/auth/FormLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<FormRegister />} />
        <Route path="/login" element={<FormLogin />} />
        <Route path="/tickets" element={<TicketList />} />
        <Route path="/book" element={<BookingForm />} />
        <Route path="/bookings" element={<BookingHistory />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/" element={<HomePage />} /> {/* Updated default route */}
      </Routes>
    </Router>
  );
}

export default App;
