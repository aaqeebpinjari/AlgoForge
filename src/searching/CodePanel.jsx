import React from 'react';

const CodePanel = ({ codeLines, explanations, currentLine }) => {
    return (
        <div className="code-panel" style={{
            background: 'rgba(26,26,46,0.95)',
            borderRadius: '10px',
            padding: '18px',
            fontFamily: 'Fira Mono, monospace',
            fontSize: '16px',
            color: '#e0e6ed',
            boxShadow: '0 2px 12px rgba(102,204,255,0.08)',
            maxWidth: '420px',
            margin: '0 auto'
        }}>
            {codeLines.map((line, idx) => (
                <div key={idx} style={{
                    background: currentLine === idx + 1 ? 'rgba(102,204,255,0.18)' : 'none',
                    borderRadius: '6px',
                    padding: '8px 10px',
                    marginBottom: '6px',
                    fontWeight: currentLine === idx + 1 ? 700 : 400,
                    color: currentLine === idx + 1 ? '#66ccff' : '#e0e6ed',
                    transition: 'background 0.2s'
                }}>
                    <span style={{
                        display: 'inline-block',
                        width: '32px',
                        color: '#b8c5d1',
                        fontWeight: 400,
                        fontSize: '14px'
                    }}>
                        {idx + 1}.
                    </span>
                    <span>{line}</span>
                    <div style={{
                        fontSize: '13px',
                        color: currentLine === idx + 1 ? '#ffd93d' : '#b8c5d1',
                        marginTop: '4px',
                        marginLeft: '32px',
                        fontWeight: 400,
                        letterSpacing: '0.01em'
                    }}>
                        {explanations[idx]}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CodePanel;