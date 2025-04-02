
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Function to initialize the app
const startApp = () => {
  const root = document.getElementById("root");
  if (root) {
    // Add viewport meta tag for better mobile experience
    if (!document.querySelector('meta[name="viewport"]')) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(metaTag);
    }
    
    // Add mobile web app capability
    if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
      const metaTag = document.createElement('meta');
      metaTag.name = 'apple-mobile-web-app-capable';
      metaTag.content = 'yes';
      document.head.appendChild(metaTag);
    }
    
    // Initialize the app
    createRoot(root).render(<App />);
  }
};

// Use requestIdleCallback for non-critical initialization
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(startApp);
} else {
  // Fallback for browsers that don't support requestIdleCallback
  setTimeout(startApp, 1);
}
