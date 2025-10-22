import { StrictMode } from 'react'; // Import StrictMode for development checks
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18
import { HelmetProvider } from 'react-helmet-async'; // Import HelmetProvider for SEO
import './index.css'; // Import global styles
import App from './App.jsx'; // Import the root App component

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root for the app
const root = createRoot(rootElement);

// Render the app inside StrictMode and HelmetProvider
root.render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);