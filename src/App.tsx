
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from "react-router-dom";
import './App.css'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext';
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import SimpleNavBar from "./components/SimpleNavBar";
import { Toaster } from 'sonner';
import Index from "./pages/Index";
import Messages from "./pages/Messages";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

// Define the regular layout component with navbar
const RootLayout = () => {
  return (
    <>
      <SimpleNavBar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Skill Exchange</h1>
        <p className="mt-4">Navigate to the Posts or Profile page to see content</p>
      </div>
      <Outlet />
    </>
  );
};

// Define the main app wrapper with AuthProvider
// This component will wrap the router to provide auth context to all routes
const AppWithProviders = () => {
  return (
    <div className="skill-exchange-theme">
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster position="top-right" />
      </AuthProvider>
    </div>
  );
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <div>Home Content</div>
      }
    ]
  },
  {
    path: "/posts",
    element: <Posts />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/:id",
    element: <ProfileDetail />,
  },
  {
    path: "/messages",
    element: <Messages />,
  },
  {
    path: "/auth/sign-in",
    element: <SignIn />,
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />,
  }
]);

function App() {
  return <AppWithProviders />;
}

export default App;
