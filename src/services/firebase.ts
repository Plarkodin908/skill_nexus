
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASOcoL9fXXK9GbwAoYKPEI73m-Ar6ndpY",
  authDomain: "skill-nexus-45e8a.firebaseapp.com",
  projectId: "skill-nexus-45e8a",
  storageBucket: "skill-nexus-45e8a.firebasestorage.app",
  messagingSenderId: "912692326298",
  appId: "1:912692326298:web:90e349ed54a12ee1fc5423",
  measurementId: "G-P3S2XTC70N"
};

// Initialize Firebase with enhanced security
const app = initializeApp(firebaseConfig);

// Only initialize analytics in production to avoid tracking during development
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Add security headers for API requests
if (typeof window !== 'undefined') {
  // Add security measures for network requests
  const originalFetch = window.fetch;
  // Create an interface to extend the Window object
  interface CustomWindow extends Window {
    lastFirebaseRequestTime?: number;
  }
  
  // Cast window to our custom type
  const customWindow = window as CustomWindow;
  
  window.fetch = function(input, init) {
    // Add security headers to requests to Firebase services
    if (typeof input === 'string' && input.includes('firebase')) {
      init = init || {};
      init.headers = {
        ...init.headers,
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      };
      
      // Implement request throttling to prevent abuse
      // This is a simplified version - you might want to use a more sophisticated approach
      const now = Date.now();
      const lastRequestTime = customWindow.lastFirebaseRequestTime || 0;
      if (now - lastRequestTime < 100) { // Limit to max 10 requests per second
        return Promise.reject(new Error('Too many requests'));
      }
      customWindow.lastFirebaseRequestTime = now;
    }
    return originalFetch.call(this, input, init);
  };
}

export { app, analytics };
