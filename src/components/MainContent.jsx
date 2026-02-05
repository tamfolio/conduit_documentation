// src/components/MainContent.jsx
import React from 'react';

const MainContent = () => {
  return (
    <main className="flex-1 max-w-3xl p-8 bg-white">
      {/* Headers Section */}
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Headers</h1>
        
        {/* Authorization Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">authorization</h2>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">string</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Set value to{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                Bearer SECRET_KEY
              </code>
            </p>
          </div>
        </div>

        {/* Content-Type Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">content-type</h2>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">string</span>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-600">
              Set value to{' '}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                application/json
              </code>
            </p>
          </div>
        </div>
      </section>

      {/* Body Parameters Section */}
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Body Parameters</h1>
        
        {/* Amount Parameter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">amount</h3>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">string</span>
          </div>
          <p className="text-gray-600 mb-2">
            Amount should be in the subunit of the{' '}
            <a href="#" className="text-blue-600 hover:text-blue-800 underline">
              supported currency
            </a>
          </p>
        </div>

        {/* Email Parameter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">email</h3>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">string</span>
          </div>
          <p className="text-gray-600">Customer's email address</p>
        </div>

        {/* Channels Parameter */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-800">channels</h3>
            <span className="ml-3 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded font-mono">array</span>
            <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">optional</span>
          </div>
          <p className="text-gray-600 mb-4">
            An array of payment channels to control what channels you want to make available for the user to make a payment with.
          </p>
          
          {/* Available channels */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Available channels:</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>card</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>bank</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>ussd</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>qr</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>mobile_money</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>bank_transfer</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Parameters Hint */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div className="ml-3">
              <h4 className="text-blue-800 font-medium">Need more parameters?</h4>
              <p className="text-blue-700 text-sm mt-1">
                Check the complete API reference for additional optional parameters you can include in your request.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;