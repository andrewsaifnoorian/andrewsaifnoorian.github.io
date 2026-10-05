import { FiArrowDownRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import GraphField from "../ui/GraphField";
import EmailLink from "../ui/EmailLink";
import Me from "../../assets/me.webp";
import { highlights, now, profile } from "../../data/profile";
import "./hero.css";

const Hero = () => (
  <section id="top" className="hero" aria-labelledby="hero-title">
    <div className="hero__graph no-print">
      <GraphField />
    </div>

    <div className="page hero__inner">
      <div className="hero__intro">
        <p className="hero__status reveal">
          <span className="hero__dot" aria-hidden="true" />
          {profile.role}
        </p>

        <h1 id="hero-title" className="hero__title reveal">
          Andrew Saifnoorian
          <span className="hero__subtitle">
            builds AI systems you can <em>audit</em>, and the full-stack platforms around them.
          </span>
        </h1>

        <p className="hero__bio reveal">{profile.bio}</p>

        <div className="hero__ctas reveal">
          <a href="#work" className="btn btn--primary">
            Selected work <FiArrowDownRight className="arrow" aria-hidden="true" />
          </a>
          <EmailLink className="btn">
            <FiMail aria-hidden="true" /> Email
          </EmailLink>
          <div className="hero__socials">
            <a
              className="icon-btn"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
            <a
              className="icon-btn"
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FiLinkedin />
            </a>
          </div>
        </div>
      </div>

      <aside className="hero__card card reveal" aria-label="At a glance">
        <img
          className="hero__portrait"
          src={Me}
          alt="Portrait of Andrew Saifnoorian"
          width={400}
          height={400}
          fetchPriority="high"
        />
        <dl className="hero__now">
          {now.map((item) => (
            <div key={item.label}>
              <dt className="mono">{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </aside>
    </div>

    <div className="page">
      <ul className="hero__stats reveal" aria-label="Highlights">
        {highlights.map((h) => (
          <li key={h.label}>
            <span className="hero__stat-value">{h.value}</span>
            <span className="hero__stat-label">{h.label}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Hero;
