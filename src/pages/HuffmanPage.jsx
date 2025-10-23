import React, { useState } from "react";
import HuffmanVisualizer from "../components/HuffmanVisualizer";
import { greedyAlgorithms } from "../data/allCodes";
import "../styles/global-theme.css";
import AOS from 'aos';
import 'aos/dist/aos.css';

const HuffmanPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("java");

  const algorithmData = greedyAlgorithms.huffmanEncoding || {};

  return (
    <div className="theme-container" data-aos="fade-up" data-aos-duration="1000">
      <h1 className="theme-title">Huffman Coding Algorithm</h1>

      {/* Huffman Coding Algorithm Explanation */}
      <div className="theme-card" style={{ marginBottom: '2rem' }} data-aos="fade-up" data-aos-delay="100">
        <div className="theme-card-header">
          <h3>Understanding Huffman Coding</h3>
        </div>
        <div style={{
          padding: '1.5rem',
          background: 'var(--surface-bg)',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '1.5rem' }}>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🌳 What is Huffman Coding?</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                Huffman coding is a lossless data compression algorithm that uses a greedy approach to build an optimal prefix code. It assigns shorter codes to more frequent characters and longer codes to less frequent ones, achieving optimal compression for a given character frequency distribution.
              </p>
            </div>
            <div>
              <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🎯 Key Advantage</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0 }}>
                <strong>Optimal Compression:</strong> Creates the most efficient prefix code possible for a given set of character frequencies. No other mapping of characters to binary codes can achieve better compression for the same frequency distribution.
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: 'var(--theme-primary)', marginBottom: '0.5rem' }}>🛠️ How Huffman Coding Works</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 1: Frequency Analysis</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Count frequency of each character in the input text</li>
                  <li>Create leaf nodes for each character with their frequencies</li>
                  <li>Initialize priority queue (min-heap) with all leaf nodes</li>
                  <li>Each node represents a subtree with combined frequency</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 2: Tree Construction</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Extract two nodes with smallest frequencies</li>
                  <li>Create new internal node with sum of their frequencies</li>
                  <li>Make the two nodes children of the new node</li>
                  <li>Insert new node back into priority queue</li>
                  <li>Repeat until only one node remains (root)</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 3: Code Generation</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Traverse tree from root to each leaf</li>
                  <li>Assign '0' for left branches, '1' for right branches</li>
                  <li>Concatenate bits along the path to each character</li>
                  <li>Result: shorter codes for frequent characters</li>
                </ul>
              </div>
              <div style={{ background: 'var(--accent-bg)', padding: '1rem', borderRadius: '6px' }}>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.5rem 0' }}>Phase 4: Encoding & Decoding</h5>
                <ul style={{ color: 'var(--text-secondary)', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.5' }}>
                  <li>Replace each character with its binary code</li>
                  <li>Concatenate all codes into compressed bitstream</li>
                  <li>Decoding: traverse tree using bits as directions</li>
                  <li>Reach leaf node = output character, return to root</li>
                </ul>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--success-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>⏱️</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(n log n)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Time Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--warning-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>💾</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>O(n)</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Space Complexity</div>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--info-bg)', borderRadius: '6px' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>🌟</div>
              <div style={{ fontWeight: 'bold', color: 'var(--theme-primary)' }}>Optimal</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Prefix Codes</div>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--surface-elevated)', borderRadius: '6px' }}>
            <h4 style={{ color: 'var(--theme-primary)', margin: '0 0 0.5rem 0' }}>💡 Key Insights</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Prefix Property</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  No code is a prefix of another, enabling unambiguous decoding. This property ensures that the compressed data can be uniquely decompressed.
                </p>
              </div>
              <div>
                <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Greedy Choice</h5>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                  Always combining the two least frequent nodes ensures optimal compression. This greedy strategy leads to the globally optimal solution.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '1rem' }}>
              <h5 style={{ color: 'var(--theme-secondary)', margin: '0 0 0.25rem 0', fontSize: '0.95rem' }}>Applications</h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0, lineHeight: '1.4' }}>
                Used in file compression (ZIP, GZIP), image formats (JPEG), audio/video codecs (MP3, MPEG), and network protocols. Essential for efficient data transmission and storage.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Huffman Visualizer */}
      <div data-aos="fade-up" data-aos-delay="200">
        <HuffmanVisualizer />
      </div>

      {/* Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }} data-aos="fade-up" data-aos-delay="300">
        <div className="theme-card-header">
          <h3>Huffman Coding - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>_
            {["java", "python", "cpp", "javascript", "go"].map((lang) => (
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
              {algorithmData[selectedLanguage]}
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
          <strong>Note:</strong> This is the actual implementation code for Huffman Coding in <strong>{selectedLanguage.toUpperCase()}</strong>. You can copy and use this code in your projects.
        </div>
      </div>
    </div>
  );
};

export default HuffmanPage;
