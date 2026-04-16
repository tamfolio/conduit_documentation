import React, { useState, useRef, useEffect, useCallback } from 'react';
import { allAPIs } from '../data/apiData';

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

const MethodBadge = ({ method }) => (
  <span className={`method-badge method-${method}`}>{method}</span>
);

// Build a flat searchable index from allAPIs
const buildSearchIndex = () => {
  const index = [];
  Object.values(allAPIs).forEach(api => {
    api.endpoints.forEach(ep => {
      index.push({
        apiTitle: api.title,
        api,
        endpoint: ep,
      });
    });
  });
  return index;
};

const searchIndex = buildSearchIndex();

const Header = ({ onMobileMenuToggle, theme, onThemeToggle, onEndpointSelect, onAPIChange }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Search logic
  const handleSearch = useCallback((value) => {
    setQuery(value);
    setFocusedIndex(-1);

    if (!value.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const q = value.toLowerCase();
    const matched = searchIndex.filter(({ apiTitle, endpoint }) =>
      endpoint.name.toLowerCase().includes(q) ||
      endpoint.path.toLowerCase().includes(q) ||
      endpoint.method.toLowerCase().includes(q) ||
      endpoint.description?.toLowerCase().includes(q) ||
      apiTitle.toLowerCase().includes(q)
    );

    // Group by API title
    const grouped = {};
    matched.forEach(item => {
      if (!grouped[item.apiTitle]) grouped[item.apiTitle] = { api: item.api, endpoints: [] };
      grouped[item.apiTitle].endpoints.push(item.endpoint);
    });

    setResults(Object.entries(grouped));
    setIsOpen(matched.length > 0);
  }, []);

  // Select an endpoint from results
  const handleSelect = (api, endpoint) => {
    onAPIChange(api);
    onEndpointSelect(endpoint);
    setQuery('');
    setResults([]);
    setIsOpen(false);
    inputRef.current?.blur();
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) return;

    const flat = results.flatMap(([, { api, endpoints }]) =>
      endpoints.map(ep => ({ api, ep }))
    );

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(i => Math.min(i + 1, flat.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(i => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault();
      const { api, ep } = flat[focusedIndex];
      handleSelect(api, ep);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      inputRef.current?.blur();
    }
  };

  // Cmd+K / Ctrl+K to focus search
  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropdownRef.current && !dropdownRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Track flat index across groups for keyboard nav
  let flatCounter = 0;

  return (
    <header className="docs-header">
      {/* Left */}
      <div className="docs-header-left">
        <button onClick={onMobileMenuToggle} className="theme-toggle md:hidden" aria-label="Toggle menu">
          <MenuIcon />
        </button>
        <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img src="/assets/conduit_logo.png" alt="Conduit" style={{ height: '32px', width: 'auto' }} />
        </a>
      </div>

      {/* Center — search */}
      <div className="docs-header-center" style={{ position: 'relative' }}>
        <div className="docs-search">
          <svg className="docs-search-icon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search endpoints… (⌘K)"
            value={query}
            onChange={e => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query && setIsOpen(results.length > 0)}
            autoComplete="off"
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setResults([]); setIsOpen(false); }}
              style={{
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)',
                display: 'flex', alignItems: 'center', padding: '2px',
              }}
            >
              <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          )}
        </div>

        {/* Dropdown */}
        {isOpen && results.length > 0 && (
          <div
            ref={dropdownRef}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              left: 0,
              right: 0,
              background: 'var(--bg-primary)',
              border: '1px solid var(--border)',
              borderRadius: '10px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              zIndex: 200,
              overflow: 'hidden',
              maxHeight: '420px',
              overflowY: 'auto',
            }}
          >
            {results.map(([apiTitle, { api, endpoints }]) => (
              <div key={apiTitle}>
                {/* Group label */}
                <div style={{
                  padding: '8px 14px 4px',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  background: 'var(--bg-secondary)',
                  borderBottom: '1px solid var(--border-light)',
                }}>
                  {apiTitle}
                </div>

                {/* Endpoints */}
                {endpoints.map(ep => {
                  const idx = flatCounter++;
                  const isFocused = idx === focusedIndex;

                  return (
                    <button
                      key={ep.id}
                      onClick={() => handleSelect(api, ep)}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 14px',
                        background: isFocused ? 'var(--bg-tertiary)' : 'none',
                        border: 'none',
                        borderBottom: '1px solid var(--border-light)',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 0.1s',
                        fontFamily: 'Graphik, sans-serif',
                      }}
                      onMouseEnter={() => setFocusedIndex(idx)}
                    >
                      <MethodBadge method={ep.method} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '2px' }}>
                          {ep.name}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {ep.path}
                        </div>
                      </div>
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Footer hint */}
            <div style={{
              padding: '8px 14px',
              fontSize: '11px',
              color: 'var(--text-muted)',
              display: 'flex',
              gap: '12px',
              background: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border)',
            }}>
              <span>↑↓ navigate</span>
              <span>↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="docs-header-right">
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
          <a href="#" className="docs-nav-tab active">API Reference</a>
          <a href="#" className="docs-nav-tab">Guides</a>
          <a href="#" className="docs-nav-tab">Changelog</a>
        </nav>
        <div style={{ width: '1px', height: '20px', background: 'var(--border)', margin: '0 4px' }} />
        <button className="theme-toggle" onClick={onThemeToggle} aria-label="Toggle theme">
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
      </div>
    </header>
  );
};

export default Header;