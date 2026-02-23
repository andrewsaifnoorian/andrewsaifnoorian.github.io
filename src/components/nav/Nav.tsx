import { useState, useCallback } from "react";
import "./nav.css";
import { FaHome, FaBook, FaProjectDiagram } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import MagneticButton from "../magnetic-button/MagneticButton";
import useWindowScroll from "../../hooks/useWindowScroll";

const sectionIds = ["about", "project", "experience", "contact"];

const Nav = () => {
  const [activeSection, setActiveSection] = useState("about");

  useWindowScroll(
    useCallback(() => {
      const scrollY = window.scrollY + window.innerHeight / 3;

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
    }, [])
  );

  return (
    <nav>
      <MagneticButton>
        <a
          href="#about"
          className={activeSection === "about" ? "active" : ""}
        >
          <FaHome />
        </a>
      </MagneticButton>
      <MagneticButton>
        <a
          href="#project"
          className={activeSection === "project" ? "active" : ""}
        >
          <FaProjectDiagram />
        </a>
      </MagneticButton>
      <MagneticButton>
        <a
          href="#experience"
          className={activeSection === "experience" ? "active" : ""}
        >
          <FaBook />
        </a>
      </MagneticButton>
      <MagneticButton>
        <a
          href="#contact"
          className={activeSection === "contact" ? "active" : ""}
        >
          <MdContactMail />
        </a>
      </MagneticButton>
    </nav>
  );
};

export default Nav;
