import { useState, useEffect } from "react";
import "./theme-toggle.css";

const ThemeToggle = () => {
  const [isLight, setIsLight] = useState(() => {
    return localStorage.getItem("theme") === "light";
  });

  useEffect(() => {
    if (isLight) {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    }
  }, [isLight]);

  return (
    <button
      className="theme-toggle"
      onClick={() => setIsLight((prev) => !prev)}
      aria-label="Toggle theme"
    >
      {isLight ? "\u{1F319}" : "\u{2600}\u{FE0F}"}
    </button>
  );
};

export default ThemeToggle;
