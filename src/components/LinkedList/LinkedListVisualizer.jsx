import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Plus, Search, Trash2, Download, Camera, StepForward, StepBack } from 'lucide-react';
import LinkedListNode from './LinkedListNode';
import { LinkedListNode as ListNode, linkedListOperations } from '../../algorithms/linkedListAlgorithms';
import { linkedListAlgorithms } from '../../data/allCodes';
import '../../styles/LinkedList.css';

/**
 * 🎯 Linked List Visualizer Component
 * 
 * A comprehensive visualization tool for linked list data structure operations
 * including insertion, deletion, search, traversal, and reversal with animated steps.
 * 
 * @component
 * @returns {JSX.Element} Linked list visualization component
 */
const LinkedListVisualizer = () => {
  // 🎮 State Management
  const [linkedList, setLinkedList] = useState({ head: null, size: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentOperation, setCurrentOperation] = useState('none');
  const [highlightedNodeId, setHighlightedNodeId] = useState(null);
  const [targetNodeId, setTargetNodeId] = useState(null);
  const [visitedNodeIds, setVisitedNodeIds] = useState(new Set());
  const [inputValue, setInputValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [position, setPosition] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(800);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [stats, setStats] = useState({ operations: 0, comparisons: 0 });
  const [selectedLanguage, setSelectedLanguage] = useState("java");
  const [selectedOperation, setSelectedOperation] = useState("insertAtBeginning");
  
  // 🎯 Refs for DOM and animation control
  const visualizationRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const shouldContinueAnimation = useRef(true);

  /**
   * 🏁 Initialize linked list with sample data
   */
  useEffect(() => {
    const initialList = { head: null, size: 0 };
    linkedListOperations.insertAtEnd(initialList, 10);
    linkedListOperations.insertAtEnd(initialList, 20);
    linkedListOperations.insertAtEnd(initialList, 30);
    setLinkedList(initialList);
  }, []);

  /**
   * 🧹 Cleanup animation on component unmount
   */
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  /**
   * 🔄 Convert linked list to array for rendering
   * @returns {Array} Array of linked list nodes
   */
  const getVisualizationArray = () => {
    const nodes = [];
    let currentNode = linkedList.head;
    
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }
    return nodes;
  };

  /**
   * 🎬 Generate animation steps for different operations
   * @param {string} operation - Operation type (search, traverse, insertEnd, etc.)
   * @param {number} targetValue - Target value for search/insert operations
   * @param {number} targetPosition - Target position for position-based operations
   * @returns {Array} Array of animation step objects
   */
  const generateAnimationSteps = (operation, targetValue, targetPosition) => {
    const steps = [];
    let currentNode = linkedList.head;
    let currentIndex = 0;

    switch (operation) {
      case 'search':
        steps.push({
          type: 'start',
          description: `🔍 Starting search for value ${targetValue}...`
        });
        
        while (currentNode) {
          steps.push({
            type: 'highlight',
            nodeId: currentNode.id,
            description: `Checking node at position ${currentIndex}: ${currentNode.data}`,
            comparing: true
          });
          
          if (currentNode.data === targetValue) {
            steps.push({
              type: 'found',
              nodeId: currentNode.id,
              description: `🎉 Found ${targetValue} at position ${currentIndex}!`,
              success: true
            });
            break;
          } else {
            steps.push({
              type: 'continue',
              nodeId: currentNode.id,
              description: `${currentNode.data} ≠ ${targetValue}, moving to next node...`,
              visited: true
            });
          }
          
          currentNode = currentNode.next;
          currentIndex++;
        }
        
        if (!steps.some(step => step.type === 'found')) {
          steps.push({
            type: 'notfound',
            description: `❌ Value ${targetValue} not found in the list`,
            failure: true
          });
        }
        break;

      case 'traverse':
        steps.push({
          type: 'start',
          description: '🚀 Starting complete traversal of the linked list...'
        });
        
        while (currentNode) {
          steps.push({
            type: 'highlight',
            nodeId: currentNode.id,
            description: `Visiting node ${currentIndex}: ${currentNode.data}`,
            visiting: true
          });
          
          steps.push({
            type: 'visit',
            nodeId: currentNode.id,
            description: `✅ Processed node ${currentIndex} with value ${currentNode.data}`,
            visited: true
          });
          
          currentNode = currentNode.next;
          currentIndex++;
        }
        
        steps.push({
          type: 'complete',
          description: `🏁 Traversal complete! Visited ${currentIndex} nodes.`,
          success: true
        });
        break;

      case 'insertEnd':
        steps.push({
          type: 'start',
          description: `➕ Inserting ${targetValue} at the end of the list...`
        });
        
        if (!linkedList.head) {
          steps.push({
            type: 'insert',
            description: `📝 List is empty, ${targetValue} will be the first node.`,
            success: true
          });
        } else {
          let stepCount = 0;
          while (currentNode && currentNode.next) {
            steps.push({
              type: 'highlight',
              nodeId: currentNode.id,
              description: `➡️ Traversing... Current node: ${currentNode.data}`,
              traversing: true
            });
            currentNode = currentNode.next;
            stepCount++;
          }
          
          if (currentNode) {
            steps.push({
              type: 'highlight',
              nodeId: currentNode.id,
              description: `🎯 Found last node: ${currentNode.data}`,
              target: true
            });
            
            steps.push({
              type: 'insert',
              nodeId: currentNode.id,
              description: `🔗 Linking new node (${targetValue}) after ${currentNode.data}`,
              success: true
            });
          }
        }
        break;

      case 'insertBeginning':
        steps.push({
          type: 'start',
          description: `➕ Inserting ${targetValue} at the beginning of the list...`
        });
        
        if (linkedList.head) {
          steps.push({
            type: 'highlight',
            nodeId: linkedList.head.id,
            description: `🎯 Current head: ${linkedList.head.data}`,
            target: true
          });
        }
        
        steps.push({
          type: 'insert',
          description: `🆕 New node (${targetValue}) will become the new head`,
          success: true
        });
        break;

      case 'reverse':
        steps.push({
          type: 'start',
          description: '🔄 Starting to reverse the linked list...'
        });
        
        let nodeCount = 0;
        currentNode = linkedList.head;
        while (currentNode) {
          steps.push({
            type: 'highlight',
            nodeId: currentNode.id,
            description: `🔄 Reversing pointers for node: ${currentNode.data}`,
            reversing: true
          });
          currentNode = currentNode.next;
          nodeCount++;
        }
        
        steps.push({
          type: 'complete',
          description: `✅ Reversed ${nodeCount} nodes successfully!`,
          success: true
        });
        break;

      default:
        steps.push({
          type: 'info',
          description: `⚡ Performing ${operation}...`
        });
    }

    return steps;
  };

  /**
   * 🎬 Execute animation steps with pause/resume support
   */
  const executeAnimationSteps = async () => {
    if (animationSteps.length === 0) return;

    setIsAnimating(true);
    setIsPaused(false);
    shouldContinueAnimation.current = true;
    setVisitedNodeIds(new Set());
    
    for (let stepIndex = 0; stepIndex < animationSteps.length; stepIndex++) {
      // 🛑 Check if animation should continue
      if (!shouldContinueAnimation.current) break;
      
      // ⏸️ Handle pause state
      while (isPaused && shouldContinueAnimation.current) {
        await new Promise(resolve => {
          animationTimeoutRef.current = setTimeout(resolve, 100);
        });
      }
      
      if (!shouldContinueAnimation.current) break;
      
      const currentStep = animationSteps[stepIndex];
      setCurrentStepIndex(stepIndex);

      // 🎨 Reset previous states
      setHighlightedNodeId(null);
      setTargetNodeId(null);

      // 🎯 Apply step-specific visual effects
      if (currentStep.nodeId) {
        if (currentStep.comparing || currentStep.visiting || currentStep.traversing || currentStep.reversing) {
          setHighlightedNodeId(currentStep.nodeId);
        }
        
        if (currentStep.target) {
          setTargetNodeId(currentStep.nodeId);
        }
        
        if (currentStep.visited) {
          setVisitedNodeIds(previousVisited => new Set([...previousVisited, currentStep.nodeId]));
        }
      }

      // ⏰ Wait for animation duration
      await new Promise(resolve => {
        animationTimeoutRef.current = setTimeout(resolve, animationSpeed);
      });
    }

    // 🏁 Animation complete cleanup
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setCurrentStepIndex(0);
    
    // ✨ Keep visited nodes highlighted briefly
    setTimeout(() => {
      setVisitedNodeIds(new Set());
      setAnimationSteps([]);
    }, 1000);
  };

  // 🎮 Control Handlers
  /**
   * ▶️ Play/Pause animation handler
   */
  const handlePlay = () => {
    if (isPaused) {
      setIsPaused(false);
      return;
    }
    
    if (animationSteps.length > 0) {
      executeAnimationSteps();
    } else {
      // 🔄 Generate default traverse animation
      const steps = generateAnimationSteps('traverse');
      setAnimationSteps(steps);
      setTimeout(() => executeAnimationSteps(), 100);
    }
  };

  /**
   * ⏸️ Pause animation handler
   */
  const handlePause = () => {
    setIsPaused(true);
  };

  /**
   * ⏹️ Stop animation handler
   */
  const handleStop = () => {
    shouldContinueAnimation.current = false;
    setIsAnimating(false);
    setIsPaused(false);
    setHighlightedNodeId(null);
    setTargetNodeId(null);
    setVisitedNodeIds(new Set());
    setAnimationSteps([]);
    setCurrentStepIndex(0);
    
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
    }
  };

  /**
   * ⏭️ Step forward handler
   */
  const handleStepForward = () => {
    if (!isAnimating && animationSteps.length > 0 && currentStepIndex < animationSteps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      const nextStep = animationSteps[nextIndex];
      setCurrentStepIndex(nextIndex);
      
      if (nextStep.nodeId) {
        setHighlightedNodeId(nextStep.nodeId);
      }
    }
  };

  /**
   * ⏮️ Step backward handler
   */
  const handleStepBack = () => {
    if (!isAnimating && currentStepIndex > 0) {
      const previousIndex = currentStepIndex - 1;
      const previousStep = animationSteps[previousIndex];
      setCurrentStepIndex(previousIndex);
      
      if (previousStep.nodeId) {
        setHighlightedNodeId(previousStep.nodeId);
      }
    }
  };

  // 🛠️ Operation Handlers with Enhanced Animation
  /**
   * ➕ Insert at beginning handler
   */
  const handleInsertAtBeginning = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertBeginning', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtBeginning(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertBeginning');
    setStats(previousStats => ({ ...previousStats, operations: previousStats.operations + 1 }));
    
    // 🎬 Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  /**
   * ➕ Insert at end handler
   */
  const handleInsertAtEnd = async () => {
    if (!inputValue || isAnimating) return;
    
    const steps = generateAnimationSteps('insertEnd', parseInt(inputValue));
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.insertAtEnd(newList, parseInt(inputValue));
    setLinkedList(newList);
    setInputValue('');
    setCurrentOperation('insertEnd');
    setStats(previousStats => ({ ...previousStats, operations: previousStats.operations + 1 }));
    
    // 🎬 Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  /**
   * 🔍 Search handler
   */
  const handleSearch = async () => {
    if (!searchValue || isAnimating) return;
    
    const steps = generateAnimationSteps('search', parseInt(searchValue));
    setAnimationSteps(steps);
    setCurrentOperation('search');
    setSearchValue('');
    setStats(previousStats => ({ 
      ...previousStats, 
      comparisons: previousStats.comparisons + steps.filter(step => step.comparing).length 
    }));
    
    // 🎬 Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  /**
   * 🚀 Traverse handler
   */
  const handleTraverse = () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('traverse');
    setAnimationSteps(steps);
    setCurrentOperation('traverse');
    
    // 🎬 Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  /**
   * 🔄 Reverse handler
   */
  const handleReverse = async () => {
    if (isAnimating) return;
    
    const steps = generateAnimationSteps('reverse');
    setAnimationSteps(steps);
    
    const newList = { ...linkedList };
    linkedListOperations.reverse(newList);
    setLinkedList(newList);
    setCurrentOperation('reverse');
    setStats(previousStats => ({ ...previousStats, operations: previousStats.operations + 1 }));
    
    // 🎬 Auto-play animation
    setTimeout(() => executeAnimationSteps(), 100);
  };

  /**
   * 🧹 Reset handler
   */
  const handleReset = () => {
    handleStop();
    setLinkedList({ head: null, size: 0 });
    setCurrentOperation('none');
    setStats({ operations: 0, comparisons: 0 });
  };

  // 🎯 Helper Functions for Documentation
  /**
   * 📖 Get operation explanation
   * @param {string} operation - Operation name
   * @returns {string} Operation explanation
   */
  function getOperationExplanation(operation) {
    const explanations = {
      insertAtBeginning: 'The new node is created and its next pointer is set to the current head. Then the head pointer is updated to this new node.',
      insertAtEnd: 'Traverse the list until the last node, then set its next pointer to the new node. If the list is empty, the new node becomes the head.',
      insertAtPosition: 'Traverse to the desired position, link the new node with the next node, and update the previous node to point to the new node.',
      deleteNode: 'Find the first node with the target value, update the previous node to skip it, and free memory.',
      deleteAtPosition: 'Traverse to the position, update the previous node to skip the target node, and remove it.',
      traverse: 'Start from head and visit each node sequentially until the end of the list.',
      reverse: 'Iteratively change the next pointers of each node to point to the previous node, then update head to the last node.',
      search: 'Start from head and compare each node\'s value with the target value until found or end is reached.',
      getSize: 'Count all nodes starting from head until null is reached.',
      clear: 'Set head to null, effectively removing all nodes.'
    };
    return explanations[operation] || 'Explanation not available.';
  }

  /**
   * 📊 Get operation complexity
   * @param {string} operation - Operation name
   * @returns {Object} Time and space complexity
   */
  function getOperationComplexity(operation) {
    const complexities = {
      insertAtBeginning: { time: 'O(1)', space: 'O(1)' },
      insertAtEnd: { time: 'O(n)', space: 'O(1)' },
      insertAtPosition: { time: 'O(n)', space: 'O(1)' },
      deleteNode: { time: 'O(n)', space: 'O(1)' },
      deleteAtPosition: { time: 'O(n)', space: 'O(1)' },
      traverse: { time: 'O(n)', space: 'O(1)' },
      reverse: { time: 'O(n)', space: 'O(1)' },
      search: { time: 'O(n)', space: 'O(1)' },
      getSize: { time: 'O(1) or O(n)', space: 'O(1)' },
      clear: { time: 'O(1) or O(n)', space: 'O(1)' }
    };
    return complexities[operation] || { time: 'N/A', space: 'N/A' };
  }

  /**
   * 📝 Get operation description
   * @param {string} operation - Operation name
   * @returns {string} Operation description
   */
  function getOperationDescription(operation) {
    const descriptions = {
      insertAtBeginning: 'Adds a new node at the start of the list, updating the head pointer.',
      insertAtEnd: 'Traverses to the end of the list and adds a new node there.',
      insertAtPosition: 'Inserts a new node at a specific position in the list.',
      deleteNode: 'Finds and removes the first occurrence of a value from the list.',
      deleteAtPosition: 'Removes the node at a specific position in the list.',
      traverse: 'Visits every node in the list from head to tail.',
      reverse: 'Reverses the direction of all pointers in the list.',
      search: 'Looks for a specific value in the list and returns its position.',
      getSize: 'Returns the number of nodes in the list.',
      clear: 'Removes all nodes from the list and resets it to empty state.'
    };
    return descriptions[operation] || 'Operation description not available.';
  }

  const nodes = getVisualizationArray();

  return (
    <div className="algorithm-container">
      {/* 🏷️ Header Section */}
      <div className="algorithm-header">
        <div className="header-content">
          <h1>Linked List Visualization</h1>
          <p className="algorithm-description">
            Interactive visualization of linked list operations including insertion, search, and traversal.
          </p>
        </div>
        
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">{linkedList.size}</span>
            <span className="stat-label">Nodes</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.operations}</span>
            <span className="stat-label">Operations</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.comparisons}</span>
            <span className="stat-label">Comparisons</span>
          </div>
        </div>
      </div>

      {/* 🎮 Control Panel */}
      <div className="control-panel">
        <div className="control-section">
          <h3>Insert Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Enter value"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                disabled={isAnimating}
                className="control-input"
                aria-label="Value to insert"
              />
            </div>
            <button onClick={handleInsertAtBeginning} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert Beginning
            </button>
            <button onClick={handleInsertAtEnd} disabled={isAnimating} className="control-btn primary">
              <Plus size={16} />
              Insert End
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Search & Operations</h3>
          <div className="control-group">
            <div className="input-wrapper">
              <input
                type="number"
                placeholder="Search value"
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                disabled={isAnimating}
                className="control-input"
                aria-label="Value to search"
              />
            </div>
            <button onClick={handleSearch} disabled={isAnimating} className="control-btn secondary">
              <Search size={16} />
              Search
            </button>
            <button onClick={handleTraverse} disabled={isAnimating} className="control-btn accent">
              Traverse
            </button>
            <button onClick={handleReverse} disabled={isAnimating} className="control-btn warning">
              <RotateCcw size={16} />
              Reverse
            </button>
          </div>
        </div>

        <div className="control-section">
          <h3>Animation Controls</h3>
          <div className="control-group">
            <button 
              onClick={isPaused ? handlePlay : isAnimating ? handlePause : handlePlay} 
              className={`control-btn ${isAnimating && !isPaused ? 'warning' : 'play'}`}
              aria-label={isAnimating && !isPaused ? 'Pause animation' : isPaused ? 'Resume animation' : 'Play animation'}
            >
              {isAnimating && !isPaused ? <Pause size={16} /> : <Play size={16} />}
              {isAnimating && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play'}
            </button>
            <button onClick={handleStop} className="control-btn danger" aria-label="Stop animation">
              Stop
            </button>
            <button onClick={handleStepBack} disabled={isAnimating || currentStepIndex === 0} className="control-btn secondary" aria-label="Previous step">
              <StepBack size={16} />
            </button>
            <button onClick={handleStepForward} disabled={isAnimating || currentStepIndex >= animationSteps.length - 1} className="control-btn secondary" aria-label="Next step">
              <StepForward size={16} />
            </button>
          </div>
          
          <div className="speed-control">
            <label htmlFor="speed-slider">Animation Speed:</label>
            <input
              id="speed-slider"
              type="range"
              min="200"
              max="2000"
              value={animationSpeed}
              onChange={(event) => setAnimationSpeed(parseInt(event.target.value))}
              className="speed-slider"
              aria-label="Adjust animation speed"
            />
            <span>{animationSpeed}ms</span>
          </div>
        </div>

        <div className="control-section">
          <h3>Utilities</h3>
          <div className="control-group">
            <button onClick={handleReset} className="control-btn danger" aria-label="Reset linked list">
              <Trash2 size={16} />
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* 🎨 Visualization Area */}
      <div className="visualization-container" ref={visualizationRef}>
        <div className="visualization-header">
          <h3>Current List Structure</h3>
          <div className="operation-status">
            {isAnimating && (
              <div className={`status-indicator ${isPaused ? 'paused' : 'animating'}`}>
                <div className="pulse-dot"></div>
                {isPaused ? 'Paused' : 'Animating...'}
              </div>
            )}
            {animationSteps.length > 0 && (
              <div className="step-info">
                Step {currentStepIndex + 1} of {animationSteps.length}
              </div>
            )}
          </div>
        </div>

        <div className="linked-list-display">
          <AnimatePresence>
            {nodes.length === 0 ? (
              <motion.div 
                className="empty-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                aria-label="Empty linked list"
              >
                <div className="empty-icon">🔗</div>
                <h4>Empty Linked List</h4>
                <p>Add some nodes to get started!</p>
              </motion.div>
            ) : (
              <div className="nodes-container">
                {nodes.map((node, index) => (
                  <LinkedListNode
                    key={node.id}
                    node={node}
                    position={index}
                    isHighlighted={highlightedNodeId === node.id}
                    isTarget={targetNodeId === node.id}
                    isVisited={visitedNodeIds.has(node.id)}
                    isAnimating={isAnimating}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* ℹ️ Operation Info */}
        {animationSteps.length > 0 && currentStepIndex < animationSteps.length && (
          <div className="operation-info">
            <div className="step-description">
              {animationSteps[currentStepIndex]?.description}
            </div>
            <div className="step-progress">
              <div 
                className="progress-bar"
                style={{ width: `${((currentStepIndex + 1) / animationSteps.length) * 100}%` }}
                aria-label={`Progress: ${currentStepIndex + 1} of ${animationSteps.length} steps`}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* 💻 Code Implementation Section */}
      <div className="theme-card" style={{ marginTop: '2rem' }}>
        <div className="theme-card-header">
          <h3>Linked List Operations - Code Implementation</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                className={`btn ${selectedLanguage === 'java' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('java')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                aria-label="Switch to Java code"
              >
                Java
              </button>
              <button
                className={`btn ${selectedLanguage === 'python' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('python')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                aria-label="Switch to Python code"
              >
                Python
              </button>
              <button
                className={`btn ${selectedLanguage === 'cpp' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('cpp')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                aria-label="Switch to C++ code"
              >
                C++
              </button>
              <button
                className={`btn ${selectedLanguage === 'go' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setSelectedLanguage('go')}
                style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                aria-label="Switch to Go code"
              >
                Go
              </button>
            </div>
            <select
              value={selectedOperation}
              onChange={(event) => setSelectedOperation(event.target.value)}
              style={{
                padding: '0.5rem',
                borderRadius: '4px',
                border: '1px solid var(--accent-primary)',
                backgroundColor: 'var(--surface-bg)',
                color: 'var(--text-primary)'
              }}
              aria-label="Select linked list operation"
            >
              <option value="insertAtBeginning">Insert at Beginning</option>
              <option value="insertAtEnd">Insert at End</option>
              <option value="insertAtPosition">Insert at Position</option>
              <option value="deleteNode">Delete Node</option>
              <option value="deleteAtPosition">Delete at Position</option>
              <option value="traverse">Traverse</option>
              <option value="reverse">Reverse</option>
              <option value="search">Search</option>
              <option value="getSize">Get Size</option>
              <option value="clear">Clear List</option>
            </select>
          </div>
        </div>
        
        <div style={{
          background: 'var(--surface-bg)',
          borderRadius: '8px',
          padding: '1.5rem',
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
              {linkedListAlgorithms[selectedOperation] && linkedListAlgorithms[selectedOperation][selectedLanguage] 
                ? linkedListAlgorithms[selectedOperation][selectedLanguage]
                : `// ${selectedOperation} implementation in ${selectedLanguage.toUpperCase()} coming soon!`
              }
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
          <strong>💡 Note:</strong> This is the actual implementation code for {selectedOperation} in {selectedLanguage.toUpperCase()}. 
          You can copy and use this code in your projects.
        </div>

        {/* 📊 Operation Details */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            {selectedOperation.charAt(0).toUpperCase() + selectedOperation.slice(1)} Details
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            marginTop: '1rem'
          }}>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>⏱️ Time Complexity:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationComplexity(selectedOperation).time}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>💾 Space Complexity:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationComplexity(selectedOperation).space}
              </div>
            </div>
            <div style={{
              padding: '1rem',
              background: 'var(--theme-bg)',
              borderRadius: '6px',
              border: '1px solid var(--accent-primary)'
            }}>
              <strong style={{ color: 'var(--accent-primary)' }}>📝 Description:</strong>
              <div style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                {getOperationDescription(selectedOperation)}
              </div>
            </div>
          </div>
        </div>

        {/* 📖 Explanation Section */}
        <div style={{ marginTop: '1.5rem' }}>
          <h4 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>
            📖 Algorithm Explanation
          </h4>
          <div style={{
            padding: '1rem',
            background: 'var(--theme-bg)',
            borderRadius: '6px',
            border: '1px solid var(--accent-primary)',
            color: 'var(--text-secondary)',
            lineHeight: '1.6'
          }}>
            {getOperationExplanation(selectedOperation)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualizer;
