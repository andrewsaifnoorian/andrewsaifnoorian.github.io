import { Link } from "react-router-dom";
import "./footer.css";
import { FaGithub, FaLinkedin, FaFileAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer>
      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <a href="#project">Projects</a>
        </li>
        <li>
          <a href="#experience">Experience</a>
        </li>
        <li>
          <a href="#services">Expertise</a>
        </li>
        <li>
          <a href="#testimonials">Testimonials</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>
      <div className="footer_socials">
        <a
          href="https://www.linkedin.com/in/andrewsaifnoorian/"
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/andrewsaifnoorian"
          target="_blank"
          rel="noreferrer"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
        <Link to="/resume" aria-label="Resume">
          <FaFileAlt />
        </Link>
      </div>
      <div className="footer_copyright">
        <small>&copy; {new Date().getFullYear()} Andrew Saifnoorian</small>
      </div>
    </footer>
  );
};

export default Footer;
