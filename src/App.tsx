
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './App.css'
import './styles/index.css'
import { AuthProvider } from './contexts/AuthContext';
import Posts from "./pages/Posts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div className="p-8 text-center"><h1 className="text-3xl font-bold">Welcome to Skill Exchange</h1><p className="mt-4">Navigate to the Posts page to see content</p></div>,
  },
  {
    path: "/posts",
    element: <Posts />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <div className="skill-exchange-theme">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
}

export default App;
