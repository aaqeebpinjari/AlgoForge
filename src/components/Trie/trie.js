/**
 * Trie (Prefix Tree) implementation with animation steps
 *
 * A Trie is a tree-like data structure used to store a dynamic set of strings.
 * It is particularly efficient for operations involving prefixes, such as searching
 * for words with a given prefix or autocomplete functionalities.
 *
 * Core Components:
 * - TrieNode: Contains a Map of child nodes and an isEndOfWord flag
 * - Root Node: Starting point for all operations (doesn't represent a character)
 *
 * Key Operations:
 * - insert(word): Builds the trie structure for the word
 * - search(word): Checks if the exact word exists
 * - searchPrefix(prefix): Finds all words starting with the prefix
 * - delete(word): Removes a word and cleans up unused nodes
 *
 * Each node represents a character in the alphabet.
 */

export class TrieNode {
  constructor(char = '') {
    this.char = char;
    this.children = new Map(); // char -> TrieNode
    this.isEndOfWord = false;
    this.id = null; // for visualization
  }
}

export class Trie {
  constructor() {
    this.root = new TrieNode();
    this.nodeIdCounter = 1;
  }

  // Generate unique ID for nodes
  generateId() {
    return this.nodeIdCounter++;
  }

  // Clone the entire trie for snapshots
  cloneTrie(node = this.root, visited = new Map()) {
    if (visited.has(node)) return visited.get(node);

    const clone = new TrieNode(node.char);
    clone.isEndOfWord = node.isEndOfWord;
    clone.id = node.id;
    visited.set(node, clone);

    for (const [char, child] of node.children) {
      clone.children.set(char, this.cloneTrie(child, visited));
    }

    return clone;
  }

  // Insert word with animation steps
  insert(word) {
    const steps = [];
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      steps.push({ type: "focus", nodeId: current.id });

      if (!current.children.has(char)) {
        const newNode = new TrieNode(char);
        newNode.id = this.generateId();
        current.children.set(char, newNode);
        steps.push({ type: "apply", snapshot: this.cloneTrie() });
      }

      current = current.children.get(char);
    }

    steps.push({ type: "focus", nodeId: current.id });
    if (!current.isEndOfWord) {
      current.isEndOfWord = true;
      steps.push({ type: "apply", snapshot: this.cloneTrie() });
    }

    return { success: true, steps };
  }

  // Search for exact word
  search(word) {
    const steps = [];
    let current = this.root;

    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      steps.push({ type: "focus", nodeId: current.id });

      if (!current.children.has(char)) {
        return { found: false, steps, substringIn: null };
      }
      current = current.children.get(char);
    }

    steps.push({ type: "focus", nodeId: current.id });
    return { found: current.isEndOfWord, steps, substringIn: current.isEndOfWord ? word : null };
  }



  // Get all complete words stored in the trie
  getAllWords() {
    const words = [];
    this.collectWords(this.root, "", words);
    return words;
  }

  // Search for prefix (returns all words starting with prefix)
  searchPrefix(prefix) {
    const steps = [];
    let current = this.root;

    // Traverse to prefix end
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      steps.push({ type: "focus", nodeId: current.id });

      if (!current.children.has(char)) {
        return { found: false, words: [], steps };
      }
      current = current.children.get(char);
    }

    steps.push({ type: "focus", nodeId: current.id });

    // Collect all words from this node
    const words = [];
    this.collectWords(current, prefix, words);

    return { found: true, words, steps };
  }

  // Helper to collect all words from a node
  collectWords(node, currentWord, words) {
    if (node.isEndOfWord) {
      words.push(currentWord);
    }

    for (const [char, child] of node.children) {
      this.collectWords(child, currentWord + char, words);
    }
  }

  // Delete prefix (removes all words starting with the given prefix)
  delete(word) {
    const steps = [];
    const result = this.deleteHelper(this.root, word, 0, steps);
    return { deleted: result.wordDeleted, steps, deletedWord: result.wordDeleted ? word : null };
  }

  // Helper function for recursive delete
  // Returns { wordDeleted: boolean, canDeleteNode: boolean }
  deleteHelper(node, word, depth, steps) {
    if (!node) {
      return { wordDeleted: false, canDeleteNode: false };
    }

    steps.push({ type: "focus", nodeId: node.id });

    if (depth === word.length) {
      // Delete the prefix: remove end-of-word and clear all children (delete subtree)
      node.isEndOfWord = false;
      node.children = new Map();
      steps.push({ type: "apply", snapshot: this.cloneTrie() });
      // Prefix deleted, and node can be deleted
      return { wordDeleted: true, canDeleteNode: true };
    }

    const char = word[depth];
    if (!node.children.has(char)) {
      return { wordDeleted: false, canDeleteNode: false }; // Word not found
    }

    const child = node.children.get(char);
    const childResult = this.deleteHelper(child, word, depth + 1, steps);

    if (childResult.canDeleteNode) {
      node.children.delete(char);
      steps.push({ type: "apply", snapshot: this.cloneTrie() });
      // Return whether word was deleted, and if current node can be deleted
      return {
        wordDeleted: childResult.wordDeleted,
        canDeleteNode: node.children.size === 0 && !node.isEndOfWord
      };
    }

    // Child not deleted, return word deleted status and false for canDeleteNode
    return { wordDeleted: childResult.wordDeleted, canDeleteNode: false };
  }



  // Get all nodes for visualization (simple traversal)
  getAllNodes() {
    const nodes = [];
    const visited = new Set();

    function traverse(node, level = 0) {
      if (visited.has(node)) return;
      visited.add(node);

      nodes.push({
        id: node.id,
        char: node.char,
        isEndOfWord: node.isEndOfWord,
        level
      });

      for (const child of node.children.values()) {
        traverse(child, level + 1);
      }
    }

    traverse(this.root);
    return nodes;
  }

  // Get all edges for visualization
  getAllEdges() {
    const edges = [];
    const visited = new Set();

    function traverse(node) {
      if (visited.has(node)) return;
      visited.add(node);

      for (const child of node.children.values()) {
        edges.push({
          source: node.id,
          target: child.id,
          char: child.char
        });
        traverse(child);
      }
    }

    traverse(this.root);
    return edges;
  }
}
