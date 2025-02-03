import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import NevBar from "./components/Home/NevBar.tsx";
import Footer from "./components/Home/Footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <NevBar />
    <App />
    <Footer />
  </StrictMode>
);
