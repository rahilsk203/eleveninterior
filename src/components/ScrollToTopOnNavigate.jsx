import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTopOnNavigate Component
 * Resets scroll position to top when navigating between routes
 */
const ScrollToTopOnNavigate = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top instantly when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTopOnNavigate;