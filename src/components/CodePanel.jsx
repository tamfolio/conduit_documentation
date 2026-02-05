// src/components/CodePanel.jsx
import React, { useState } from 'react';

const CodePanel = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('Node');
  const [selectedResponse, setSelectedResponse] = useState('200 OK');

  const languages = ['Node', 'cURL', 'PHP', 'Python', 'Ruby'];
  const responseTypes = ['200 OK', '400 Bad Request', '401 Unauthorized'];

  const codeExamples = {
    'Node': {
      request: `const https = require('https');

const params = JSON.stringify({
  "email": "customer@email.com",
  "amount": "20000"
});

const options = {
  hostname: 'api.paystack.co',
  port: 443,
  path: '/transaction/initialize',
  method: 'POST',
  headers: {
    Authorization: 'Bearer SECRET_KEY',
    'Content-Type': 'application/json'
  }
};

const req = https.request(options, res => {
  let data = '';
  
  res.on('data', chunk => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log(JSON.parse(data));
  });
}).on('error', error => {
  console.error(error);
});

req.write(params);
req.end();`,
      response: `{
  "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
    "access_code": "0peioxfhpn",
    "reference": "7PVGX8MEk85tgeEpVDtD"
  }
}`
    },
    'cURL': {
      request: `curl https://api.paystack.co/transaction/initialize \\
-H "Authorization: Bearer SECRET_KEY" \\
-H "Content-Type: application/json" \\
-d '{"reference": "7PVGX8MEk85tgeEpVDtD", "amount": "20000", "email": "customer@email.com"}' \\
-X POST`,
      response: `{
  "status": true,
  "message": "Authorization URL created",
  "data": {
    "authorization_url": "https://checkout.paystack.com/0peioxfhpn",
    "access_code": "0peioxfhpn",
    "reference": "7PVGX8MEk85tgeEpVDtD"
  }
}`
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      // You can add a toast notification here
      console.log('Code copied to clipboard!');
    });
  };

  return (
    <div className="w-1/2 bg-gray-900 text-gray-100">
      {/* Request Section */}
      <div className="border-b border-gray-700">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <div className="flex items-center space-x-2">
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-semibold">POST</span>
            <span className="text-gray-300 font-mono text-sm">/transaction/initialize</span>
          </div>
          
          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-1 rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        {/* Code Block */}
        <div className="relative">
          <button
            onClick={() => copyToClipboard(codeExamples[selectedLanguage]?.request || '')}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors"
            title="Copy code"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            <code className="text-gray-200 whitespace-pre">
              {codeExamples[selectedLanguage]?.request || 'Code example not available'}
            </code>
          </pre>
        </div>
      </div>

      {/* Response Section */}
      <div>
        {/* Response Header */}
        <div className="flex items-center justify-between p-4 bg-gray-800">
          <h3 className="text-gray-300 font-semibold">Sample Response</h3>
          
          {/* Response Status Selector */}
          <select
            value={selectedResponse}
            onChange={(e) => setSelectedResponse(e.target.value)}
            className="bg-gray-700 text-gray-200 px-3 py-1 rounded text-sm border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {responseTypes.map((response) => (
              <option key={response} value={response}>{response}</option>
            ))}
          </select>
        </div>

        {/* Response Code Block */}
        <div className="relative">
          <button
            onClick={() => copyToClipboard(codeExamples[selectedLanguage]?.response || '')}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-200 transition-colors"
            title="Copy response"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <pre className="p-4 text-sm font-mono overflow-x-auto">
            <code className="text-gray-200 whitespace-pre">
              {codeExamples[selectedLanguage]?.response || 'Response example not available'}
            </code>
          </pre>
        </div>
      </div>

      {/* Try it out section */}
      <div className="border-t border-gray-700 p-4 bg-gray-800">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-medium transition-colors">
          Try it out →
        </button>
      </div>
    </div>
  );
};

export default CodePanel;