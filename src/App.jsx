import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Home"; // Renamed from Main to Home for clarity
import Contact from "./pages/Contact";
import Inquiry from "./pages/Inquiry";
import Gallery from "./pages/Gallery";
import Features from "./pages/Features";
import About from "./pages/About"; // Added import for About page
import Testimonials from "./pages/Testimonials"; // Added import for Testimonials page
import { prefetchService } from "./services/prefetchService";

// Wrapper component to track location changes
const LocationTracker = ({ children }) => {
  const location = useLocation();
  
  React.useEffect(() => {
    // Record navigation for prefetching
    prefetchService.recordNavigation(location.pathname);
  }, [location.pathname]);
  
  return children;
};

function App() {
  return (
    <Router>
      <LocationTracker>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> {/* Added route for About page */}
          <Route path="/testimonials" element={<Testimonials />} /> {/* Added route for Testimonials page */}
          <Route path="/contact" element={<Contact />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/features" element={<Features />} />
        </Routes>
      </LocationTracker>
    </Router>
  );
}

export default App;