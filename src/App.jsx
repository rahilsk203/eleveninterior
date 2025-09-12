import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home"; // Renamed from Main to Home for clarity
import Contact from "./pages/Contact";
import Inquiry from "./pages/Inquiry";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/inquiry" element={<Inquiry />} />
      </Routes>
    </Router>
  );
}

export default App;