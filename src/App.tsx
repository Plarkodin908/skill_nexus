
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
import MobileNavBar from "./components/MobileNavBar";
import { Toaster } from 'sonner';
import Index from "./pages/Index";
import Messages from "./pages/Messages";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Tutorials from "./pages/Tutorials";

// Define the regular layout component with navbar and mobile nav
const RootLayout = () => {
  return (
    <>
      <SimpleNavBar />
      <div className="p-8 text-center pb-20">
        <h1 className="text-3xl font-bold">Welcome to Skill Exchange</h1>
        <p className="mt-4">Navigate to the Posts or Profile page to see content</p>
      </div>
      <Outlet />
      <MobileNavBar />
    </>
  );
};

// Layout wrapper for pages with both navbars
const PageWithNavbars = ({ children }) => {
  return (
    <>
      {children}
      <MobileNavBar />
    </>
  );
};

// Define the main app wrapper with AuthProvider
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
    element: <PageWithNavbars><Index /></PageWithNavbars>,
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
    element: <PageWithNavbars><Posts /></PageWithNavbars>,
  },
  {
    path: "/profile",
    element: <PageWithNavbars><Profile /></PageWithNavbars>,
  },
  {
    path: "/profile/:id",
    element: <PageWithNavbars><ProfileDetail /></PageWithNavbars>,
  },
  {
    path: "/messages",
    element: <PageWithNavbars><Messages /></PageWithNavbars>,
  },
  {
    path: "/tutorials",
    element: <PageWithNavbars><Tutorials /></PageWithNavbars>,
  },
  {
    path: "/marketplace",
    element: <PageWithNavbars><div className="container mx-auto py-20 px-4">Marketplace Content</div></PageWithNavbars>,
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
