// src/components/Header.jsx
import React, { useState } from 'react';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">API</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">TreeGar Documentation</h1>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-lg mx-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search API Reference"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-gray-600 hover:text-blue-600 font-medium">
            Docs
          </a>
          <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1">
            API
          </a>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md font-medium transition-colors">
            Sign up
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;