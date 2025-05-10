
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import './App.css'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext';
import Posts from "./pages/Posts";
import Profile from "./pages/Profile";
import ProfileDetail from "./pages/ProfileDetail";
import SimpleNavBar from "./components/SimpleNavBar";

// Create a layout component that includes the AuthProvider
const AppLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

// Create a root layout that includes the navbar and content
const RootLayout = () => {
  return (
    <>
      <SimpleNavBar />
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to Skill Exchange</h1>
        <p className="mt-4">Navigate to the Posts or Profile page to see content</p>
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RootLayout />,
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
    ],
  },
]);

function App() {
  return (
    <div className="skill-exchange-theme">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
