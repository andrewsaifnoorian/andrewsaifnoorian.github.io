import { Link } from "react-router";
import { profile } from "../../data/profile";
import "./footer.css";

const BUILD_DATE = new Date(__BUILD_TIME__).toLocaleDateString("en-US", {
  month: "long",
  year: "numeric",
});

const Footer = () => (
  <footer className="site-footer">
    <div className="page site-footer__inner">
      <div className="site-footer__id">
        <span className="brand__mark" aria-hidden="true">
          AS
        </span>
        <p>
          &copy; {new Date().getFullYear()} {profile.name}
          <span className="muted"> / Updated {BUILD_DATE}</span>
        </p>
      </div>
      <nav aria-label="Footer">
        <ul className="site-footer__links">
          <li>
            <Link to="/certifications">Certifications</Link>
          </li>
          <li>
            <Link to="/resume">Resume</Link>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={profile.source} target="_blank" rel="noopener noreferrer">
              Source
            </a>
          </li>
        </ul>
      </nav>
    </div>
    <p className="page site-footer__hint mono">
      Built with React, TypeScript and Vite. Press <kbd>Ctrl</kbd> <kbd>K</kbd> to jump anywhere.
    </p>
  </footer>
);

export default Footer;
