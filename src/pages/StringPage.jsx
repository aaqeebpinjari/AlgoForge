// src/pages/StringPage.jsx
import React, { useState, useEffect } from "react";
import StringVisualizer from "../components/StringVisualizer";
import { stringAlgorithms } from "../data/allCodes";
import { getComplexity } from "../data/algorithmComplexity";
import ComplexityBadge from "../components/ComplexityBadge";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const StringPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  // Restore last selected language on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("StringPage.selectedLanguage");
    if (savedLanguage && ["java", "python", "cpp","go"].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Persist language preference whenever it changes
  useEffect(() => {
    localStorage.setItem("StringPage.selectedLanguage", selectedLanguage);
  }, [selectedLanguage]);

  const algorithmData = stringAlgorithms["KMP"] || {};
  const complexity = getComplexity("KMP");

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h1 className="theme-title" style={{ margin: 0 }}>KMP String Matching Algorithm</h1>
        <ComplexityBadge time={complexity?.time} space={complexity?.space} />
      </div>

      {/* KMP Algorithm Explanation */}
      <div className="theme-card" style={{ marginBottom: '2rem' }} data-aos="fade-up" data-aos-delay="100">
        <div className="theme-card-header">
          <h3>Understanding the KMP Algorithm</h3>
        </div>
        <div style={{
          padding: '1.5rem',
          background: 'var(--surface-bg)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🔍 What is KMP?</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                The Knuth-Morris-Pratt (KMP) algorithm is an efficient string searching algorithm that finds occurrences of a "pattern" within a larger "text" string. Unlike naive approaches that may re-examine characters, KMP uses preprocessing to skip unnecessary comparisons.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>⚡ Key Advantage</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                <strong>Time Complexity:</strong> O(n + m) where n is text length and m is pattern length, compared to O(n×m) for naive search. This makes KMP highly efficient for large texts and repeated pattern searches.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🛠️ How KMP Works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 1: LPS Array Construction</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Preprocesses the pattern to create Longest Prefix Suffix (LPS) array</li>
                  <li>LPS[i] stores length of longest proper prefix that is also a suffix</li>
                  <li>Enables intelligent backtracking during mismatches</li>
                  <li>Built in O(m) time using dynamic programming approach</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 2: Pattern Matching</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Scans text from left to right using two pointers (i for text, j for pattern)</li>
                  <li>On match: advances both pointers</li>
                  <li>On mismatch: uses LPS array to determine how far to shift pattern</li>
                  <li>Avoids re-examining already matched characters</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--success-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>📊</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(n + m)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--warning-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💾</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(m)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--info-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🎯</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>Optimal</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No Backtracking</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>💡 Key Insights</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>LPS Array Purpose</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  The LPS array tells us how far we can shift the pattern when a mismatch occurs, avoiding redundant comparisons.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>No Backtracking</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Unlike some algorithms, KMP never backtracks in the text - it only moves forward, making it highly efficient.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizer Component */}
      <div data-aos="fade-up" data-aos-delay="200">
        <StringVisualizer />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>KMP Algorithm - Code Implementation</h3>
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
          <strong>Note:</strong> This is the actual implementation code for the <strong>Knuth-Morris-Pratt (KMP)</strong> algorithm in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default StringPage;
