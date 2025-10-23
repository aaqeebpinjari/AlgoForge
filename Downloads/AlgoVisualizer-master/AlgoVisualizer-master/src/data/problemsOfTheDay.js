// Problem of the Day data structure
export const PROBLEMS_POOL = [
  // Easy Problems
  {
    id: "bubble-sort-explanation",
    title: "Understanding Bubble Sort",
    difficulty: "Easy",
    description: "Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Each pass through the list places the next largest value in its proper place. In essence, each item 'bubbles' up to the location where it belongs.",
    sampleInput: "[64, 34, 25, 12, 22, 11, 90]",
    sampleOutput: "[11, 12, 22, 25, 34, 64, 90]",
    visualizationLink: "/sorting",
    explanationLink: "/sorting/bubbleSort/docs",
    practiceUrl: "https://leetcode.com/problems/sort-an-array/"
  },
  {
    id: "linear-search-basics",
    title: "Linear Search Fundamentals",
    difficulty: "Easy",
    description: "Linear Search is the simplest searching algorithm. It works by sequentially checking each element of the list until a match is found or the whole list has been searched. It's also called sequential search.",
    sampleInput: "Array: [2, 3, 4, 10, 40], Target: 10",
    sampleOutput: "Element found at index 3",
    visualizationLink: "/searching",
    explanationLink: "/searching/linearSearch",
    practiceUrl: "https://leetcode.com/problems/two-sum/"
  },
  {
    id: "stack-operations",
    title: "Stack Data Structure Operations",
    difficulty: "Easy",
    description: "A Stack is a linear data structure that follows the Last In First Out (LIFO) principle. The element that is inserted last is the first one to be removed. Think of it like a stack of plates - you can only add or remove from the top.",
    sampleInput: "Operations: Push(10), Push(20), Push(30), Pop(), Push(40)",
    sampleOutput: "Stack: [10, 20, 40] (Top: 40)",
    visualizationLink: "/data-structures/stack",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/valid-parentheses/"
  },

  // Medium Problems
  {
    id: "binary-search-tree",
    title: "Binary Search Tree Properties",
    difficulty: "Medium",
    description: "A Binary Search Tree (BST) is a node-based binary tree data structure with the following properties: The left subtree of a node contains only nodes with keys lesser than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. The left and right subtree each must also be a binary search tree.",
    sampleInput: "Insert: 50, 30, 20, 40, 70, 60, 80",
    sampleOutput: "BST with root 50, left: 30(20,40), right: 70(60,80)",
    visualizationLink: "/data-structures/binary-tree",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    id: "merge-sort-analysis",
    title: "Merge Sort Algorithm Analysis",
    difficulty: "Medium",
    description: "Merge Sort is a divide-and-conquer algorithm that divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.",
    sampleInput: "[12, 11, 13, 5, 6, 7]",
    sampleOutput: "[5, 6, 7, 11, 12, 13]",
    visualizationLink: "/sorting",
    explanationLink: "/sorting/mergeSort/docs",
    practiceUrl: "https://leetcode.com/problems/sort-an-array/"
  },
  {
    id: "graph-bfs-dfs",
    title: "BFS vs DFS Traversal",
    difficulty: "Medium",
    description: "Breadth-First Search (BFS) and Depth-First Search (DFS) are two fundamental graph traversal algorithms. BFS explores all vertices at the present depth before moving to vertices at the next depth level, while DFS explores as far as possible along each branch before backtracking.",
    sampleInput: "Graph: A-B, A-C, B-D, B-E, C-F",
    sampleOutput: "BFS from A: A, B, C, D, E, F | DFS from A: A, B, D, E, C, F",
    visualizationLink: "/graph",
    explanationLink: "/graph/bfs",
    practiceUrl: "https://leetcode.com/problems/number-of-islands/"
  },

  // Hard Problems
  {
    id: "dijkstra-algorithm",
    title: "Dijkstra's Shortest Path Algorithm",
    difficulty: "Hard",
    description: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph. It maintains a set of vertices whose shortest path from the source is already known. For each vertex, it keeps track of the current shortest distance from the source.",
    sampleInput: "Graph with weights: A(0)-B(4)-C(2), A-D(3), D-C(1)",
    sampleOutput: "Shortest paths from A: A(0), B(4), C(2), D(3)",
    visualizationLink: "/graph/dijkstra",
    explanationLink: "/graph/dijkstra",
    practiceUrl: "https://leetcode.com/problems/network-delay-time/"
  },
  {
    id: "dynamic-programming-knapsack",
    title: "0/1 Knapsack Problem",
    difficulty: "Hard",
    description: "Given weights and values of n items, put these items in a knapsack of capacity W to get the maximum total value in the knapsack. In the 0/1 variant, each item can be used at most once. This is solved using dynamic programming where dp[i][w] represents the maximum value using first i items with capacity w.",
    sampleInput: "Items: (weight: 2, value: 3), (4, 5), (5, 6) | Capacity: 8",
    sampleOutput: "Maximum value: 9 (items 1 and 3)",
    visualizationLink: "/dp",
    explanationLink: "/dp-overview",
    practiceUrl: "https://leetcode.com/problems/partition-equal-subset-sum/"
  },
  {
    id: "red-black-tree",
    title: "Red-Black Tree Balancing",
    difficulty: "Hard",
    description: "A Red-Black Tree is a self-balancing binary search tree where each node has an extra bit for denoting the color of the node, either red or black. The color is used to ensure the tree remains approximately balanced during insertions and deletions. The balancing is maintained through rotations and color changes.",
    sampleInput: "Insert sequence: 10, 20, 30, 15, 25",
    sampleOutput: "Balanced RBT maintaining height O(log n)",
    visualizationLink: "/data-structures/binary-tree",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://practice.geeksforgeeks.org/problems/red-black-tree/1"
  },

  // Data Structures Problems
  {
    id: "data-structures-overview",
    title: "Data Structures Fundamentals",
    difficulty: "Easy",
    description: "Data structures are fundamental building blocks in computer science that organize and store data efficiently. They provide different ways to access and manipulate data based on specific requirements. Understanding data structures is crucial for writing efficient algorithms and optimizing program performance.",
    sampleInput: "Choose appropriate data structure for: Stack operations, Queue operations, Tree traversals",
    sampleOutput: "Stack (LIFO), Queue (FIFO), Tree (hierarchical)",
    visualizationLink: "/data-structures",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/implement-stack-using-queues/"
  },
  {
    id: "linked-list-operations",
    title: "Linked List Operations",
    difficulty: "Medium",
    description: "A Linked List is a linear data structure where each element is a separate object. Each element (node) contains data and a reference to the next node. Linked lists provide dynamic memory allocation and efficient insertions/deletions but require sequential access.",
    sampleInput: "List: 1->2->3->4, Insert 5 at position 2",
    sampleOutput: "1->5->2->3->4",
    visualizationLink: "/data-structures/linked-list",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/reverse-linked-list/"
  },
  {
    id: "queue-visualization",
    title: "Queue Data Structure",
    difficulty: "Easy",
    description: "A Queue is a First-In-First-Out (FIFO) data structure. Elements are added to the rear and removed from the front. Queues are used in scenarios like task scheduling, breadth-first search, and handling requests in order.",
    sampleInput: "Operations: Enqueue(10), Enqueue(20), Dequeue(), Enqueue(30)",
    sampleOutput: "Queue: [20, 30] (Front: 20)",
    visualizationLink: "/data-structures/queue",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/implement-queue-using-stacks/"
  },
  {
    id: "stack-visualization",
    title: "Stack Data Structure",
    difficulty: "Easy",
    description: "A Stack is a Last-In-First-Out (LIFO) data structure. Elements are added and removed from the same end called the 'top'. Stacks are used in function call management, expression evaluation, and undo mechanisms.",
    sampleInput: "Operations: Push(10), Push(20), Push(30), Pop(), Push(40)",
    sampleOutput: "Stack: [10, 20, 40] (Top: 40)",
    visualizationLink: "/data-structures/stack",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/valid-parentheses/"
  },
  {
    id: "binary-tree-visualization",
    title: "Binary Tree Traversals",
    difficulty: "Medium",
    description: "Binary Trees are hierarchical data structures where each node has at most two children. Tree traversals include inorder, preorder, and postorder. Understanding traversals is essential for tree-based algorithms and data processing.",
    sampleInput: "Tree:     1\n   /   \\\n  2     3\n / \\\n4   5",
    sampleOutput: "Inorder: 4,2,5,1,3 | Preorder: 1,2,4,5,3 | Postorder: 4,5,2,3,1",
    visualizationLink: "/data-structures/binary-tree",
    explanationLink: "/data-structures-docs",
    practiceUrl: "https://leetcode.com/problems/binary-tree-inorder-traversal/"
  },

  // Sorting Problems
  {
    id: "sorting-overview",
    title: "Sorting Algorithms Overview",
    difficulty: "Easy",
    description: "Sorting algorithms arrange elements in a specific order. Different algorithms have different time and space complexities. Understanding when to use each algorithm is crucial for efficient programming.",
    sampleInput: "[64, 34, 25, 12, 22, 11, 90]",
    sampleOutput: "[11, 12, 22, 25, 34, 64, 90]",
    visualizationLink: "/sorting",
    explanationLink: "/sorting",
    practiceUrl: "https://leetcode.com/problems/sort-an-array/"
  },
  {
    id: "sorting-comparison",
    title: "Algorithm Complexity Comparison",
    difficulty: "Medium",
    description: "Different sorting algorithms have varying time and space complexities. Bubble Sort (O(n²)) is simple but slow, Quick Sort (O(n log n)) is fast but complex, Merge Sort (O(n log n)) is stable and predictable.",
    sampleInput: "Compare: Bubble Sort vs Quick Sort vs Merge Sort",
    sampleOutput: "Time: O(n²) vs O(n log n) vs O(n log n) | Space: O(1) vs O(log n) vs O(n)",
    visualizationLink: "/sorting/comparison",
    explanationLink: "/sorting",
    practiceUrl: "https://leetcode.com/problems/sort-colors/"
  },

  // Searching Problems
  {
    id: "searching-overview",
    title: "Searching Algorithms Overview",
    difficulty: "Easy",
    description: "Searching algorithms find specific elements within data structures. Linear search checks each element sequentially, while binary search requires sorted data but is much faster. Choosing the right algorithm depends on data organization.",
    sampleInput: "Array: [2, 3, 4, 10, 40], Target: 10",
    sampleOutput: "Linear Search: O(n) | Binary Search: O(log n)",
    visualizationLink: "/searching",
    explanationLink: "/searchingOverview",
    practiceUrl: "https://leetcode.com/problems/binary-search/"
  },
  {
    id: "searching-algorithms",
    title: "Advanced Searching Techniques",
    difficulty: "Medium",
    description: "Beyond basic linear and binary search, there are interpolation search for uniformly distributed data, exponential search for unbounded arrays, and jump search for block-organized data. Each has specific use cases and performance characteristics.",
    sampleInput: "Sorted array of size 10^6, search for element",
    sampleOutput: "Binary Search: ~20 comparisons | Linear Search: ~500,000 comparisons",
    visualizationLink: "/searching",
    explanationLink: "/searchingOverview",
    practiceUrl: "https://leetcode.com/problems/search-in-rotated-sorted-array/"
  },

  // Graph Problems
  {
    id: "graph-overview",
    title: "Graph Data Structures",
    difficulty: "Medium",
    description: "Graphs represent relationships between objects. They consist of vertices (nodes) connected by edges. Graphs can be directed or undirected, weighted or unweighted. Understanding graph representations (adjacency list/matrix) is fundamental.",
    sampleInput: "Graph with 4 vertices: A-B, B-C, C-D, D-A",
    sampleOutput: "Adjacency List: A->[B,D], B->[A,C], C->[B,D], D->[C,A]",
    visualizationLink: "/graph",
    explanationLink: "/graph",
    practiceUrl: "https://leetcode.com/problems/number-of-islands/"
  },
  {
    id: "graph-bfs-traversal",
    title: "Breadth-First Search (BFS)",
    difficulty: "Medium",
    description: "BFS explores all vertices at the present depth before moving to vertices at the next depth level. It uses a queue and is perfect for finding shortest paths in unweighted graphs and level-order traversals.",
    sampleInput: "Graph: A-B, A-C, B-D, B-E, C-F | Start: A",
    sampleOutput: "BFS Order: A, B, C, D, E, F",
    visualizationLink: "/graph/bfs",
    explanationLink: "/graph/bfs",
    practiceUrl: "https://leetcode.com/problems/binary-tree-level-order-traversal/"
  },
  {
    id: "graph-dfs-traversal",
    title: "Depth-First Search (DFS)",
    difficulty: "Medium",
    description: "DFS explores as far as possible along each branch before backtracking. It uses a stack (or recursion) and is useful for topological sorting, cycle detection, and exploring all possible paths.",
    sampleInput: "Graph: A-B, A-C, B-D, B-E, C-F | Start: A",
    sampleOutput: "DFS Order: A, B, D, E, C, F",
    visualizationLink: "/graph/dfs",
    explanationLink: "/graph/dfs",
    practiceUrl: "https://leetcode.com/problems/max-area-of-island/"
  },
  {
    id: "graph-dijkstra-path",
    title: "Dijkstra's Shortest Path",
    difficulty: "Hard",
    description: "Dijkstra's algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph. It maintains a priority queue and greedily selects the next closest vertex.",
    sampleInput: "Graph: A(0)-B(4)-C(2), A-D(3), D-C(1)",
    sampleOutput: "Shortest paths: A(0), B(4), C(2), D(3)",
    visualizationLink: "/graph/dijkstra",
    explanationLink: "/graph/dijkstra",
    practiceUrl: "https://leetcode.com/problems/network-delay-time/"
  },
  {
    id: "graph-comparison",
    title: "Graph Algorithm Comparison",
    difficulty: "Medium",
    description: "Different graph algorithms serve different purposes. BFS finds shortest paths in unweighted graphs, DFS explores deeply, Dijkstra handles weighted graphs, Bellman-Ford detects negative cycles.",
    sampleInput: "Compare BFS, DFS, Dijkstra for shortest path",
    sampleOutput: "BFS: Unweighted | DFS: Exploration | Dijkstra: Non-negative weights",
    visualizationLink: "/graph/comparison",
    explanationLink: "/graph",
    practiceUrl: "https://leetcode.com/problems/cheapest-flights-within-k-stops/"
  },
  {
    id: "graph-cycle-detection",
    title: "Cycle Detection in Graphs",
    difficulty: "Medium",
    description: "Detecting cycles in graphs is crucial for many applications. DFS can detect cycles by tracking visited nodes and the recursion stack. Union-Find is efficient for undirected graphs.",
    sampleInput: "Graph: A-B, B-C, C-A (cycle exists)",
    sampleOutput: "Cycle detected: A → B → C → A",
    visualizationLink: "/graph/cycleDetection",
    explanationLink: "/graph/cycleDetection",
    practiceUrl: "https://leetcode.com/problems/course-schedule/"
  },

  // Paradigm Problems
  {
    id: "backtracking-overview",
    title: "Backtracking Fundamentals",
    difficulty: "Medium",
    description: "Backtracking is a general algorithm for finding all (or some) solutions to computational problems. It incrementally builds candidates and abandons a candidate ('backtracks') as soon as it determines the candidate cannot lead to a valid solution.",
    sampleInput: "N-Queens problem: Place 4 queens on 4x4 board",
    sampleOutput: "Valid solution exists with backtracking",
    visualizationLink: "/backtracking-overview",
    explanationLink: "/backtracking-overview",
    practiceUrl: "https://leetcode.com/problems/n-queens/"
  },
  {
    id: "backtracking-algorithms",
    title: "Backtracking Problem Solving",
    difficulty: "Hard",
    description: "Backtracking solves constraint satisfaction problems like N-Queens, Sudoku, and the Knight's Tour. It uses recursion and state restoration to explore solution spaces efficiently.",
    sampleInput: "Sudoku puzzle with some cells filled",
    sampleOutput: "Complete valid Sudoku solution",
    visualizationLink: "/backtracking",
    explanationLink: "/backtracking",
    practiceUrl: "https://leetcode.com/problems/sudoku-solver/"
  },
  {
    id: "dp-overview",
    title: "Dynamic Programming Introduction",
    difficulty: "Medium",
    description: "Dynamic Programming solves complex problems by breaking them into simpler subproblems. It uses memoization or tabulation to store results of subproblems, avoiding redundant calculations. DP is essential for optimization problems.",
    sampleInput: "Fibonacci sequence computation",
    sampleOutput: "DP: O(n) time | Recursive: O(2^n) time",
    visualizationLink: "/dp-overview",
    explanationLink: "/dp-overview",
    practiceUrl: "https://leetcode.com/problems/climbing-stairs/"
  },
  {
    id: "dp-algorithms",
    title: "Dynamic Programming Problems",
    difficulty: "Hard",
    description: "DP solves knapsack problems, longest common subsequences, matrix chain multiplication, and more. Understanding state definition and transition is key to mastering DP.",
    sampleInput: "Knapsack: weights [2,3,4], values [3,4,5], capacity 5",
    sampleOutput: "Maximum value: 7 (items 1 and 3)",
    visualizationLink: "/dp",
    explanationLink: "/dp",
    practiceUrl: "https://leetcode.com/problems/coin-change/"
  },
  {
    id: "greedy-overview",
    title: "Greedy Algorithm Strategy",
    difficulty: "Medium",
    description: "Greedy algorithms make locally optimal choices at each step with the hope of finding a global optimum. They work for problems with the greedy choice property and optimal substructure.",
    sampleInput: "Coin change: coins [1,5,10,25], amount 63",
    sampleOutput: "2×25 + 1×10 + 3×1 = 63 cents",
    visualizationLink: "/greedy-overview",
    explanationLink: "/greedy-overview",
    practiceUrl: "https://leetcode.com/problems/jump-game/"
  },
  {
    id: "greedy-algorithms",
    title: "Greedy Problem Solving",
    difficulty: "Medium",
    description: "Greedy algorithms solve activity selection, Huffman coding, Kruskal's MST, and fractional knapsack. They provide efficient solutions when the greedy choice leads to optimality.",
    sampleInput: "Activities: (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)",
    sampleOutput: "Selected: (1,4), (5,7), (8,11), (12,16)",
    visualizationLink: "/greedy",
    explanationLink: "/greedy",
    practiceUrl: "https://leetcode.com/problems/maximum-subarray/"
  },
  {
    id: "divide-conquer-overview",
    title: "Divide and Conquer Strategy",
    difficulty: "Medium",
    description: "Divide and Conquer breaks problems into smaller subproblems, solves them recursively, and combines solutions. This approach leads to efficient algorithms like Merge Sort, Quick Sort, and Binary Search.",
    sampleInput: "Array: [3,1,4,1,5,9,2,6]",
    sampleOutput: "Sorted: [1,1,2,3,4,5,6,9]",
    visualizationLink: "/dc-overview",
    explanationLink: "/dc-overview",
    practiceUrl: "https://leetcode.com/problems/merge-two-sorted-lists/"
  },
  {
    id: "divide-conquer-algorithms",
    title: "Divide and Conquer Applications",
    difficulty: "Hard",
    description: "D&C solves closest pair of points, Strassen's matrix multiplication, and fast Fourier transforms. It provides optimal solutions for many computational geometry and algebraic problems.",
    sampleInput: "Matrix multiplication: 2x2 matrices",
    sampleOutput: "Strassen's: 7 multiplications vs Standard: 8 multiplications",
    visualizationLink: "/dc",
    explanationLink: "/dc",
    practiceUrl: "https://leetcode.com/problems/median-of-two-sorted-arrays/"
  },

  // Other Topics
  {
    id: "hashing-overview",
    title: "Hashing Fundamentals",
    difficulty: "Medium",
    description: "Hashing maps data to fixed-size values using hash functions. Hash tables provide average O(1) lookup time. Collision resolution techniques include chaining and open addressing.",
    sampleInput: "Keys: 'apple', 'banana', 'cherry'",
    sampleOutput: "Hash values: 5, 3, 7 (with collisions handled)",
    visualizationLink: "/hashing-overview",
    explanationLink: "/hashing-overview",
    practiceUrl: "https://leetcode.com/problems/design-hashmap/"
  },
  {
    id: "hashing-algorithms",
    title: "Hash Table Implementations",
    difficulty: "Medium",
    description: "Hash tables implement associative arrays with key-value pairs. Load factor affects performance. Rehashing maintains efficiency. Hash functions should minimize collisions.",
    sampleInput: "Operations: Insert('key1', 'value1'), Get('key1'), Remove('key1')",
    sampleOutput: "Hash table maintains O(1) average time complexity",
    visualizationLink: "/hashing",
    explanationLink: "/hashing",
    practiceUrl: "https://leetcode.com/problems/two-sum/"
  },
  {
    id: "tree-overview",
    title: "Tree Data Structures",
    difficulty: "Medium",
    description: "Trees are hierarchical structures with nodes connected by edges. Binary trees, AVL trees, and B-trees serve different purposes. Tree traversals and balancing are fundamental concepts.",
    sampleInput: "Binary tree with nodes: 1,2,3,4,5,6,7",
    sampleOutput: "Height: 3, Balanced: Yes, Complete: Yes",
    visualizationLink: "/tree-overview",
    explanationLink: "/tree-overview",
    practiceUrl: "https://leetcode.com/problems/maximum-depth-of-binary-tree/"
  },
  {
    id: "tree-algorithms",
    title: "Tree Algorithms",
    difficulty: "Hard",
    description: "Tree algorithms include traversals, balancing, and optimization. Understanding tree rotations, balancing factors, and self-adjusting trees is crucial for advanced data structure implementations.",
    sampleInput: "AVL tree insertions: 10,20,30,40,50,25",
    sampleOutput: "Balanced tree with rotations applied",
    visualizationLink: "/tree",
    explanationLink: "/tree",
    practiceUrl: "https://leetcode.com/problems/validate-binary-search-tree/"
  },
  {
    id: "game-search-overview",
    title: "Game Theory and Search",
    difficulty: "Hard",
    description: "Game search algorithms like Minimax and Alpha-Beta pruning solve two-player games. They explore game trees, evaluating positions and choosing optimal moves.",
    sampleInput: "Tic-tac-toe board state",
    sampleOutput: "Best move: center square (evaluation: +10)",
    visualizationLink: "/game-search-overview",
    explanationLink: "/game-search-overview",
    practiceUrl: "https://leetcode.com/problems/valid-tic-tac-toe-state/"
  },
  {
    id: "game-search-algorithms",
    title: "Advanced Game Search",
    difficulty: "Hard",
    description: "Alpha-Beta pruning optimizes Minimax by eliminating unnecessary branches. Heuristics improve performance. These algorithms power chess engines and strategic games.",
    sampleInput: "Chess position evaluation",
    sampleOutput: "Alpha-Beta: 50% fewer nodes evaluated",
    visualizationLink: "/game-search",
    explanationLink: "/game-search",
    practiceUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
  },
  {
    id: "branch-bound-overview",
    title: "Branch and Bound Strategy",
    difficulty: "Hard",
    description: "Branch and Bound systematically explores solution spaces for optimization problems. It uses bounding functions to prune suboptimal branches, making it efficient for NP-hard problems.",
    sampleInput: "Traveling Salesman: 4 cities, distances given",
    sampleOutput: "Optimal path: A→B→C→D (cost: 15)",
    visualizationLink: "/branchbound-overview",
    explanationLink: "/branchbound-overview",
    practiceUrl: "https://leetcode.com/problems/minimum-path-sum/"
  },
  {
    id: "branch-bound-algorithms",
    title: "Branch and Bound Applications",
    difficulty: "Hard",
    description: "Branch and Bound solves knapsack, assignment, and traveling salesman problems. FIFO, LIFO, and LC (least cost) branching strategies optimize different scenarios.",
    sampleInput: "0/1 Knapsack with branch and bound",
    sampleOutput: "Optimal solution found with pruning",
    visualizationLink: "/branchbound",
    explanationLink: "/branchbound",
    practiceUrl: "https://leetcode.com/problems/partition-equal-subset-sum/"
  }
];

// Helper function to get difficulty color
export const getDifficultyColor = (difficulty) => {
  switch (difficulty.toLowerCase()) {
    case 'easy':
      return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
    case 'medium':
      return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
    case 'hard':
      return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
    default:
      return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
  }
};

// Helper function to get problems by difficulty
export const getProblemsByDifficulty = (difficulty) => {
  return PROBLEMS_POOL.filter(problem => problem.difficulty.toLowerCase() === difficulty.toLowerCase());
};
