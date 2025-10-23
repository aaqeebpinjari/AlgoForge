import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";
import "../styles/ThemeToggle.css";

/**
 * ThemeToggle Component - Matches UserDropdown styling
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => toggleTheme();

  return (
    <button
      role="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      onClick={handleThemeChange}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleThemeChange()}
      className={`theme-toggle-button ${theme === "dark" ? "dark" : "light"}`}
    >
      {theme === "dark" ? (
        <Sun className="theme-toggle-icon" size={24} strokeWidth={2} />
      ) : (
        <Moon className="theme-toggle-icon" size={24} strokeWidth={2} />
      )}
    </button>
  );
};

export default ThemeToggle;

