// src/App.jsx - Final Robust Solution with CSS Classes
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import CodePanel from './components/CodePanel';
import { allAPIs, companyAccessTokensAPI } from './data/apiData';

function App() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedAPI, setSelectedAPI] = useState(companyAccessTokensAPI);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEndpointSelect = (endpoint) => {
    console.log('Endpoint selected:', endpoint);
    setSelectedEndpoint(endpoint);
  };

  const handleAPIChange = (api) => {
    console.log('API changed:', api);
    setSelectedAPI(api);
    setSelectedEndpoint(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent body scrolling when mobile sidebar is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('sidebar-open');
      document.body.style.overflow = 'hidden';
    } else {
      document.body.classList.remove('sidebar-open');
      document.body.style.overflow = '';
    }

    return () => {
      document.body.classList.remove('sidebar-open');
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="full-height-container flex flex-col bg-gray-50 font-['Roboto']">
      {/* Fixed Header */}
      <Header 
        selectedAPI={selectedAPI}
        selectedEndpoint={selectedEndpoint}
        onMobileMenuToggle={toggleMobileMenu}
      />
      
      {/* Main Layout Container - Takes remaining height */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Container - Fixed width, no flex grow */}
        <div className="sidebar-container prevent-scroll-chain">
          <Sidebar 
            onEndpointSelect={handleEndpointSelect}
            onAPIChange={handleAPIChange}
            selectedEndpoint={selectedEndpoint}
            selectedAPI={selectedAPI}
            isMobileMenuOpen={isMobileMenuOpen}
            onMobileMenuClose={closeMobileMenu}
          />
        </div>
        
        {/* Content Area Container - Flex grow, independent scrolling */}
        <div className="flex-1 flex flex-col lg:flex-row min-w-0 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <div className="content-scroll-area">
              <MainContent 
                selectedEndpoint={selectedEndpoint}
                apiData={selectedAPI}
              />
            </div>
          </div>
          
          {/* Code Panel Area */}
          <div className="w-full lg:w-1/2 min-w-0 overflow-hidden">
            <div className="code-scroll-area">
              <CodePanel 
                selectedEndpoint={selectedEndpoint}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;