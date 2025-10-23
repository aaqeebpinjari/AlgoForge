import { OPERATION_TYPES, STEP_TYPES, ERROR_MESSAGES } from './constants.js';
import { Node } from './BinaryTree.js';

/**
 * Validates visualization parameters
 * @private
 */
function validateParams(params) {
  if (!params || typeof params.data === 'undefined') {
    throw new Error('Invalid parameters: data is required');
  }
  
  const dataValue = parseInt(params.data, 10);
  if (isNaN(dataValue)) {
    throw new Error(ERROR_MESSAGES.INVALID_DATA);
  }
  
  return dataValue;
}

/**
 * Creates a step object with consistent structure
 * @private
 */
function createStep({ type, node, value, pseudoLine = 0, description, operation }) {
  return { type, node, value, pseudoLine, description, operation };
}

/**
 * Handles visualization step generation for Binary Search Tree operations
 */
export class TreeVisualizer {
  /**
   * Generates visualization steps for insert operation
   * @param {BinaryTree} tree - The tree instance
   * @param {number} data - Value to insert
   * @returns {Array} Array of visualization steps
   */
  static buildInsertSteps(tree, data) {
    const steps = [];
    let currentNode = tree.root;
    
    if (!currentNode) {
      steps.push(createStep({
        type: STEP_TYPES.INSERT,
        node: new Node(data),
        pseudoLine: 0,
        description: `Creating new node ${data} as root element.`,
        operation: OPERATION_TYPES.INSERT
      }));
      return steps;
    }
    
    steps.push(createStep({
      type: STEP_TYPES.TRAVERSE,
      node: currentNode,
      pseudoLine: 0,
      description: `Beginning insertion from root node ${currentNode.data}.`,
      operation: OPERATION_TYPES.INSERT
    }));
    
    while (currentNode) {
      const goLeft = data < currentNode.data;
      const childNode = goLeft ? currentNode.left : currentNode.right;
      const pseudoLine = goLeft ? 2 : 4;
      
      if (!childNode) {
        steps.push(createStep({
          type: STEP_TYPES.INSERT,
          node: currentNode,
          value: data,
          pseudoLine,
          description: `Placing ${data} as ${goLeft ? 'left' : 'right'} child of ${currentNode.data}.`,
          operation: OPERATION_TYPES.INSERT
        }));
        break;
      }
      
      steps.push(createStep({
        type: STEP_TYPES.TRAVERSE,
        node: childNode,
        pseudoLine,
        description: `Navigating to ${goLeft ? 'left' : 'right'} child ${childNode.data} (${data} ${goLeft ? '<' : '>='} ${currentNode.data}).`,
        operation: OPERATION_TYPES.INSERT
      }));
      
      currentNode = childNode;
    }
    
    return steps;
  }

  /**
   * Generates visualization steps for search operation
   * @param {BinaryTree} tree - The tree instance
   * @param {number} data - Value to search for
   * @returns {Array} Array of visualization steps
   */
  static buildSearchSteps(tree, data) {
    const steps = [];
    let currentNode = tree.root;
    
    if (!currentNode) {
      steps.push(createStep({
        type: STEP_TYPES.NOT_FOUND,
        node: null,
        pseudoLine: 1,
        description: `Empty tree structure - value ${data} not present.`,
        operation: OPERATION_TYPES.SEARCH
      }));
      return steps;
    }
    
    steps.push(createStep({
      type: STEP_TYPES.TRAVERSE,
      node: currentNode,
      pseudoLine: 0,
      description: `Initiating search for ${data} from root ${currentNode.data}.`,
      operation: OPERATION_TYPES.SEARCH
    }));
    
    while (currentNode) {
      if (currentNode.data === data) {
        steps.push(createStep({
          type: STEP_TYPES.FOUND,
          node: currentNode,
          pseudoLine: 1,
          description: `Target value ${data} located successfully.`,
          operation: OPERATION_TYPES.SEARCH
        }));
        return steps;
      }
      
      steps.push(createStep({
        type: STEP_TYPES.COMPARE,
        node: currentNode,
        pseudoLine: 2,
        description: `Comparing target ${data} with current ${currentNode.data}.`,
        operation: OPERATION_TYPES.SEARCH
      }));
      
      const goLeft = data < currentNode.data;
      const childNode = goLeft ? currentNode.left : currentNode.right;
      const pseudoLine = goLeft ? 3 : 5;
      
      if (!childNode) {
        steps.push(createStep({
          type: STEP_TYPES.NOT_FOUND,
          node: currentNode,
          pseudoLine,
          description: `${goLeft ? 'Left' : 'Right'} subtree empty - value ${data} not found.`,
          operation: OPERATION_TYPES.SEARCH
        }));
        return steps;
      }
      
      steps.push(createStep({
        type: STEP_TYPES.TRAVERSE,
        node: childNode,
        pseudoLine,
        description: `Moving to ${goLeft ? 'left' : 'right'} child ${childNode.data}.`,
        operation: OPERATION_TYPES.SEARCH
      }));
      
      currentNode = childNode;
    }
    
    steps.push(createStep({
      type: STEP_TYPES.NOT_FOUND,
      node: null,
      pseudoLine: 5,
      description: `Value ${data} not present in tree structure.`,
      operation: OPERATION_TYPES.SEARCH
    }));
    
    return steps;
  }

  /**
   * Generates visualization steps for delete operation
   * @param {BinaryTree} tree - The tree instance
   * @param {number} data - Value to delete
   * @returns {Array} Array of visualization steps
   */
  static buildDeleteSteps(tree, data) {
    const steps = [];
    
    if (!tree.root) {
      steps.push(createStep({
        type: STEP_TYPES.NOT_FOUND,
        node: null,
        pseudoLine: 0,
        description: `Empty tree - deletion of ${data} not possible.`,
        operation: OPERATION_TYPES.DELETE
      }));
      return steps;
    }
    
    let targetNode = tree.root;
    let parentNode = null;
    
    steps.push(createStep({
      type: STEP_TYPES.TRAVERSE,
      node: targetNode,
      pseudoLine: 0,
      description: `Starting deletion process for ${data} from root ${targetNode.data}.`,
      operation: OPERATION_TYPES.DELETE
    }));
    
    while (targetNode && targetNode.data !== data) {
      steps.push(createStep({
        type: STEP_TYPES.COMPARE,
        node: targetNode,
        pseudoLine: 0,
        description: `Comparing deletion target ${data} with ${targetNode.data}.`,
        operation: OPERATION_TYPES.DELETE
      }));
      
      parentNode = targetNode;
      targetNode = data < targetNode.data ? targetNode.left : targetNode.right;
      
      if (targetNode) {
        steps.push(createStep({
          type: STEP_TYPES.TRAVERSE,
          node: targetNode,
          pseudoLine: 0,
          description: `Progressing to ${targetNode.data}.`,
          operation: OPERATION_TYPES.DELETE
        }));
      }
    }
    
    if (!targetNode) {
      steps.push(createStep({
        type: STEP_TYPES.NOT_FOUND,
        node: parentNode,
        pseudoLine: 0,
        description: `Target value ${data} not found for deletion.`,
        operation: OPERATION_TYPES.DELETE
      }));
      return steps;
    }
    
    // Determine deletion case type
    const hasLeft = !!targetNode.left;
    const hasRight = !!targetNode.right;
    
    let deletionType;
    let caseDescription;
    
    if (!hasLeft && !hasRight) {
      deletionType = STEP_TYPES.DELETE_LEAF;
      caseDescription = 'leaf node';
    } else if (!hasLeft || !hasRight) {
      deletionType = STEP_TYPES.DELETE_ONE_CHILD;
      caseDescription = 'single child';
    } else {
      deletionType = STEP_TYPES.DELETE_TWO_CHILDREN;
      caseDescription = 'two children';
    }
    
    steps.push(createStep({
      type: deletionType,
      node: targetNode,
      pseudoLine: 0,
      description: `Executing deletion of ${data} (${caseDescription} scenario).`,
      operation: OPERATION_TYPES.DELETE
    }));
    
    return steps;
  }

  /**
   * Generates visualization steps for traversal operations
   * @param {BinaryTree} tree - The tree instance
   * @param {string} order - Traversal order ('inorder', 'preorder', 'postorder')
   * @returns {Array} Array of visualization steps
   */
  static buildTraversalSteps(tree, order) {
    const steps = [];
    const sequence = [];
    
    const collectNodes = (node) => {
      if (!node) return;
      
      if (order === OPERATION_TYPES.PREORDER) sequence.push(node);
      collectNodes(node.left);
      if (order === OPERATION_TYPES.INORDER) sequence.push(node);
      collectNodes(node.right);
      if (order === OPERATION_TYPES.POSTORDER) sequence.push(node);
    };
    
    collectNodes(tree.root);
    
    if (sequence.length === 0) {
      steps.push(createStep({
        type: STEP_TYPES.NOT_FOUND,
        node: null,
        description: 'Tree structure is empty.',
        operation: order
      }));
      return steps;
    }
    
    sequence.forEach((node, index) => {
      steps.push(createStep({
        type: STEP_TYPES.VISIT,
        node,
        pseudoLine: index === 0 ? 1 : 2,
        description: `Visiting node ${node.data} (${order} traversal)`,
        operation: order
      }));
    });
    
    return steps;
  }

  /**
   * Main entry point for generating visualization steps
   * @param {string} operation - Operation type from OPERATION_TYPES
   * @param {BinaryTree} tree - The tree instance
   * @param {Object} params - Parameters for the operation
   * @param {string|number} params.data - The data value for the operation
   * @returns {Array} Array of visualization steps
   */
  static getSteps(operation, tree, params) {
    if (!tree) {
      throw new Error('Tree instance is required');
    }
    
    const validOperations = Object.values(OPERATION_TYPES);
    if (!validOperations.includes(operation)) {
      return [createStep({
        type: STEP_TYPES.INITIAL,
        node: null,
        pseudoLine: 0,
        description: 'Initial tree state loaded.'
      })];
    }
    
    // Traversal operations don't need data validation
    if ([OPERATION_TYPES.INORDER, OPERATION_TYPES.PREORDER, OPERATION_TYPES.POSTORDER].includes(operation)) {
      return this.buildTraversalSteps(tree, operation);
    }
    
    // Operations that require data value
    const dataValue = validateParams(params);
    
    switch (operation) {
      case OPERATION_TYPES.INSERT:
        return this.buildInsertSteps(tree, dataValue);
      case OPERATION_TYPES.SEARCH:
        return this.buildSearchSteps(tree, dataValue);
      case OPERATION_TYPES.DELETE:
        return this.buildDeleteSteps(tree, dataValue);
      default:
        return [createStep({
          type: STEP_TYPES.INITIAL,
          node: null,
          pseudoLine: 0,
          description: 'Initial tree state loaded.'
        })];
    }
  }
}

// Export for backward compatibility
export const getTreeSteps = (operation, treeInstance, params) => {
  return TreeVisualizer.getSteps(operation, treeInstance, params);
};
