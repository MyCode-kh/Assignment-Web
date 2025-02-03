const Footer = () => {
  return (
    <footer className="flex items-center justify-center text-center h-16">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Ticket Booking. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
