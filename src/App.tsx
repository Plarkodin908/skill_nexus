import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import './styles/index.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import Marketplace from './pages/Marketplace';
import Tutorials from './pages/Tutorials';
import AddCourse from './pages/AddCourse';
import EditCourse from './pages/EditCourse';
import ImportContent from './pages/ImportContent';
import CourseDetails from './pages/CourseDetails';
import Chat from './pages/Chat';
import VideoStudio from './pages/VideoStudio';
import AudioStudio from './pages/AudioStudio';
import MediaGallery from './pages/MediaGallery';
import Settings from './pages/Settings';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CourseProvider } from './contexts/CourseContext';
import Posts from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/marketplace",
    element: <Marketplace />,
  },
  {
    path: "/tutorials",
    element: <Tutorials />,
  },
  {
    path: "/add-course",
    element: (
      <ProtectedRoute>
        <AddCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-course/:courseId",
    element: (
      <ProtectedRoute>
        <EditCourse />
      </ProtectedRoute>
    ),
  },
  {
    path: "/import-content",
    element: (
      <ProtectedRoute>
        <ImportContent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/course-details/:courseId",
    element: <CourseDetails />,
  },
  {
    path: "/chat",
    element: (
      <ProtectedRoute>
        <Chat />
      </ProtectedRoute>
    ),
  },
  {
    path: "/studio",
    element: (
      <ProtectedRoute>
        <VideoStudio />
      </ProtectedRoute>
    ),
  },
  {
    path: "/audio",
    element: (
      <ProtectedRoute>
        <AudioStudio />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gallery",
    element: (
      <ProtectedRoute>
        <MediaGallery />
      </ProtectedRoute>
    ),
  },
  {
    path: "/settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "/posts",
    element: <Posts />
  },
]);

function App() {
  return (
    <AuthProvider>
      <CourseProvider>
        <div className="skill-exchange-theme">
          <RouterProvider router={router} />
        </div>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
