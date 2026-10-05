import { Link } from "react-router";
import { FiArrowUpRight, FiFileText, FiGithub } from "react-icons/fi";
import SectionHead from "./SectionHead";
import { FEATURED_COUNT, projects } from "../../data/projects";
import { profile } from "../../data/profile";
import type { Project } from "../../data/types";
import "./work.css";

const FeaturedCard = ({ project, index }: { project: Project; index: number }) => (
  <article
    className={`work-card card card--interactive reveal${index === 0 ? " work-card--lead" : ""}`}
    style={{ "--hue": project.accentHue } as React.CSSProperties}
  >
    <Link
      to={`/work/${project.slug}`}
      className="work-card__media"
      tabIndex={-1}
      aria-hidden="true"
    >
      <img src={project.image} alt="" loading="lazy" decoding="async" />
    </Link>
    <div className="work-card__body">
      <p className="work-card__category mono">{project.category}</p>
      <h3 className="work-card__title">
        <Link to={`/work/${project.slug}`} className="work-card__link">
          {project.title}
        </Link>
      </h3>
      <p className="work-card__desc">{project.description}</p>
      <ul className="chips" aria-label="Tech stack">
        {project.techStack.slice(0, 5).map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>
      <div className="work-card__actions">
        <span className="text-link">
          Read case study <FiArrowUpRight className="arrow" aria-hidden="true" />
        </span>
        {project.paper && (
          <a
            className="work-card__extra"
            href={project.paper}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiFileText aria-hidden="true" /> Paper
          </a>
        )}
        {project.repo && (
          <a
            className="work-card__extra"
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub aria-hidden="true" /> Code
          </a>
        )}
      </div>
    </div>
  </article>
);

const Work = () => {
  const featured = projects.slice(0, FEATURED_COUNT);
  const rest = projects.slice(FEATURED_COUNT);

  return (
    <section id="work" className="section page" aria-labelledby="work-title">
      <SectionHead
        index="02"
        eyebrow="Selected work"
        title="Projects, end to end"
        id="work-title"
        action={
          <a
            className="btn btn--sm"
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub aria-hidden="true" /> GitHub
          </a>
        }
      >
        <p>
          {projects.length} projects spanning MLOps and applied AI research, full-stack web
          applications, AI infrastructure, DevOps pipelines, and client work. Each one has a full
          write-up: the problem, the approach, and an honest account of the result.
        </p>
      </SectionHead>

      <div className="work-grid">
        {featured.map((p, i) => (
          <FeaturedCard key={p.id} project={p} index={i} />
        ))}
      </div>

      <h3 className="work-index__title reveal">More projects</h3>
      <ul className="work-index reveal">
        {rest.map((p) => (
          <li key={p.id}>
            <Link to={`/work/${p.slug}`} className="work-index__row">
              <span className="work-index__name">{p.title}</span>
              <span className="work-index__cat">{p.category}</span>
              <span className="work-index__stack mono">{p.techStack.slice(0, 3).join(" / ")}</span>
              <FiArrowUpRight className="arrow work-index__arrow" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Work;
