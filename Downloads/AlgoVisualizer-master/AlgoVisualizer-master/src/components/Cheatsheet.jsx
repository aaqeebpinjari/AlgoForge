import React, { useState, useEffect } from 'react';
import { FaSearch, FaClock, FaMemory, FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaLightbulb, FaBook } from 'react-icons/fa';
import { cheatsheetData, bigOReference, algorithmTips } from '../data/cheatsheetData';
import '../styles/cheatsheet.css';
import AOS from 'aos';

const Cheatsheet = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState({});
  const [showBigO, setShowBigO] = useState(false);
  const [showTips, setShowTips] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const categories = [
    { id: 'all', label: 'All', icon: '📚' },
    { id: 'sorting', label: 'Sorting', icon: cheatsheetData.sorting.icon },
    { id: 'searching', label: 'Searching', icon: cheatsheetData.searching.icon },
    { id: 'dataStructures', label: 'Data Structures', icon: cheatsheetData.dataStructures.icon },
    { id: 'graph', label: 'Graph', icon: cheatsheetData.graph.icon },
    { id: 'advanced', label: 'Advanced', icon: cheatsheetData.advancedAlgorithms.icon }
  ];

  const toggleExpand = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedItems(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const isExpanded = (category, index) => {
    return expandedItems[`${category}-${index}`] || false;
  };

  const filterContent = (items, category) => {
    if (!items) return [];
    
    return items.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || selectedCategory === category;
      return matchesSearch && matchesCategory;
    });
  };

  const getComplexityColor = (complexity) => {
    if (!complexity) return '#999';
    const comp = complexity.toLowerCase();
    if (comp.includes('o(1)')) return '#00C853';
    if (comp.includes('o(log n)')) return '#64DD17';
    if (comp.includes('o(n)') && !comp.includes('log') && !comp.includes('²')) return '#FFD600';
    if (comp.includes('o(n log n)')) return '#FF6D00';
    if (comp.includes('o(n²)')) return '#FF3D00';
    if (comp.includes('o(2')) return '#D50000';
    if (comp.includes('o(n!)')) return '#AA00FF';
    return '#999';
  };

  const renderAlgorithmCard = (algorithm, category, index) => {
    const expanded = isExpanded(category, index);
    
    return (
      <div 
        key={`${category}-${index}`}
        className="algo-card"
        data-aos="fade-up"
        data-aos-delay={index * 50}
      >
        <div className="algo-card-header" onClick={() => toggleExpand(category, index)}>
          <div className="algo-title-section">
            <h3 className="algo-name">{algorithm.name}</h3>
            <button className="expand-btn" aria-label="Expand details">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          
          <div className="complexity-badges">
            {algorithm.timeComplexity && (
              <div className="complexity-badge">
                <span className="badge-label">Time:</span>
                <span className="badge-value">
                  {typeof algorithm.timeComplexity === 'object' 
                    ? algorithm.timeComplexity.average || algorithm.timeComplexity.worst
                    : algorithm.timeComplexity}
                </span>
              </div>
            )}
            {algorithm.spaceComplexity && (
              <div className="complexity-badge">
                <span className="badge-label">Space:</span>
                <span className="badge-value">{algorithm.spaceComplexity}</span>
              </div>
            )}
          </div>
        </div>

        <p className="algo-description">{algorithm.description}</p>

        {expanded && (
          <div className="algo-details">
            {algorithm.timeComplexity && typeof algorithm.timeComplexity === 'object' && (
              <div className="detail-section">
                <h4>Time Complexity</h4>
                <div className="complexity-breakdown">
                  <div className="complexity-item">
                    <span className="complexity-label">Best:</span>
                    <span 
                      className="complexity-value"
                      style={{ color: getComplexityColor(algorithm.timeComplexity.best) }}
                    >
                      {algorithm.timeComplexity.best}
                    </span>
                  </div>
                  <div className="complexity-item">
                    <span className="complexity-label">Average:</span>
                    <span 
                      className="complexity-value"
                      style={{ color: getComplexityColor(algorithm.timeComplexity.average) }}
                    >
                      {algorithm.timeComplexity.average}
                    </span>
                  </div>
                  <div className="complexity-item">
                    <span className="complexity-label">Worst:</span>
                    <span 
                      className="complexity-value"
                      style={{ color: getComplexityColor(algorithm.timeComplexity.worst) }}
                    >
                      {algorithm.timeComplexity.worst}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {algorithm.stable !== undefined && (
              <div className="detail-section">
                <h4>Properties</h4>
                <div className="properties-grid">
                  <div className="property-item">
                    <span className="property-label">Stable:</span>
                    <span className={`property-value ${algorithm.stable ? 'yes' : 'no'}`}>
                      {algorithm.stable ? <><FaCheck /> Yes</> : <><FaTimes /> No</>}
                    </span>
                  </div>
                  {algorithm.inPlace !== undefined && (
                    <div className="property-item">
                      <span className="property-label">In-Place:</span>
                      <span className={`property-value ${algorithm.inPlace ? 'yes' : 'no'}`}>
                        {algorithm.inPlace ? <><FaCheck /> Yes</> : <><FaTimes /> No</>}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {algorithm.useCases && algorithm.useCases.length > 0 && (
              <div className="detail-section">
                <h4>Use Cases</h4>
                <ul className="use-cases-list">
                  {algorithm.useCases.map((useCase, idx) => (
                    <li key={idx}>{useCase}</li>
                  ))}
                </ul>
              </div>
            )}

            {algorithm.pros && algorithm.pros.length > 0 && (
              <div className="detail-section">
                <h4>Advantages</h4>
                <ul className="pros-list">
                  {algorithm.pros.map((pro, idx) => (
                    <li key={idx}><FaCheck className="check-icon" /> {pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {algorithm.cons && algorithm.cons.length > 0 && (
              <div className="detail-section">
                <h4>Disadvantages</h4>
                <ul className="cons-list">
                  {algorithm.cons.map((con, idx) => (
                    <li key={idx}><FaTimes className="times-icon" /> {con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderDataStructureCard = (structure, category, index) => {
    const expanded = isExpanded(category, index);
    
    return (
      <div 
        key={`${category}-${index}`}
        className="algo-card"
        data-aos="fade-up"
        data-aos-delay={index * 50}
      >
        <div className="algo-card-header" onClick={() => toggleExpand(category, index)}>
          <div className="algo-title-section">
            <h3 className="algo-name">{structure.name}</h3>
            <button className="expand-btn" aria-label="Expand details">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
          
          <div className="complexity-badge">
            <span className="badge-label">Space:</span>
            <span className="badge-value">{structure.spaceComplexity}</span>
          </div>
        </div>

        <p className="algo-description">{structure.description}</p>

        {expanded && (
          <div className="algo-details">
            <div className="detail-section">
              <h4>Time Complexity</h4>
              <div className="complexity-breakdown">
                {Object.entries(structure.timeComplexity).map(([operation, complexity]) => (
                  <div key={operation} className="complexity-item">
                    <span className="complexity-label">{operation.charAt(0).toUpperCase() + operation.slice(1)}:</span>
                    <span 
                      className="complexity-value"
                      style={{ color: getComplexityColor(complexity) }}
                    >
                      {complexity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {structure.useCases && structure.useCases.length > 0 && (
              <div className="detail-section">
                <h4>Use Cases</h4>
                <ul className="use-cases-list">
                  {structure.useCases.map((useCase, idx) => (
                    <li key={idx}>{useCase}</li>
                  ))}
                </ul>
              </div>
            )}

            {structure.pros && structure.pros.length > 0 && (
              <div className="detail-section">
                <h4>Advantages</h4>
                <ul className="pros-list">
                  {structure.pros.map((pro, idx) => (
                    <li key={idx}><FaCheck className="check-icon" /> {pro}</li>
                  ))}
                </ul>
              </div>
            )}

            {structure.cons && structure.cons.length > 0 && (
              <div className="detail-section">
                <h4>Disadvantages</h4>
                <ul className="cons-list">
                  {structure.cons.map((con, idx) => (
                    <li key={idx}><FaTimes className="times-icon" /> {con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderAdvancedTechnique = (technique, index) => {
    const expanded = isExpanded('advanced', index);
    
    return (
      <div 
        key={`advanced-${index}`}
        className="algo-card advanced-card"
        data-aos="fade-up"
        data-aos-delay={index * 50}
      >
        <div className="algo-card-header" onClick={() => toggleExpand('advanced', index)}>
          <div className="algo-title-section">
            <h3 className="algo-name">{technique.name}</h3>
            <span className="category-tag">{technique.category}</span>
            <button className="expand-btn" aria-label="Expand details">
              {expanded ? <FaChevronUp /> : <FaChevronDown />}
            </button>
          </div>
        </div>

        <p className="algo-description">{technique.description}</p>

        {expanded && (
          <div className="algo-details">
            {technique.keyPoints && (
              <div className="detail-section">
                <h4>Key Points</h4>
                <ul className="key-points-list">
                  {technique.keyPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}

            {technique.examples && (
              <div className="detail-section">
                <h4>Examples</h4>
                <div className="examples-grid">
                  {technique.examples.map((example, idx) => (
                    <span key={idx} className="example-badge">{example}</span>
                  ))}
                </div>
              </div>
            )}

            {technique.whenToUse && (
              <div className="detail-section">
                <h4>When to Use</h4>
                <ul className="use-cases-list">
                  {technique.whenToUse.map((use, idx) => (
                    <li key={idx}>{use}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="cheatsheet-container">
      {/* Hero Section */}
      <div className="cheatsheet-hero" data-aos="fade-down">
        <h1 className="cheatsheet-title">
          <FaBook className="title-icon" />
          Algorithm & Data Structure Cheatsheet
        </h1>
        <p className="cheatsheet-subtitle">
          Your complete reference guide for algorithms, data structures, and complexities
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="cheatsheet-controls" data-aos="fade-up">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search algorithms, data structures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="cat-icon">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Reference Buttons */}
      <div className="quick-reference-section" data-aos="fade-up">
        <button 
          className={`reference-btn ${showBigO ? 'active' : ''}`}
          onClick={() => setShowBigO(!showBigO)}
        >
          <FaClock /> Big-O Complexity Chart
        </button>
        <button 
          className={`reference-btn ${showTips ? 'active' : ''}`}
          onClick={() => setShowTips(!showTips)}
        >
          <FaLightbulb /> Tips & Best Practices
        </button>
      </div>

      {/* Big-O Reference */}
      {showBigO && (
        <div className="bigo-reference" data-aos="fade-in">
          <h2>Big-O Complexity Reference</h2>
          <div className="bigo-grid">
            {bigOReference.complexities.map((complexity, idx) => (
              <div 
                key={idx} 
                className="bigo-card"
                style={{ borderLeftColor: complexity.color }}
              >
                <div className="bigo-notation" style={{ color: complexity.color }}>
                  {complexity.notation}
                </div>
                <div className="bigo-name">{complexity.name}</div>
                <p className="bigo-description">{complexity.description}</p>
                <div className="bigo-examples">
                  {complexity.examples.map((example, i) => (
                    <span key={i} className="bigo-example">{example}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips Section */}
      {showTips && (
        <div className="tips-section" data-aos="fade-in">
          <h2>Tips & Best Practices</h2>
          <div className="tips-grid">
            {algorithmTips.map((tipCategory, idx) => (
              <div key={idx} className="tip-card">
                <h3>{tipCategory.category}</h3>
                <ul>
                  {tipCategory.tips.map((tip, i) => (
                    <li key={i}><FaLightbulb className="tip-icon" /> {tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Content Sections */}
      <div className="cheatsheet-content">
        {/* Sorting Algorithms */}
        {(selectedCategory === 'all' || selectedCategory === 'sorting') && (
          <section className="content-section" data-aos="fade-up">
            <div className="section-header" style={{ borderLeftColor: cheatsheetData.sorting.color }}>
              <h2>
                <span className="section-icon">{cheatsheetData.sorting.icon}</span>
                {cheatsheetData.sorting.title}
              </h2>
            </div>
            <div className="cards-grid">
              {filterContent(cheatsheetData.sorting.algorithms, 'sorting').map((algo, idx) =>
                renderAlgorithmCard(algo, 'sorting', idx)
              )}
            </div>
          </section>
        )}

        {/* Searching Algorithms */}
        {(selectedCategory === 'all' || selectedCategory === 'searching') && (
          <section className="content-section" data-aos="fade-up">
            <div className="section-header" style={{ borderLeftColor: cheatsheetData.searching.color }}>
              <h2>
                <span className="section-icon">{cheatsheetData.searching.icon}</span>
                {cheatsheetData.searching.title}
              </h2>
            </div>
            <div className="cards-grid">
              {filterContent(cheatsheetData.searching.algorithms, 'searching').map((algo, idx) =>
                renderAlgorithmCard(algo, 'searching', idx)
              )}
            </div>
          </section>
        )}

        {/* Data Structures */}
        {(selectedCategory === 'all' || selectedCategory === 'dataStructures') && (
          <section className="content-section" data-aos="fade-up">
            <div className="section-header" style={{ borderLeftColor: cheatsheetData.dataStructures.color }}>
              <h2>
                <span className="section-icon">{cheatsheetData.dataStructures.icon}</span>
                {cheatsheetData.dataStructures.title}
              </h2>
            </div>
            <div className="cards-grid">
              {filterContent(cheatsheetData.dataStructures.structures, 'dataStructures').map((structure, idx) =>
                renderDataStructureCard(structure, 'dataStructures', idx)
              )}
            </div>
          </section>
        )}

        {/* Graph Algorithms */}
        {(selectedCategory === 'all' || selectedCategory === 'graph') && (
          <section className="content-section" data-aos="fade-up">
            <div className="section-header" style={{ borderLeftColor: cheatsheetData.graph.color }}>
              <h2>
                <span className="section-icon">{cheatsheetData.graph.icon}</span>
                {cheatsheetData.graph.title}
              </h2>
            </div>
            <div className="cards-grid">
              {filterContent(cheatsheetData.graph.algorithms, 'graph').map((algo, idx) =>
                renderAlgorithmCard(algo, 'graph', idx)
              )}
            </div>
          </section>
        )}

        {/* Advanced Techniques */}
        {(selectedCategory === 'all' || selectedCategory === 'advanced') && (
          <section className="content-section" data-aos="fade-up">
            <div className="section-header" style={{ borderLeftColor: cheatsheetData.advancedAlgorithms.color }}>
              <h2>
                <span className="section-icon">{cheatsheetData.advancedAlgorithms.icon}</span>
                {cheatsheetData.advancedAlgorithms.title}
              </h2>
            </div>
            <div className="cards-grid">
              {filterContent(cheatsheetData.advancedAlgorithms.techniques, 'advanced').map((technique, idx) =>
                renderAdvancedTechnique(technique, idx)
              )}
            </div>
          </section>
        )}
      </div>

      {/* No Results Message */}
      {searchTerm && (
        (() => {
          const sortingResults = filterContent(cheatsheetData.sorting.algorithms, 'sorting').length;
          const searchingResults = filterContent(cheatsheetData.searching.algorithms, 'searching').length;
          const dsResults = filterContent(cheatsheetData.dataStructures.structures, 'dataStructures').length;
          const graphResults = filterContent(cheatsheetData.graph.algorithms, 'graph').length;
          const advancedResults = filterContent(cheatsheetData.advancedAlgorithms.techniques, 'advanced').length;
          
          const totalResults = sortingResults + searchingResults + dsResults + graphResults + advancedResults;
          
          return totalResults === 0 ? (
            <div className="no-results" data-aos="fade-in">
              <p>No results found for "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Clear Search
              </button>
            </div>
          ) : null;
        })()
      )}
    </div>
  );
};

export default Cheatsheet;
