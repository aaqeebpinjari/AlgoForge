import { Sun, Moon } from "lucide-react";
import { useTheme } from "../ThemeContext";

/**
 * ThemeToggle Component (TailwindCSS version)
 */
const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const handleThemeChange = () => toggleTheme();

  const containerBase =
    "fixed top-0 right-0 h-10 w-10 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 ease-out border-2 z-[9999] overflow-hidden relative backdrop-blur-sm focus:outline-none";
  const darkClasses =
    "bg-gradient-to-br from-indigo-500 to-purple-700 border-[rgba(102,126,234,0.3)] shadow-[0_6px_25px_rgba(102,126,234,0.4)] hover:shadow-[0_10px_30px_rgba(102,126,234,0.6)]";
  const lightClasses =
    "bg-gradient-to-br from-yellow-300 to-pink-500 border-[rgba(240,147,251,0.3)] shadow-[0_6px_25px_rgba(245,87,108,0.4)] hover:shadow-[0_10px_30px_rgba(245,87,108,0.6)]";

  return (
    <div
      role="button"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      tabIndex={0}
      onClick={handleThemeChange}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleThemeChange()}
      className={`${containerBase} ${theme === "dark" ? darkClasses : lightClasses} group hover:scale-110 hover:rotate-12 active:scale-95 active:rotate-6`}
    >
      {theme === "dark" ? (
        <Sun className="text-white drop-shadow-md transition-all duration-300 group-hover:animate-pulse" size={22} strokeWidth={2} />
      ) : (
        <Moon className="text-white drop-shadow-md transition-all duration-300 group-hover:animate-pulse" size={22} strokeWidth={2} />
      )}
    </div>
  );
};

export default ThemeToggle;
