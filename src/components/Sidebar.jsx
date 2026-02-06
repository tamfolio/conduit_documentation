// src/components/Sidebar.jsx - Robust Scroll Isolation
import React, { useState } from 'react';
import { getAPICategories } from '../data/apiData';

const Sidebar = ({ 
  onEndpointSelect, 
  selectedEndpoint, 
  onAPIChange, 
  selectedAPI, 
  isMobileMenuOpen, 
  onMobileMenuClose 
}) => {
  const [expandedSections, setExpandedSections] = useState({
    'Company APIs': true,
    'Fintech APIs': true,
    'Integration APIs': true
  });

  const toggleSection = (section) => {
    console.log('Toggling section:', section);
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const apiCategories = getAPICategories();
  const categoryIcons = {
    'Company APIs': '🏢',
    'Fintech APIs': '💳',
    'Integration APIs': '🔗',
    'Other': '📋'
  };

  const handleAPIClick = (api) => {
    console.log('API clicked:', api.title);
    onAPIChange(api);
    if (window.innerWidth < 768) {
      onMobileMenuClose?.();
    }
  };

  const handleEndpointClick = (endpoint) => {
    console.log('Endpoint clicked:', endpoint.name);
    onEndpointSelect(endpoint);
    if (window.innerWidth < 768) {
      onMobileMenuClose?.();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={onMobileMenuClose}
        />
      )}

      {/* Sidebar - Completely isolated scrolling */}
      <aside 
        className={`
          fixed md:static top-0 left-0 z-50
          w-80 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out
          md:transform-none
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        style={{ 
          height: 'calc(100vh - 0px)', // Full viewport height minus header
          top: isMobileMenuOpen ? '0' : 'auto', // Mobile: full screen, Desktop: below header
          marginTop: isMobileMenuOpen ? '0' : '0' // No margin to prevent scroll coupling
        }}
      >
        {/* Mobile Close Button - Fixed at top */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
          <h2 className="text-lg font-semibold text-gray-900">API Documentation</h2>
          <button
            onClick={onMobileMenuClose}
            className="p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* SCROLLABLE CONTENT - This is the ONLY part that scrolls */}
        <div 
          className="h-full overflow-y-auto p-4 md:p-6"
          style={{ 
            // Prevent this scroll from bubbling up to parent
            overscrollBehavior: 'contain',
            // Force its own scrolling context
            position: 'relative',
            // Ensure it takes available height
            height: isMobileMenuOpen ? 'calc(100% - 80px)' : '100%'
          }}
          onWheel={(e) => {
            // Prevent wheel events from bubbling to parent when at scroll boundaries
            const element = e.currentTarget;
            const atTop = element.scrollTop === 0;
            const atBottom = element.scrollTop >= (element.scrollHeight - element.clientHeight);
            
            if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
              e.preventDefault();
            }
          }}
        >
          {/* Debug Info */}
          <div className="mb-4 p-2 bg-gray-100 text-xs rounded">
            <div className="truncate">Selected API: {selectedAPI?.title}</div>
            <div className="truncate">Selected Endpoint: {selectedEndpoint?.name || 'None'}</div>
            <div>Total Categories: {Object.keys(apiCategories).length}</div>
          </div>

          {/* API Categories */}
          <div>
            <h3 className="text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
              API ENDPOINTS
            </h3>
            
            {Object.entries(apiCategories).map(([categoryName, apis]) => (
              <div key={categoryName} className="mb-4 md:mb-6">
                <button
                  onClick={() => toggleSection(categoryName)}
                  className="flex items-center w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-2 text-sm"
                >
                  <span className="mr-2 md:mr-3 text-sm">{categoryIcons[categoryName] || '📋'}</span>
                  <span className="font-medium flex-1 truncate">{categoryName}</span>
                  <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded shrink-0">
                    {apis.length}
                  </span>
                  <svg
                    className={`ml-2 w-4 h-4 transition-transform shrink-0 ${
                      expandedSections[categoryName] ? 'rotate-90' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* APIs in this category */}
                {expandedSections[categoryName] && (
                  <div className="ml-4 md:ml-6 space-y-1">
                    {apis.map((api) => (
                      <div key={api.title} className="mb-3 md:mb-4">
                        <button
                          onClick={() => handleAPIClick(api)}
                          className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                            selectedAPI?.title === api.title
                              ? 'bg-blue-50 text-blue-700 font-medium border-2 border-blue-200'
                              : 'text-gray-700 hover:bg-gray-100 border-2 border-transparent'
                          }`}
                        >
                          <div className="font-medium truncate">{api.title}</div>
                          <div className="text-xs text-gray-500 mt-1">
                            {api.endpoints.length} endpoint{api.endpoints.length !== 1 ? 's' : ''}
                          </div>
                        </button>
                        
                        {/* Endpoints for selected API */}
                        {selectedAPI?.title === api.title && (
                          <div className="ml-3 md:ml-4 mt-2 space-y-1 border-l-2 border-blue-200 pl-2">
                            {api.endpoints.map((endpoint) => (
                              <button
                                key={endpoint.id}
                                onClick={() => handleEndpointClick(endpoint)}
                                className={`block w-full text-left px-2 md:px-3 py-1 md:py-2 text-xs md:text-sm rounded-md transition-colors ${
                                  selectedEndpoint?.id === endpoint.id
                                    ? 'bg-blue-100 text-blue-700 font-medium border border-blue-300'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                                }`}
                              >
                                <div className="flex items-center">
                                  <span className={`mr-2 px-1.5 py-0.5 text-xs font-medium rounded shrink-0 ${
                                    endpoint.method === 'POST' ? 'bg-blue-500 text-white' :
                                    endpoint.method === 'GET' ? 'bg-green-500 text-white' :
                                    endpoint.method === 'PUT' ? 'bg-orange-500 text-white' :
                                    endpoint.method === 'DELETE' ? 'bg-red-500 text-white' :
                                    'bg-gray-500 text-white'
                                  }`}>
                                    {endpoint.method}
                                  </span>
                                  <span className="text-xs truncate">{endpoint.name}</span>
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Quick Stats */}
            <div className="mt-6 md:mt-8 p-3 md:p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2 text-sm">Documentation Stats</h4>
              <div className="text-xs md:text-sm text-gray-600 space-y-1">
                <div>Total APIs: {Object.keys(apiCategories).length}</div>
                <div>Total Endpoints: {Object.values(apiCategories).flat().reduce((acc, api) => acc + api.endpoints.length, 0)}</div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;