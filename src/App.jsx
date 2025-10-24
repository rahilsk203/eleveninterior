import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { prefetchService } from "./services/prefetchService";
import ScrollToTopOnNavigate from "./components/ScrollToTopOnNavigate"; // Import ScrollToTopOnNavigate component
import LoadingSpinner from "./components/LoadingSpinner"; // Import LoadingSpinner component

// Lazy load all page components for better performance
const Home = lazy(() => import("./Home"));
const Contact = lazy(() => import("./pages/Contact"));
const Inquiry = lazy(() => import("./pages/Inquiry"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Features = lazy(() => import("./pages/Features"));
const About = lazy(() => import("./pages/About"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));

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
      <ScrollToTopOnNavigate /> {/* Add ScrollToTopOnNavigate component */}
      <LocationTracker>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/features" element={<Features />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
          </Routes>
        </Suspense>
      </LocationTracker>
    </Router>
  );
}

export default App;