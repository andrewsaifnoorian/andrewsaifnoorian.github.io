import { useState, useEffect } from "react";
import "./nav.css";
import { FaHome, FaBook, FaProjectDiagram } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";

const sectionIds = ["about", "project", "experience", "contact"];

const Nav = () => {
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;

      // If near top, highlight home
      if (window.scrollY < 100) {
        setActiveSection("about");
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav>
      <a
        href="#about"
        className={activeSection === "about" ? "active" : ""}
      >
        <FaHome />
      </a>
      <a
        href="#project"
        className={activeSection === "project" ? "active" : ""}
      >
        <FaProjectDiagram />
      </a>
      <a
        href="#experience"
        className={activeSection === "experience" ? "active" : ""}
      >
        <FaBook />
      </a>
      <a
        href="#contact"
        className={activeSection === "contact" ? "active" : ""}
      >
        <MdContactMail />
      </a>
    </nav>
  );
};

export default Nav;
