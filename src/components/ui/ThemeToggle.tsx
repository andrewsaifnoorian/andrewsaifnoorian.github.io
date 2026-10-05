import { FiMoon, FiSun } from "react-icons/fi";
import useTheme from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button className="icon-btn" onClick={toggle} aria-label={`Switch to ${next} theme`}>
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
};

export default ThemeToggle;
