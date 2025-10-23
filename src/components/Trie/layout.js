/**
 * Layout utility for Trie visualization
 * Positions nodes in a hierarchical manner with proper spacing
 */

export function layoutTrie(trie) {
  if (!trie || !trie.root) {
    return { nodes: [], edges: [], viewBox: [-50, -50, 100, 100] };
  }

  const rawNodes = trie.getAllNodes();
  const rawEdges = trie.getAllEdges();

  if (rawNodes.length === 0) {
    return { nodes: [], edges: [], viewBox: [-50, -50, 100, 100] };
  }

  // Group nodes by level
  const levelNodes = new Map();
  rawNodes.forEach(node => {
    if (!levelNodes.has(node.level)) {
      levelNodes.set(node.level, []);
    }
    levelNodes.get(node.level).push(node);
  });

  // Position nodes level by level
  const positionedNodes = [];
  const maxLevel = Math.max(...Array.from(levelNodes.keys()));

  for (let level = 0; level <= maxLevel; level++) {
    const nodesInLevel = levelNodes.get(level);
    if (!nodesInLevel) continue;

    const y = level * 80;
    const spacing = 60;
    const totalWidth = (nodesInLevel.length - 1) * spacing;
    const startX = -totalWidth / 2;

    nodesInLevel.forEach((node, index) => {
      const x = startX + index * spacing;
      positionedNodes.push({
        ...node,
        x,
        y
      });
    });
  }

  // Create node map for edge positioning
  const nodeMap = new Map();
  positionedNodes.forEach(node => {
    nodeMap.set(node.id, node);
  });

  // Position edges
  const positionedEdges = rawEdges.map(edge => ({
    ...edge,
    sourceNode: nodeMap.get(edge.source),
    targetNode: nodeMap.get(edge.target)
  }));

  // Calculate viewBox
  const minX = Math.min(...positionedNodes.map(n => n.x));
  const maxX = Math.max(...positionedNodes.map(n => n.x));
  const minY = Math.min(...positionedNodes.map(n => n.y));
  const maxY = Math.max(...positionedNodes.map(n => n.y));

  const padding = 60;
  const width = maxX - minX + padding * 2;
  const height = maxY - minY + padding * 2;

  // Shift nodes to positive coordinates
  const shiftX = padding - minX;
  const shiftY = padding - minY;

  positionedNodes.forEach(node => {
    node.x += shiftX;
    node.y += shiftY;
  });

  return {
    nodes: positionedNodes,
    edges: positionedEdges,
    viewBox: [0, 0, width, height]
  };
}
