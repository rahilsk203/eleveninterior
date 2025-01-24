import { StrictMode } from 'react'; // Import StrictMode for development checks
import { createRoot } from 'react-dom/client'; // Import createRoot for React 18
import './index.css'; // Import global styles
import App from './App.jsx'; // Import the root App component

// Get the root DOM element
const rootElement = document.getElementById('root');

// Create a root for the app
const root = createRoot(rootElement);

// Render the app inside StrictMode
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);