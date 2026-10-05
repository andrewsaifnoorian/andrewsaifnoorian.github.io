import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FiCommand, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "../ui/ThemeToggle";
import useActiveSection from "../../hooks/useActiveSection";
import { SECTIONS, SECTION_IDS } from "../../lib/site";
import { openPalette } from "../ui/paletteEvents";
import "./header.css";

const Header = () => {
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const active = useActiveSection(SECTION_IDS, onHome);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled || menuOpen ? " is-scrolled" : ""}`}>
      <div className="page site-header__inner">
        <Link to="/" className="brand" aria-label="Andrew Saifnoorian, home">
          <span className="brand__mark" aria-hidden="true">
            AS
          </span>
          <span className="brand__name">Andrew Saifnoorian</span>
        </Link>

        <nav className="site-nav" aria-label="Sections">
          <ul>
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <Link
                  to={{ pathname: "/", hash: `#${s.id}` }}
                  className={active === s.id ? "is-active" : undefined}
                  aria-current={active === s.id ? "location" : undefined}
                >
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <button className="kbd-btn" onClick={openPalette} aria-label="Open command menu">
            <FiCommand aria-hidden="true" />
            <span>K</span>
          </button>
          <ThemeToggle />
          <button
            className="icon-btn menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <nav
        id="mobile-menu"
        className={`mobile-menu${menuOpen ? " is-open" : ""}`}
        aria-label="Sections"
        hidden={!menuOpen}
      >
        <ul className="page">
          {SECTIONS.map((s, i) => (
            <li key={s.id}>
              <Link to={{ pathname: "/", hash: `#${s.id}` }} onClick={() => setMenuOpen(false)}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
