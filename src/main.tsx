
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Use requestIdleCallback to defer non-critical initialization
const startApp = () => {
  const root = document.getElementById("root");
  if (root) {
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
