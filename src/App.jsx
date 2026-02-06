// src/App.jsx
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import CodePanel from './components/CodePanel';
import {companyAccessTokensAPI } from './data/apiData';

function App() {
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);
  const [selectedAPI, setSelectedAPI] = useState(companyAccessTokensAPI); // Default to first API

  const handleEndpointSelect = (endpoint) => {
    setSelectedEndpoint(endpoint);
  };

  const handleAPIChange = (api) => {
    setSelectedAPI(api);
    setSelectedEndpoint(null); // Clear selected endpoint when switching APIs
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Roboto']">
      <Header 
        selectedAPI={selectedAPI}
        selectedEndpoint={selectedEndpoint}
      />
      
      <div className="flex">
        {/* Sidebar */}
        <Sidebar 
          onEndpointSelect={handleEndpointSelect}
          onAPIChange={handleAPIChange}
          selectedEndpoint={selectedEndpoint}
          selectedAPI={selectedAPI}
        />
        
        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Documentation Content */}
          <MainContent 
            selectedEndpoint={selectedEndpoint}
            apiData={selectedAPI}
          />
          
          {/* Code Examples Panel */}
          <CodePanel 
            selectedEndpoint={selectedEndpoint}
          />
        </div>
      </div>
    </div>
  );
}

export default App;