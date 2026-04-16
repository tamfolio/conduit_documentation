import React, { useState } from 'react';

const SunIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M3 12h18M3 6h18M3 18h18"/>
  </svg>
);

const Header = ({ onMobileMenuToggle, theme, onThemeToggle }) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="docs-header">
      {/* Left — hamburger + logo */}
      <div className="docs-header-left">
        <button
          onClick={onMobileMenuToggle}
          className="theme-toggle md:hidden"
          aria-label="Toggle menu"
        >
          <MenuIcon />
        </button>

        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/assets/conduit_logo.png"
            alt="Conduit"
            style={{ height: '32px', width: 'auto' }}
          />
        </a>
      </div>

      {/* Center — search */}
      <div className="docs-header-center">
        <div className="docs-search">
          <svg className="docs-search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            type="text"
            placeholder="Search API reference..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Right — nav + theme */}
      <div className="docs-header-right">
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <a href="#" className="docs-nav-tab active">API Reference</a>
          <a href="#" className="docs-nav-tab">Guides</a>
          <a href="#" className="docs-nav-tab">Changelog</a>
        </nav>

        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />

        <button
          className="theme-toggle"
          onClick={onThemeToggle}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;