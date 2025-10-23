import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home,
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  X,
  Type,
  ChevronDown,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu
} from "lucide-react"; 
import { useTheme } from "../ThemeContext";
import { navbarNavigationItems } from "../utils/navigation";
import UserDropdown from "./UserDropdown";
import ThemeToggle from "./ThemeToggle";

const ICON_COMPONENTS = {
  BarChart3,
  Search,
  Database,
  GitBranch,
  Users,
  Trophy,
  Settings,
  Type,
  BookOpen,
  Cpu,
  Code,
  Hash,
  Zap,
  Gamepad,
  TreeDeciduous,
  Menu
};

// Desktop Nav Item
const DesktopNavItem = ({
  item,
  index,
  isOpen,
  toggleDropdown,
  isActive,
  getIcon,
  selectedCommunity,
  setSelectedCommunity,
  isSidebarExpanded
}) => { 
  if (item.dropdown) {
    return (
      <div 
        className="navbar-item dropdown" 
        key={index}
        onMouseEnter={() => toggleDropdown(index)}
        onMouseLeave={() => {
          // Add a small delay to prevent closing when moving to the dropdown menu
          setTimeout(() => toggleDropdown(null), 100);
        }}
      >
        <button
          className={`dropdown-toggle ${isOpen === index ? "active" : ""}`}
          data-tooltip={item.label === "Community" ? selectedCommunity : item.label}
        >
          {item.icon &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "drop-icon"
            })}
          <span className="navbar-label dropdown-label">
            {item.label === "Community" ? selectedCommunity : item.label}
          </span>
          {isSidebarExpanded && (
            <ChevronDown
              size={16}
              className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`}
            />
          )}
        </button>
        {isOpen === index && (
          <div className="dropdown-menu">
            {item.dropdown.map((sub, subIndex) => (
              <Link
                key={subIndex}
                to={sub.path}
                className={`dropdown-item block w-full text-left px-3 py-2 hover:bg-gray-700 rounded-md transition-colors duration-150 ${
    isActive(sub.path) ? "bg-gray-700" : ""}`}
                onClick={() => toggleDropdown(null)}
              >
                {sub.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`navbar-link ${isActive(item.path) ? "active" : ""}`}
      data-tooltip={item.label}
      key={index}
    >
      {item.icon &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span className="navbar-label">{item.label}</span>
    </Link>
  );
};

// Mobile Nav Item
const MobileNavItem = ({ item, index, isOpen, toggleDropdown, isActive, getIcon, closeMenu }) => {
  if (item.dropdown) {
    return (
      <div className="mobile-dropdown" key={index}>
        <button
          className={`mobile-dropdown-toggle ${isOpen === index ? "active" : ""}`}
          onClick={() => toggleDropdown(index)}
        >
          {item.icon &&
            React.createElement(getIcon(item.icon), {
              size: 18,
              className: "icon"
            })}
          <span>{item.label}</span>
          <ChevronDown
            size={16}
            className={`dropdown-arrow ${isOpen === index ? "rotated" : ""}`}
          />
        </button>

        <div className={`mobile-dropdown-menu ${isOpen === index ? "open" : ""}`}>
          {item.dropdown.map((sub, subIndex) => (
            <Link
              key={subIndex}
              to={sub.path}
              className={`mobile-menu-link ${isActive(sub.path) ? "active" : ""}`}
              onClick={() => {
                toggleDropdown(null);
                closeMenu();
              }}
            >
              {sub.label}
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={`mobile-menu-link ${isActive(item.path) ? "active" : ""}`}
      onClick={closeMenu}
      key={index}
    >
      {item.icon &&
        React.createElement(getIcon(item.icon), {
          size: 18,
          className: "icon"
        })}
      <span>{item.label}</span>
    </Link>
  );
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(null);
  const [desktopNotesOpen, setDesktopNotesOpen] = useState(false);
  const [mobileNotesOpen, setMobileNotesOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState("Community");
  const [selectedNotes, setSelectedNotes] = useState("Notes");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const location = useLocation();
  const { theme } = useTheme();
  const navbarRef = useRef(null);

  const navMenuRef = useRef(null);
  const itemRefs = useRef({});
  const [lineStyle, setLineStyle] = useState({});

  // Function to update the magic line's position
  const updateLine = (element) => {
    if (element) {
      setLineStyle({
        width: element.offsetWidth,
        left: element.offsetLeft,
      });
    }
  };

  // Set initial position and update on route change
  useEffect(() => {
    const activeItem = Object.values(itemRefs.current).find(
      (el) => el && el.classList.contains("active")
    );
    if (activeItem) {
      updateLine(activeItem);
    }
  }, [location.pathname]);
  const getIcon = (name) => ICON_COMPONENTS[name] || null;
  const isActive = (path) => location.pathname === path;

  const toggleDesktopDropdown = (index) =>
    setDesktopDropdownOpen(desktopDropdownOpen === index ? null : index);
  const toggleMobileDropdown = (index) =>
    setMobileDropdownOpen(mobileDropdownOpen === index ? null : index);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navbarRef.current && !navbarRef.current.contains(e.target)) {
        setDesktopDropdownOpen(null);
        setMobileDropdownOpen(null);
        setDesktopNotesOpen(false);
        setMobileNotesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav 
      className={`navbar sidebar-nav ${isSidebarExpanded ? 'expanded' : ''} ${theme}`} 
      ref={navbarRef}
      onMouseEnter={() => setIsSidebarExpanded(true)}
      onMouseLeave={() => {
        setIsSidebarExpanded(false);
        setDesktopDropdownOpen(null); // Close dropdowns when leaving sidebar
      }}
    >
      <div className="navbar-container flex flex-col items-start w-full px-4">
        {/* Logo */}
        <Link to="/" className="navbar-logo flex items-center gap-2">
          <img src="/logo.jpg" alt="AlgoVisualizer Logo" className="logo-img" />
          <span className="logo-text navbar-label">
            Algo<span>Visualizer</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          className="hidden md:flex flex-col items-start gap-3 w-full desktop-nav-menu"
          ref={navMenuRef}
        >
          {/* Render nav items excluding "Notes" */}
          {navbarNavigationItems
            .filter((item) => item.label.toLowerCase() !== "notes")
            .map((item, i) => (
              <DesktopNavItem
                ref={(el) => (itemRefs.current[item.path || `dropdown-${i}`] = el)}
                key={i}
                item={item}
                index={i}
                isOpen={desktopDropdownOpen}
                toggleDropdown={toggleDesktopDropdown}
                isActive={isActive}
                getIcon={getIcon}
                selectedCommunity={selectedCommunity}
                setSelectedCommunity={setSelectedCommunity}
                isSidebarExpanded={isSidebarExpanded}
                onMouseEnter={(e) => updateLine(e.currentTarget)}
              />
            ))}

          {/* Insert Notes dropdown here (moved from right) */}
          {location.pathname !== "/notes/rust" && (
            <div className="navbar-item dropdown" ref={(el) => (itemRefs.current['notes-dropdown'] = el)}
                  onMouseEnter={() => setDesktopNotesOpen(true)}
                  onMouseLeave={() => {
                    setTimeout(() => setDesktopNotesOpen(false), 100);
                  }}
             >
              <button 
                className={`dropdown-toggle ${desktopNotesOpen ? "active" : ""}`}
                onClick={() => setDesktopNotesOpen(!desktopNotesOpen)}
              >
                <BookOpen size={18} className="drop-icon" />
                <span className="navbar-label">{selectedNotes}</span>
                {isSidebarExpanded && (
                  <ChevronDown size={16} className={`${desktopNotesOpen ? "rotated" : ""}`} />
                )}
              </button>
              {desktopNotesOpen && (
                <div className="dropdown-menu bg-slate-800 text-white rounded-md shadow-lg mt-1 w-full">
                  <Link
                    to="/notes/java"
                    className={`dropdown-item ${isActive("/notes/java") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    Java
                  </Link>
                  <Link
                    to="/notes/python"
                    className={`dropdown-item ${isActive("/notes/python") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    Python
                  </Link>
                  <Link
                    to="/notes/cpp"
                    className={`dropdown-item ${isActive("/notes/cpp") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    C++
                  </Link>
                  <Link
                    to="/notes/c"
                    className={`dropdown-item ${isActive("/notes/c") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    C
                  </Link>
                  <Link
                    to="/notes/javascript"
                    className={`dropdown-item ${isActive("/notes/javascript") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    JavaScript
                  </Link>
                  <Link
                    to="/notes/nextjs"
                    className={`dropdown-item ${isActive("/notes/nextjs") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    NextJs
                  </Link>
                  <Link
                    to="/notes/rust"
                    className={`dropdown-item ${isActive("/notes/rust") ? "active" : ""}`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    Rust
                  </Link>
                  <Link
                    to="/notes/MERN/MERNFundamentals"
                    className={`dropdown-item ${
                      isActive("/notes/MERN/MERNFundamentals") ? "active" : ""
                    } bg-white`}
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    MERN
                  </Link>

                  <Link
                    to="https://docs.google.com/spreadsheets/d/1mvlc8EYc3OVVU3X7NKoC0iZJr_45BL_pVxiJec0r94c/htmlview?gid=0#gid=0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedNotes("DSA Sheet  by Shradha Khapra");
                      setDesktopNotesOpen(false);
                    }}
                  >
                    DSA Sheet by Shradha Khapra
                  </Link>
                  <Link
                    to="https://codolio.com/question-tracker/sheet/neetcode-150?category=popular"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                    onClick={() => {
                      setSelectedNotes("DSA Sheet by NEETCODE");
                      setDesktopNotesOpen(false);
                    }}
                  >
                    DSA Sheet by NEETCODE
                  </Link>

                  <Link
                    to="https://takeuforward.org/strivers-a2z-dsa-course/strivers-a2z-dsa-course-sheet-2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                    onClick={() => setDesktopNotesOpen(false)}
                  >
                    DSA Sheet by STRIVER
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Algorithm Comparison Table Link */}
          <Link
            to="/algorithm-comparison-table"
            className={`navbar-link ${isActive("/algorithm-comparison-table") ? "active" : ""}`}
            data-tooltip="Compare"
            ref={(el) => (itemRefs.current['/algorithm-comparison-table'] = el)}
            onMouseEnter={(e) => updateLine(e.currentTarget)}
          >
            <BarChart3 size={18} className="icon" />
            <span className="navbar-label">Compare</span>
          </Link>

          {/* Magic Line for active/hover indicator */}
          <div className="magic-line" style={lineStyle}></div>
        </div>

        {/* Right side controls: UserDropdown & ThemeToggle */}
        <div className="sidebar-footer hidden md:flex">
          <UserDropdown />
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-button md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Optional: Mobile Menu Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-header-content">
            <span className="mobile-menu-title">AlgoVisualizer</span>
            <button className="mobile-menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <p className="mobile-menu-subtitle">Explore Algorithms & Notes</p>
        </div>

        {/* Menu Items */}
        {navbarNavigationItems.map((item, i) => (
          <MobileNavItem
            key={i}
            item={item}
            index={i}
            isOpen={mobileDropdownOpen}
            toggleDropdown={toggleMobileDropdown}
            isActive={isActive}
            getIcon={getIcon}
            closeMenu={() => setIsMobileMenuOpen(false)}
          />
        ))}

        {/* Algorithm Comparison Table Link - Mobile */}
        <Link
          to="/algorithm-comparison-table"
          className={`mobile-menu-link ${isActive("/algorithm-comparison-table") ? "active" : ""}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <BarChart3 size={18} className="icon" />
          <span>Compare Algorithms</span>
        </Link>

        {/* Notes Section */}
        <div className="mobile-dropdown">
          <button
            className={`mobile-dropdown-toggle ${mobileNotesOpen ? "active" : ""}`}
            onClick={() => setMobileNotesOpen(!mobileNotesOpen)}
          >
            <BookOpen size={18} className="icon" />
            <span>{selectedNotes}</span>
            <ChevronDown size={16} className={`${mobileNotesOpen ? "rotated" : ""}`} />
          </button>
          <div className={`mobile-dropdown-menu ${mobileNotesOpen ? "open" : ""}`}>
            <Link
              to="/notes/java"
              className="mobile-menu-link"
              onClick={() => {
                setSelectedNotes("Java");
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Java
            </Link>
            <Link
              to="/notes/python"
              className="mobile-menu-link"
              onClick={() => {
                setSelectedNotes("Python");
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              Python
            </Link>
            <Link
              to="/notes/cpp"
              className="mobile-menu-link"
              onClick={() => {
                setSelectedNotes("C++");
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              C++
            </Link>
            <Link
              to="/notes/c"
              className="mobile-menu-link"
              onClick={() => {
                setSelectedNotes("C");
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              C
            </Link>

            <Link
              to="/notes/javascript"
              className="mobile-menu-link"
              onClick={() => {
                setSelectedNotes("JavaScript");
                setMobileNotesOpen(false);
                setIsMobileMenuOpen(false);
              }}
            >
              JavaScript
            </Link>
          </div>
        </div>

        {/* User Dropdown */}
        <div className="mobile-user-dropdown mt-4">
          <UserDropdown />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
