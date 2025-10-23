# Navigation Structure Documentation

## Overview

This document explains the unified navigation structure implemented in the AlgoVisualizer application. The navigation system has been refactored to ensure consistency between the Header and Navbar components while maintaining their distinct purposes.

## Structure

The navigation structure is defined in `src/utils/navigation.js` and consists of two main navigation arrays:

1. `headerNavigationItems` - Simplified navigation for the header component
2. `navbarNavigationItems` - Detailed navigation with dropdowns for the main navbar

## Header Navigation

The header navigation is designed for quick access to primary sections of the application:

```javascript
[
  { path: '/', label: 'Home', icon: null, group: 'main' },
  { path: '/sorting', label: 'Sorting', icon: 'FaCode', group: 'learn' },
  { path: '/searching', label: 'Searching', icon: 'FaSearch', group: 'learn' },
  { path: '/data-structures', label: 'Data Structures', icon: 'FaDatabase', group: 'learn' },
  { path: '/graph', label: 'Graph', icon: 'FaProjectDiagram', group: 'learn' },
  { path: '/quiz', label: 'Quiz', icon: 'FaBrain', group: 'test' },
  { path: '/contributors', label: 'Contributors', icon: 'FaUsers', group: 'community' },
  { path: '/documentation', label: 'Documentation', icon: 'FaBook', group: 'help' }
]
```

### Groups

- **main**: Primary navigation items (Home)
- **learn**: Learning resources (Sorting, Searching, Data Structures, Graph)
- **test**: Assessment tools (Quiz)
- **community**: Community-related pages (Contributors)
- **help**: Help and documentation (Documentation)

## Navbar Navigation

The navbar provides detailed navigation with dropdown menus for each category:

```javascript
[
  { path: "/", label: "Home", icon: "Home" },
  {
    label: "Sorting",
    icon: "BarChart3",
    dropdown: [
      { path: "/sorting", label: "Overview" },
      { path: "/components/AlgorithmComparison", label: "Algorithm Comparison" },
    ],
  },
  // ... more items
]
```

## Implementation

### Header Component

The Header component uses the `headerNavigationItems` array and groups items by their `group` property. Icons are mapped using React Icons (Fa* components).

### Navbar Component

The Navbar component uses the `navbarNavigationItems` array and supports dropdown menus. Icons are mapped using Lucide React icons.

## Adding New Navigation Items

### For Header Navigation

1. Add a new object to the `headerNavigationItems` array in `src/utils/navigation.js`
2. Specify the `path`, `label`, `icon` (if any), and `group`
3. Ensure the icon name matches an available React Icons component

### For Navbar Navigation

1. Add a new object to the `navbarNavigationItems` array in `src/utils/navigation.js`
2. For simple links, specify `path`, `label`, and `icon`
3. For dropdown menus, specify `label`, `icon`, and a `dropdown` array with sub-items
4. Ensure the icon name matches an available Lucide React icon component

## Icon Mapping

Icons are mapped in each component using helper functions:

### Header Icons
Uses React Icons (Fa* components):
- FaCode
- FaSearch
- FaDatabase
- FaProjectDiagram
- FaBrain
- FaUsers
- FaBook
- FaQuestionCircle

### Navbar Icons
Uses Lucide React icons:
- Home
- BarChart3
- Search
- Database
- GitBranch
- Users
- Trophy
- Settings
- Type
- BookOpen
- Cpu
- Code
- Hash
- Zap
- Gamepad
- TreeDeciduous
- Menu

## Maintenance

To maintain consistency between the two navigation structures:

1. Keep related items in both structures synchronized
2. Ensure URLs are consistent between similar items
3. Update both structures when adding or removing major sections
4. Test both navigation components after making changes

## Future Improvements

1. Consider implementing a single source of truth for navigation items that can be transformed for each component
2. Add navigation analytics to track usage patterns
3. Implement keyboard navigation support
4. Add accessibility labels for screen readers