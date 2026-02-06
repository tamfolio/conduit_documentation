// src/components/CodePanel.jsx - Independent Scrolling Version
import React, { useState, useEffect } from 'react';

const CodePanel = ({ selectedEndpoint }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  console.log('CodePanel received selectedEndpoint:', selectedEndpoint);

  const availableLanguages = selectedEndpoint?.codeExamples ? Object.keys(selectedEndpoint.codeExamples) : [];
  console.log('Available languages:', availableLanguages);
  
  useEffect(() => {
    if (selectedEndpoint?.codeExamples) {
      const languages = Object.keys(selectedEndpoint.codeExamples);
      if (!languages.includes(selectedLanguage) && languages.length > 0) {
        setSelectedLanguage(languages[0]);
      }
    }
  }, [selectedEndpoint, selectedLanguage]);

  const languageNames = {
    curl: 'cURL',
    javascript: 'JavaScript',
    php: 'PHP',
    python: 'Python',
    java: 'Java',
    go: 'Go',
    ruby: 'Ruby'
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      console.log('Code copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy code:', err);
    });
  };

  const getResponseExample = () => {
    if (selectedEndpoint?.responses) {
      const successResponse = selectedEndpoint.responses['200'] || selectedEndpoint.responses['201'];
      return successResponse?.example || 'No response example available';
    }
    return 'No response example available';
  };

  if (!selectedEndpoint || !selectedEndpoint.codeExamples) {
    return (
      <div className="w-full bg-gray-900 text-gray-100">
        <div className="p-4 md:p-8 text-center">
          <div className="mb-4">
            <svg className="w-12 md:w-16 h-12 md:h-16 text-gray-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-300 mb-2">Code Examples</h3>
          <p className="text-sm md:text-base text-gray-500 px-4">
            Select an API endpoint to see code examples in multiple programming languages.
          </p>
        
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-900 text-gray-100 flex flex-col h-full">


      {/* Request Section */}
      <div className="flex-1 border-b border-gray-700 flex flex-col">
        {/* Header - Fixed */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-gray-800 border-b border-gray-700 gap-3 sm:gap-0 flex-shrink-0">
          <div className="flex items-center space-x-2 min-w-0">
            <span className={`px-2 py-1 rounded text-xs font-semibold shrink-0 ${
              selectedEndpoint.method === 'GET' ? 'bg-green-600 text-white' :
              selectedEndpoint.method === 'POST' ? 'bg-blue-600 text-white' :
              selectedEndpoint.method === 'PUT' ? 'bg-orange-600 text-white' :
              selectedEndpoint.method === 'DELETE' ? 'bg-red-600 text-white' :
              'bg-gray-600 text-white'
            }`}>
              {selectedEndpoint.method}
            </span>
            <span className="text-gray-300 font-mono text-xs sm:text-sm truncate">{selectedEndpoint.path}</span>
          </div>
          
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-1 rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto"
          >
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {languageNames[lang] || lang}
              </option>
            ))}
          </select>
        </div>

        {/* Code Block - Scrollable */}
        <div className="relative flex-1 overflow-hidden">
          <button
            onClick={() => copyToClipboard(selectedEndpoint.codeExamples[selectedLanguage] || '')}
            className="absolute top-2 md:top-4 right-2 md:right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors z-10 bg-gray-800 bg-opacity-50 rounded"
            title="Copy code"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <div className="h-full overflow-y-auto p-3 md:p-4">
            <pre className="text-xs md:text-sm font-mono">
              <code className="text-gray-200 whitespace-pre-wrap md:whitespace-pre">
                {selectedEndpoint.codeExamples[selectedLanguage] || 'Code example not available'}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Response Section */}
      <div className="flex-1 flex flex-col">
        {/* Response Header - Fixed */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-gray-800 border-b border-gray-700 gap-3 sm:gap-0 flex-shrink-0">
          <h3 className="text-gray-300 font-semibold text-sm md:text-base">Sample Response</h3>
          
          {/* Response Status */}
          {selectedEndpoint.responses && (
            <div className="flex flex-wrap gap-2">
              {Object.keys(selectedEndpoint.responses).map((statusCode) => (
                <span
                  key={statusCode}
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    statusCode.startsWith('2') ? 'bg-green-600 text-white' :
                    statusCode.startsWith('4') ? 'bg-yellow-600 text-white' :
                    'bg-red-600 text-white'
                  }`}
                >
                  {statusCode}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Response Code Block - Scrollable */}
        <div className="relative flex-1 overflow-hidden">
          <button
            onClick={() => copyToClipboard(getResponseExample())}
            className="absolute top-2 md:top-4 right-2 md:right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors z-10 bg-gray-800 bg-opacity-50 rounded"
            title="Copy response"
          >
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <div className="h-full overflow-y-auto p-3 md:p-4">
            <pre className="text-xs md:text-sm font-mono">
              <code className="text-gray-200 whitespace-pre-wrap md:whitespace-pre">
                {getResponseExample()}
              </code>
            </pre>
          </div>
        </div>
      </div>

      {/* Try it out section - Fixed at bottom */}
      <div className="border-t border-gray-700 p-3 md:p-4 bg-gray-800 flex-shrink-0">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors text-sm md:text-base">
          Try it out →
        </button>
      </div>
    </div>
  );
};

export default CodePanel;