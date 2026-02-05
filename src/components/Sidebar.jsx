// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { getAPICategories } from '../data/apiData';

const Sidebar = ({ onEndpointSelect, selectedEndpoint, onAPIChange, selectedAPI }) => {
  const [expandedSections, setExpandedSections] = useState({
    authentication: false,
    pagination: false,
    errors: false,
    // Auto-expand Company APIs by default
    'Company APIs': true,
    'Fintech APIs': true,
    'Integration APIs': true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // General documentation sections
  const sidebarSections = [
    {
      id: 'authentication',
      title: 'Authentication',
      icon: '🔐',
      items: []
    },
    {
      id: 'pagination',
      title: 'Pagination',
      icon: '📄',
      items: []
    },
    {
      id: 'errors',
      title: 'Errors',
      icon: '⚠️',
      items: []
    }
  ];

  // Get API categories
  const apiCategories = getAPICategories();

  // Category icons
  const categoryIcons = {
    'Company APIs': '🏢',
    'Fintech APIs': '💳',
    'Integration APIs': '🔗',
    'Other': '📋'
  };

  return (
    <aside className="w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto sidebar-scroll">
      <div className="p-6">
        {/* General Sections */}
        <div className="space-y-2 mb-8">
          {sidebarSections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex items-center w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              >
                <span className="mr-3">{section.icon}</span>
                <span className="font-medium">{section.title}</span>
                <svg
                  className={`ml-auto w-4 h-4 transition-transform ${
                    expandedSections[section.id] ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Future: Add authentication, pagination, error docs here */}
              {expandedSections[section.id] && section.items.length > 0 && (
                <div className="ml-6 mt-2 space-y-1">
                  {section.items.map((item, index) => (
                    <div key={index} className="px-3 py-2 text-sm text-gray-600">
                      {item.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* API Categories */}
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            API ENDPOINTS
          </h3>
          
          {Object.entries(apiCategories).map(([categoryName, apis]) => (
            <div key={categoryName} className="mb-6">
              <button
                onClick={() => toggleSection(categoryName)}
                className="flex items-center w-full text-left px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors mb-2"
              >
                <span className="mr-3">{categoryIcons[categoryName] || '📋'}</span>
                <span className="font-medium">{categoryName}</span>
                <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                  {apis.length}
                </span>
                <svg
                  className={`ml-2 w-4 h-4 transition-transform ${
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
                <div className="ml-6 space-y-1">
                  {apis.map((api) => (
                    <div key={api.title} className="mb-4">
                      <button
                        onClick={() => onAPIChange(api)}
                        className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                          selectedAPI?.title === api.title
                            ? 'bg-blue-50 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="font-medium">{api.title}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {api.endpoints.length} endpoint{api.endpoints.length !== 1 ? 's' : ''}
                        </div>
                      </button>
                      
                      {/* Endpoints for selected API */}
                      {selectedAPI?.title === api.title && (
                        <div className="ml-4 mt-2 space-y-1">
                          {api.endpoints.map((endpoint) => (
                            <button
                              key={endpoint.id}
                              onClick={() => onEndpointSelect(endpoint)}
                              className={`block w-full text-left px-3 py-2 text-sm rounded-md transition-colors ${
                                selectedEndpoint?.id === endpoint.id
                                  ? 'bg-blue-100 text-blue-700 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                              }`}
                            >
                              <div className="flex items-center">
                                <span className={`mr-2 px-1.5 py-0.5 text-xs font-medium rounded ${
                                  endpoint.method === 'POST' ? 'bg-blue-500 text-white' :
                                  endpoint.method === 'GET' ? 'bg-green-500 text-white' :
                                  endpoint.method === 'PUT' ? 'bg-orange-500 text-white' :
                                  endpoint.method === 'DELETE' ? 'bg-red-500 text-white' :
                                  'bg-gray-500 text-white'
                                }`}>
                                  {endpoint.method}
                                </span>
                                <span className="text-xs">{endpoint.name}</span>
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
        </div>

        {/* Quick Stats */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">Documentation Stats</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <div>Total APIs: {Object.keys(apiCategories).length}</div>
            <div>Total Endpoints: {Object.values(apiCategories).flat().reduce((acc, api) => acc + api.endpoints.length, 0)}</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;