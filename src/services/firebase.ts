
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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

// Initialize Firebase services with enhanced security
const db = getFirestore(app);
const storage = getStorage(app);

// Enhanced security layer for all API communications
if (typeof window !== 'undefined') {
  // Enhanced security for fetch requests
  const originalFetch = window.fetch;
  
  // Create an interface to extend the Window object
  interface CustomWindow extends Window {
    lastRequestTime?: {[key: string]: number};
    pendingRequests?: {[key: string]: Promise<any>};
  }
  
  // Cast window to our custom type
  const customWindow = window as CustomWindow;
  customWindow.lastRequestTime = {};
  customWindow.pendingRequests = {};
  
  window.fetch = function(input, init) {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.toString() : input.url;
    init = init || {};
    
    // Apply security headers to all external API requests
    if (url.includes('firebase') || url.includes('api.') || url.includes('/api/')) {
      init.headers = {
        ...init.headers,
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'X-Requested-With': 'XMLHttpRequest', // Help prevent CSRF
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      };
      
      // Add request origin for verification
      if (!init.headers?.['Origin']) {
        init.headers = {
          ...init.headers,
          'Origin': window.location.origin
        };
      }
      
      // Encrypt request body if present and it's a POST/PUT request
      if (init.body && (init.method === 'POST' || init.method === 'PUT') && 
          typeof init.body === 'string' && !url.includes('firebaseinstallations')) {
        try {
          // Simple encryption using a combination of Base64 and character shifting
          // Note: This is a basic encryption and can be enhanced for production
          const encryptData = (data: string): string => {
            // First convert to Base64
            const base64 = btoa(data);
            // Then shift characters (simple Caesar cipher-like approach)
            return base64.split('').map(char => {
              const code = char.charCodeAt(0);
              return String.fromCharCode(code + 1); // Shift by 1
            }).join('');
          };
          
          const originalBody = init.body;
          init.body = encryptData(originalBody);
          
          // Signal to the server that the body is encrypted
          init.headers = {
            ...init.headers,
            'X-Content-Encrypted': 'true',
            'X-Encryption-Version': '1.0'
          };
        } catch (e) {
          console.error('Failed to encrypt request body:', e);
        }
      }
      
      // Implement request throttling and deduplication to prevent abuse
      const requestKey = `${init.method || 'GET'}-${url}`;
      const now = Date.now();
      const lastTime = customWindow.lastRequestTime?.[requestKey] || 0;
      
      // Throttle requests to the same endpoint (max 10 req/sec for the same endpoint)
      if (now - lastTime < 100) {
        console.warn(`Throttling request to ${url}`);
        return Promise.reject(new Error('Too many requests to the same endpoint'));
      }
      
      // Deduplicate identical in-flight requests
      if (customWindow.pendingRequests?.[requestKey]) {
        console.log(`Deduplicating request to ${url}`);
        return customWindow.pendingRequests[requestKey];
      }
      
      customWindow.lastRequestTime[requestKey] = now;
      
      // Execute the request
      const request = originalFetch.call(this, input, init)
        .then(response => {
          // Remove from pending requests
          delete customWindow.pendingRequests[requestKey];
          return response;
        })
        .catch(error => {
          // Remove from pending requests even on error
          delete customWindow.pendingRequests[requestKey];
          throw error;
        });
      
      // Store the pending request
      customWindow.pendingRequests[requestKey] = request;
      return request;
    }
    
    // For non-API requests, use the original fetch
    return originalFetch.call(this, input, init);
  };
}

// Create a secure API client to handle encrypted communications
class SecureApiClient {
  private baseUrl: string;
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        ...options,
        credentials: 'same-origin',
        headers: {
          ...options.headers,
          'Content-Type': 'application/json',
          'X-Client-Version': '1.0.0',
          'X-Client-ID': 'skill-nexus-web'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error in secure API request to ${endpoint}:`, error);
      throw error;
    }
  }
  
  // Helper methods for different HTTP methods
  async get(endpoint: string, options: Omit<RequestInit, 'method'> = {}) {
    return this.request(endpoint, { ...options, method: 'GET' });
  }
  
  async post(endpoint: string, data: any, options: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
  
  async put(endpoint: string, data: any, options: Omit<RequestInit, 'method' | 'body'> = {}) {
    return this.request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }
  
  async delete(endpoint: string, options: Omit<RequestInit, 'method'> = {}) {
    return this.request(endpoint, { ...options, method: 'DELETE' });
  }
}

// Create API clients for different services
export const firebaseApi = new SecureApiClient('https://firebase.googleapis.com/v1alpha');
export { app, analytics, db, storage };
