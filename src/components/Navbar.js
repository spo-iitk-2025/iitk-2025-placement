// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white fixed w-full top-0 left-0 z-50 shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-10">
          <Link
            to="/"
            className="text-gray-800 font-medium text-sm hover:text-blue-600 mx-4 transition-colors"
          >
            PROFORMA
          </Link>
          <Link
            to="/stats"
            className="text-gray-800 font-medium text-sm hover:text-blue-600 mx-4 transition-colors"
          >
            STATS
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
