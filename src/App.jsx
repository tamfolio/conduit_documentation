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
  const [theme, setTheme] = useState(() => localStorage.getItem('docs-theme') || 'light');

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('docs-theme', theme);
  }, [theme]);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  return (
    <div className="docs-layout">
      <Header
        selectedAPI={selectedAPI}
        selectedEndpoint={selectedEndpoint}
        onMobileMenuToggle={() => setIsMobileMenuOpen(o => !o)}
        theme={theme}
        onThemeToggle={toggleTheme}
        onEndpointSelect={(ep) => setSelectedEndpoint(ep)}
        onAPIChange={(api) => { setSelectedAPI(api); setSelectedEndpoint(null); }}
      />

      <div className="docs-body">
        {/* Mobile overlay */}
        <div
          className={`mobile-overlay ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        <Sidebar
          onEndpointSelect={(ep) => { setSelectedEndpoint(ep); setIsMobileMenuOpen(false); }}
          onAPIChange={(api) => { setSelectedAPI(api); setSelectedEndpoint(null); setIsMobileMenuOpen(false); }}
          selectedEndpoint={selectedEndpoint}
          selectedAPI={selectedAPI}
          isOpen={isMobileMenuOpen}
        />

        <main className="docs-main">
          <MainContent
            selectedEndpoint={selectedEndpoint}
            apiData={selectedAPI}
          />
        </main>

        <CodePanel selectedEndpoint={selectedEndpoint} />
      </div>
    </div>
  );
}

export default App;