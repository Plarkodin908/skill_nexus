
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const SimpleNavBar = () => {
  const location = useLocation();
  
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
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SimpleNavBar;
