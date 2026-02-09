// src/components/Header.jsx - Responsive Version
import React, { useState } from 'react';

const Header = ({ selectedAPI, selectedEndpoint, onMobileMenuToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 md:px-6 py-4">
        {/* Mobile Menu Button + Logo */}
        <div className="flex items-center space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={onMobileMenuToggle}
            className="md:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-2">
                <img src="/assets/conduit_logo.png" alt="" className='w-[180px] h-[50px]' />
          </div>
        </div>

        {/* Search Bar - Hidden on small mobile, visible on larger screens */}
        <div className="hidden sm:flex flex-1 max-w-lg mx-4 md:mx-8">
          <div className="relative w-full">
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
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
        </div>

        {/* Navigation - Simplified for mobile */}
        <nav className="flex items-center space-x-2 md:space-x-6">
          <a href="#" className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1 text-sm md:text-base">
            API
          </a>
        </nav>
      </div>
      
      {/* Mobile Search - Expandable */}
      <div className="sm:hidden px-4 pb-4">
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
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>
      

    </header>
  );
};

export default Header;