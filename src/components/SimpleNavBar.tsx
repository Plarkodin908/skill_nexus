
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SimpleNavBar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">Skill Exchange</Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className={`text-gray-600 hover:text-blue-500 ${location.pathname === '/' ? 'text-blue-500' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/posts" 
              className={`text-gray-600 hover:text-blue-500 ${location.pathname === '/posts' ? 'text-blue-500' : ''}`}
            >
              Posts
            </Link>
            <Link 
              to="/profile" 
              className={`text-gray-600 hover:text-blue-500 ${location.pathname === '/profile' ? 'text-blue-500' : ''}`}
            >
              Profile
            </Link>
            <Link 
              to="/messages" 
              className={`text-gray-600 hover:text-blue-500 ${location.pathname === '/messages' ? 'text-blue-500' : ''}`}
            >
              Messages
            </Link>
            {user ? (
              <button
                onClick={signOut}
                className="text-gray-600 hover:text-blue-500"
              >
                Sign Out
              </button>
            ) : (
              <Link 
                to="/auth/sign-in" 
                className={`text-gray-600 hover:text-blue-500 ${location.pathname === '/auth/sign-in' ? 'text-blue-500' : ''}`}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavBar;
