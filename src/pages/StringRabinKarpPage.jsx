import React, { useState } from "react";
import RabinKarpVisualizer from "../components/RabinKarpVisualizer";
import { stringAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const StringRabinKarpPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  const algorithmData = stringAlgorithms["rabinKarp"] || {};

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Rabin-Karp String Matching Algorithm</h1>

      {/* Rabin-Karp Algorithm Explanation */}
      <div className="theme-card" style={{ marginBottom: '2rem' }} data-aos="fade-up" data-aos-delay="100">
        <div className="theme-card-header">
          <h3>Understanding the Rabin-Karp Algorithm</h3>
        </div>
        <div style={{
          padding: '1.5rem',
          background: 'var(--surface-bg)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🔍 What is Rabin-Karp?</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                The Rabin-Karp algorithm is an efficient string searching algorithm that uses hashing to find occurrences of a "pattern" within a larger "text" string. It uses rolling hash technique to avoid re-examining previously matched characters.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>⚡ Key Advantage</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                <strong>Average Time Complexity:</strong> O(n + m) where n is text length and m is pattern length, making it highly efficient for large texts. Worst case is O((n-m+1)×m) but rare with good hash functions.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🛠️ How Rabin-Karp Works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 1: Hash Calculation</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Compute hash value for the pattern</li>
                  <li>Compute hash value for the first window of text (same length as pattern)</li>
                  <li>Use rolling hash technique for subsequent windows</li>
                  <li>Compare hash values first, then characters if hashes match</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 2: Rolling Hash</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Remove leading character from hash: subtract (text[i] × h^(m-1))</li>
                  <li>Shift hash left: multiply by base (d)</li>
                  <li>Add trailing character: add text[i+m]</li>
                  <li>All operations modulo q to prevent overflow</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--success-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(n+m)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Average Time</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--warning-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💾</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(1)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--info-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>Rolling Hash</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Key Technique</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>💡 Key Insights</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Hash Function</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Uses polynomial rolling hash: hash = (d^(m-1)×text[0] + d^(m-2)×text[1] + ... + d^0×text[m-1]) mod q
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Collision Handling</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  When hashes match, performs character-by-character comparison to handle potential hash collisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <RabinKarpVisualizer />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>Rabin-Karp Algorithm - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {["java", "python", "cpp", "go"].map((lang) => (
              <button
                key={lang}
                className={`btn ${selectedLanguage === lang ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage(lang)}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
          overflow: 'auto',
          maxHeight: '500px'
        }}>
          <pre style={{
            margin: 0,
            fontFamily: 'Consolas, Monaco, "Courier New", monospace',
            fontSize: '0.9rem',
            lineHeight: '1.5',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
            <code>
              {algorithmData[selectedLanguage] || `// Implementation not available in ${selectedLanguage.toUpperCase()}`}
            </code>
          </pre>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: 'var(--accent-warning-bg)',
          borderRadius: '6px',
          fontSize: '0.9rem',
          color: 'var(--text-secondary)'
        }}>
          <strong>Note:</strong> This is the actual implementation code for the <strong>Rabin-Karp</strong> algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default StringRabinKarpPage;
