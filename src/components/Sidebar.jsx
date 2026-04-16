import React, { useState } from 'react';
import { getAPICategories } from '../data/apiData';

const ChevronIcon = ({ open }) => (
  <svg className={`sidebar-group-chevron ${open ? 'open' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path d="M9 18l6-6-6-6"/>
  </svg>
);

const categoryIcons = {
  'Company APIs': (
    <svg className="sidebar-group-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  'Fintech APIs': (
    <svg className="sidebar-group-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/>
    </svg>
  ),
  'Integration APIs': (
    <svg className="sidebar-group-icon" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
    </svg>
  ),
};

const MethodBadge = ({ method }) => (
  <span className={`method-badge method-${method}`}>{method}</span>
);

const Sidebar = ({ onEndpointSelect, onAPIChange, selectedEndpoint, selectedAPI, isOpen }) => {
  const apiCategories = getAPICategories();

  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(Object.keys(apiCategories).map(k => [k, true]))
  );

  const toggleGroup = (name) =>
    setExpandedGroups(p => ({ ...p, [name]: !p[name] }));

  return (
    <aside className={`docs-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-section-label">API Reference</div>

      {Object.entries(apiCategories).map(([categoryName, apis]) => (
        <div key={categoryName} className="sidebar-group">
          {/* Category header */}
          <button
            className="sidebar-group-btn"
            onClick={() => toggleGroup(categoryName)}
          >
            {categoryIcons[categoryName] || null}
            <span style={{ flex: 1 }}>{categoryName}</span>
            <span className="sidebar-group-count">{apis.length}</span>
            <ChevronIcon open={expandedGroups[categoryName]} />
          </button>

          {/* APIs in category */}
          {expandedGroups[categoryName] && (
            <div>
              {apis.map(api => (
                <div key={api.title}>
                  <button
                    className={`sidebar-api-btn ${selectedAPI?.title === api.title ? 'active' : ''}`}
                    onClick={() => onAPIChange(api)}
                  >
                    {api.title}
                    <span className="sidebar-api-count">
                      · {api.endpoints.length} endpoint{api.endpoints.length !== 1 ? 's' : ''}
                    </span>
                  </button>

                  {/* Endpoints */}
                  {selectedAPI?.title === api.title && (
                    <div className="sidebar-endpoints">
                      {api.endpoints.map(ep => (
                        <button
                          key={ep.id}
                          className={`sidebar-endpoint-btn ${selectedEndpoint?.id === ep.id ? 'active' : ''}`}
                          onClick={() => onEndpointSelect(ep)}
                        >
                          <MethodBadge method={ep.method} />
                          <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {ep.name}
                          </span>
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
    </aside>
  );
};

export default Sidebar;