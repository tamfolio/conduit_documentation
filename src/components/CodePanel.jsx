import React, { useState, useEffect } from 'react';

const CopyIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const CodeIcon = () => (
  <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: '#30363d' }}>
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
  </svg>
);

const languageNames = {
  curl: 'cURL',
  javascript: 'JavaScript',
  php: 'PHP',
  python: 'Python',
  java: 'Java',
  go: 'Go',
  ruby: 'Ruby',
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`code-copy-btn ${copied ? 'copied' : ''}`}
    >
      {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
    </button>
  );
};

const CodePanel = ({ selectedEndpoint }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('curl');

  const availableLanguages = selectedEndpoint?.codeExamples
    ? Object.keys(selectedEndpoint.codeExamples)
    : [];

  useEffect(() => {
    if (availableLanguages.length > 0 && !availableLanguages.includes(selectedLanguage)) {
      setSelectedLanguage(availableLanguages[0]);
    }
  }, [selectedEndpoint]);

  const getSuccessResponse = () => {
    if (!selectedEndpoint?.responses) return 'No response example available';
    const r = selectedEndpoint.responses['200'] || selectedEndpoint.responses['201'];
    return r?.example || 'No response example available';
  };

  const currentCode = selectedEndpoint?.codeExamples?.[selectedLanguage] || 'Code example not available';
  const responseCode = getSuccessResponse();

  if (!selectedEndpoint || !selectedEndpoint.codeExamples) {
    return (
      <aside className="docs-code-panel">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '40px 24px',
          textAlign: 'center',
          gap: '12px',
        }}>
          <CodeIcon />
          <div>
            <p style={{ fontSize: '13px', fontWeight: 600, color: '#8b949e', margin: '0 0 6px' }}>
              Code Examples
            </p>
            <p style={{ fontSize: '12px', color: '#6e7681', margin: 0, lineHeight: '1.6' }}>
              Select an API endpoint to see code examples in multiple languages.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="docs-code-panel">

      {/* ── Request Section ── */}
      <div className="code-panel-section">
        <div className="code-panel-header">
          <span className="code-panel-title">Request</span>

          {/* Language tabs */}
          <div className="lang-tabs">
            {availableLanguages.map(lang => (
              <button
                key={lang}
                className={`lang-tab ${selectedLanguage === lang ? 'active' : ''}`}
                onClick={() => setSelectedLanguage(lang)}
              >
                {languageNames[lang] || lang}
              </button>
            ))}
          </div>

          <CopyButton text={currentCode} />
        </div>

        <div className="code-scroll">
          <pre className="code-block">{currentCode}</pre>
        </div>
      </div>

      {/* ── Response Section ── */}
      <div className="code-panel-section">
        <div className="code-panel-header">
          <span className="code-panel-title">Response</span>

          {/* Status codes */}
          {selectedEndpoint.responses && (
            <div style={{ display: 'flex', gap: '4px' }}>
              {Object.keys(selectedEndpoint.responses).map(code => (
                <span
                  key={code}
                  style={{
                    padding: '2px 7px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 600,
                    fontFamily: 'monospace',
                    background: code.startsWith('2') ? 'rgba(22,163,74,0.2)' : 'rgba(234,88,12,0.2)',
                    color: code.startsWith('2') ? '#4ade80' : '#fb923c',
                  }}
                >
                  {code}
                </span>
              ))}
            </div>
          )}

          <CopyButton text={responseCode} />
        </div>

        <div className="code-scroll">
          <pre className="code-block">{responseCode}</pre>
        </div>
      </div>

      {/* ── Try it out ── */}
      <button className="try-it-btn">
        Try it out →
      </button>

    </aside>
  );
};

export default CodePanel;