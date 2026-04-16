import React from 'react';

const MethodBadge = ({ method }) => (
  <span className={`method-badge method-${method}`} style={{ fontSize: '12px', padding: '3px 8px' }}>
    {method}
  </span>
);

const InfoIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}>
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);

const renderExample = (example) => {
  if (typeof example === 'object' && example !== null) return JSON.stringify(example, null, 2);
  return String(example);
};

const getStatusClass = (code) => {
  if (code.startsWith('2')) return 'status-2xx';
  if (code.startsWith('4')) return 'status-4xx';
  return 'status-5xx';
};

const MainContent = ({ selectedEndpoint, apiData }) => {
  if (!selectedEndpoint) {
    return (
      <div className="welcome-screen">
        <div className="welcome-icon">📚</div>
        <h1 className="welcome-title">Conduit API Reference</h1>
        <p className="welcome-desc">
          Select an endpoint from the sidebar to view detailed documentation, parameters, and response formats.
        </p>
        <div className="welcome-card">
          <h3>Getting Started</h3>
          <p>
            All API endpoints require authentication. Include your Bearer token in the
            <code style={{ fontFamily: 'monospace', fontSize: '12px', background: 'var(--bg-tertiary)', padding: '1px 5px', borderRadius: '3px', margin: '0 3px' }}>
              Authorization
            </code>
            header with every request.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="docs-content">

      {/* ── Endpoint Header ── */}
      <div className="endpoint-header">
        <div className="endpoint-title-row">
          <MethodBadge method={selectedEndpoint.method} />
          <h1 className="endpoint-title">{selectedEndpoint.name}</h1>
        </div>

        <div className="endpoint-path">
          <span style={{ color: 'var(--text-muted)', fontSize: '12px', userSelect: 'none' }}>
            {selectedEndpoint.method}
          </span>
          <span>{selectedEndpoint.path}</span>
        </div>

        <p className="endpoint-description">{selectedEndpoint.description}</p>
      </div>

      {/* ── Authentication ── */}
      <div className="docs-section">
        <h2 className="docs-section-title">Authentication</h2>
        <div className="auth-banner">
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ flexShrink: 0, marginTop: '1px' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
          </svg>
          <div>
            <div><strong>{apiData?.authentication?.type || 'Bearer Token'}</strong></div>
            <div style={{ marginTop: '4px' }}>
              <code>{apiData?.authentication?.header || 'Authorization: Bearer <token>'}</code>
            </div>
            {apiData?.authentication?.apiKey && (
              <div style={{ marginTop: '4px' }}>
                <code>{apiData.authentication.apiKey}</code>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Path Parameters ── */}
      {selectedEndpoint.parameters && Object.keys(selectedEndpoint.parameters).length > 0 && (
        <div className="docs-section">
          <h2 className="docs-section-title">Path Parameters</h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table className="param-table">
              <thead>
                <tr>
                  <th style={{ width: '140px' }}>Name</th>
                  <th style={{ width: '90px' }}>Type</th>
                  <th style={{ width: '80px' }}>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedEndpoint.parameters).map(([name, param]) => (
                  <tr key={name}>
                    <td><span className="param-name">{name}</span></td>
                    <td><span className="param-type">{param.type}</span></td>
                    <td>
                      {param.required && <span className="param-required">required</span>}
                    </td>
                    <td>
                      <div className="param-desc">{param.description}</div>
                      {param.example !== undefined && (
                        <div className="param-example">e.g. {renderExample(param.example)}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Request Body ── */}
      {selectedEndpoint.requestBody && Object.keys(selectedEndpoint.requestBody).length > 0 && (
        <div className="docs-section">
          <h2 className="docs-section-title">Request Body</h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table className="param-table">
              <thead>
                <tr>
                  <th style={{ width: '140px' }}>Field</th>
                  <th style={{ width: '90px' }}>Type</th>
                  <th style={{ width: '80px' }}>Required</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(selectedEndpoint.requestBody).map(([name, field]) => (
                  <tr key={name}>
                    <td><span className="param-name">{name}</span></td>
                    <td><span className="param-type">{field.type}</span></td>
                    <td>
                      {field.required && <span className="param-required">required</span>}
                    </td>
                    <td>
                      <div className="param-desc">{field.description}</div>
                      {field.example !== undefined && (
                        <div className="param-example">e.g. {renderExample(field.example)}</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── Responses ── */}
      {selectedEndpoint.responses && Object.keys(selectedEndpoint.responses).length > 0 && (
        <div className="docs-section">
          <h2 className="docs-section-title">Responses</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(selectedEndpoint.responses).map(([code, response]) => (
              <div key={code} className="response-block">
                <div className="response-header">
                  <span className={`status-badge ${getStatusClass(code)}`}>{code}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{response.description}</span>
                </div>
                {response.example && (
                  <div style={{ background: 'var(--bg-code)', padding: '14px 16px', overflowX: 'auto' }}>
                    <pre style={{ margin: 0, fontFamily: "'SF Mono','Fira Code',monospace", fontSize: '12px', color: '#e2e8f0', lineHeight: '1.65' }}>
                      <code>{response.example}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Notes ── */}
      {selectedEndpoint.notes && selectedEndpoint.notes.length > 0 && (
        <div className="docs-section">
          <h2 className="docs-section-title">Important Notes</h2>
          <ul className="notes-list">
            {selectedEndpoint.notes.map((note, i) => (
              <li key={i}>
                <InfoIcon />
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Permissions ── */}
      {apiData?.permissions && (
        <div className="docs-section">
          <h2 className="docs-section-title">Required Permissions</h2>
          <div style={{ border: '1px solid var(--border)', borderRadius: '8px', overflow: 'hidden' }}>
            <table className="param-table">
              <thead>
                <tr>
                  <th>Permission</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {apiData.permissions.map((p, i) => (
                  <tr key={i}>
                    <td><span className="param-name">{p.action}</span></td>
                    <td><span className="param-desc">{p.description}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
};

export default MainContent;