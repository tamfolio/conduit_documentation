// src/components/MainContent.jsx - Independent Scrolling Version
import React from 'react';

const MainContent = ({ selectedEndpoint, apiData }) => {
  console.log('MainContent received:', { selectedEndpoint, apiData });

  const renderExample = (example) => {
    if (typeof example === 'object' && example !== null) {
      return JSON.stringify(example, null, 2);
    }
    return String(example);
  };

  if (!selectedEndpoint) {
    return (
      <div className="w-full p-4 md:p-8 bg-white">
        <div className="text-center py-8 md:py-12">
          <div className="mb-6">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-xl md:text-2xl">📚</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Welcome to TreeGar API Documentation</h1>
            <p className="text-gray-600 max-w-md mx-auto text-sm md:text-base px-4">
              Select an endpoint from the sidebar to view detailed documentation, code examples, and response formats.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4 md:p-6 max-w-md mx-auto">
            <h3 className="font-semibold text-gray-800 mb-2 text-sm md:text-base">Getting Started</h3>
            <p className="text-xs md:text-sm text-gray-600">
              All API endpoints require authentication. Check the Authentication section for details on how to get started.
            </p>
          </div>

          {/* Debug info - Hidden on mobile */}
          <div className="hidden md:block mt-8 p-4 bg-yellow-100 rounded text-sm">
            <p><strong>Debug:</strong> No endpoint selected</p>
            <p>Available API: {apiData?.title || 'None'}</p>
            <p>Endpoints: {apiData?.endpoints?.length || 0}</p>
          </div>
        </div>
      </div>
    );
  }

  const getMethodColor = (method) => {
    switch (method) {
      case 'GET': return 'bg-green-500 text-white';
      case 'POST': return 'bg-blue-500 text-white';
      case 'PUT': return 'bg-orange-500 text-white';
      case 'DELETE': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="w-full p-4 md:p-8 bg-white">
      {/* Debug Info - Compact on mobile */}
      <div className="mb-4 p-2 md:p-3 bg-green-100 border border-green-300 rounded text-xs md:text-sm">
        <p><strong>Debug:</strong> Endpoint selected!</p>
        <div className="hidden md:block">
          <p>API: {apiData?.title}</p>
          <p>Endpoint: {selectedEndpoint?.name}</p>
          <p>Method: {selectedEndpoint?.method}</p>
        </div>
      </div>

      {/* Endpoint Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center mb-4 gap-2">
          <span className={`px-3 py-1 rounded font-semibold text-sm mr-0 sm:mr-4 w-fit ${getMethodColor(selectedEndpoint.method)}`}>
            {selectedEndpoint.method}
          </span>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words">{selectedEndpoint.name}</h1>
        </div>
        
        <div className="bg-gray-50 p-3 md:p-4 rounded-lg mb-4 overflow-x-auto">
          <code className="text-gray-800 font-mono text-sm md:text-base whitespace-nowrap">{selectedEndpoint.path}</code>
        </div>
        
        <p className="text-gray-600 text-base md:text-lg">{selectedEndpoint.description}</p>
      </div>

      {/* Authentication Requirements */}
      <section className="mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Authentication</h2>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
          <p className="text-gray-700 text-sm md:text-base">
            <strong>Required:</strong> {apiData?.authentication?.type || 'Bearer token'}
          </p>
          <p className="text-xs md:text-sm text-gray-600 mt-1">
            <code className="bg-gray-100 px-2 py-1 rounded text-xs md:text-sm break-all">{apiData?.authentication?.header || 'Authorization: Bearer <token>'}</code>
          </p>
          {apiData?.authentication?.apiKey && (
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              <code className="bg-gray-100 px-2 py-1 rounded text-xs md:text-sm break-all">{apiData.authentication.apiKey}</code>
            </p>
          )}
        </div>
      </section>

      {/* Path Parameters */}
      {selectedEndpoint.parameters && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Path Parameters</h2>
          <div className="space-y-3 md:space-y-4">
            {Object.entries(selectedEndpoint.parameters).map(([paramName, param]) => (
              <div key={paramName} className="border border-gray-200 rounded-lg p-3 md:p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{paramName}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">
                    {param.type}
                  </span>
                  {param.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                      required
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm md:text-base">{param.description}</p>
                {param.example && (
                  <div className="mt-2">
                    <span className="text-xs md:text-sm text-gray-500">Example: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs md:text-sm break-all">{renderExample(param.example)}</code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Request Body */}
      {selectedEndpoint.requestBody && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Request Body</h2>
          <div className="space-y-3 md:space-y-4">
            {Object.entries(selectedEndpoint.requestBody).map(([fieldName, field]) => (
              <div key={fieldName} className="border border-gray-200 rounded-lg p-3 md:p-4">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <h3 className="font-semibold text-gray-800 text-sm md:text-base">{fieldName}</h3>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">
                    {field.type}
                  </span>
                  {field.required && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                      required
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2 text-sm md:text-base">{field.description}</p>
                {field.example !== undefined && (
                  <div>
                    <span className="text-xs md:text-sm text-gray-500">Example: </span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs md:text-sm font-mono break-all">
                      {renderExample(field.example)}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Response Examples */}
      {selectedEndpoint.responses && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Responses</h2>
          <div className="space-y-3 md:space-y-4">
            {Object.entries(selectedEndpoint.responses).map(([statusCode, response]) => (
              <div key={statusCode} className="border border-gray-200 rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-3 md:px-4 py-2 border-b border-gray-200">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs md:text-sm font-medium ${
                      statusCode.startsWith('2') ? 'bg-green-100 text-green-800' :
                      statusCode.startsWith('4') ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {statusCode}
                    </span>
                    <span className="text-gray-700 text-sm md:text-base">{response.description}</span>
                  </div>
                </div>
                <div className="p-3 md:p-4">
                  <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded text-xs md:text-sm overflow-x-auto">
                    <pre><code className="whitespace-pre-wrap md:whitespace-pre">{response.example}</code></pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Additional sections */}
      {selectedEndpoint.notes && selectedEndpoint.notes.length > 0 && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Important Notes</h2>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4">
            <ul className="space-y-2">
              {selectedEndpoint.notes.map((note, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-blue-800 text-sm md:text-base">{note}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {apiData?.permissions && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Required Permissions</h2>
          <div className="bg-gray-50 rounded-lg p-3 md:p-4">
            <div className="grid grid-cols-1 gap-3">
              {apiData.permissions.map((permission, index) => (
                <div key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                  <div className="min-w-0 flex-1">
                    <code className="text-xs md:text-sm font-mono break-all">{permission.action}</code>
                    <span className="text-gray-600 text-xs md:text-sm ml-2">- {permission.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {apiData?.webhookAuthTypes && (
        <section className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Supported Auth Types</h2>
          <div className="bg-gray-50 rounded-lg p-3 md:p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
              {apiData.webhookAuthTypes.map((authType, index) => (
                <div key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></span>
                  <code className="text-xs md:text-sm font-mono">{authType}</code>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MainContent;