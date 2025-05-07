
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };
