import { Link, useParams } from "react-router";
import { FiArrowLeft, FiArrowRight, FiFileText, FiGithub } from "react-icons/fi";
import CaseStudyBody from "../components/ui/CaseStudyBody";
import { findProject, projects } from "../data/projects";
import useDocumentMeta from "../hooks/useDocumentMeta";
import NotFound from "./NotFound";
import "./case-study.css";

const CaseStudy = () => {
  const { slug } = useParams();
  const project = findProject(slug);
  useDocumentMeta(project?.title, project?.description);

  if (!project) return <NotFound />;

  const i = projects.indexOf(project);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="cs page" style={{ "--hue": project.accentHue } as React.CSSProperties}>
      <nav className="cs__crumbs" aria-label="Breadcrumb">
        <Link to="/#work" className="text-link">
          <FiArrowLeft aria-hidden="true" /> All work
        </Link>
        <span className="mono muted">
          {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </nav>

      <header className="cs__header">
        <p className="cs__category mono">{project.category}</p>
        <h1 className="cs__title">{project.title}</h1>
        <p className="cs__summary">{project.description}</p>

        <div className="cs__meta">
          <div>
            <p className="cs__meta-label mono">Stack</p>
            <ul className="chips">
              {project.techStack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          {(project.paper || project.repo) && (
            <div className="cs__links">
              {project.paper && (
                <a
                  className="btn btn--primary"
                  href={project.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiFileText aria-hidden="true" /> Read the paper
                </a>
              )}
              {project.repo && (
                <a className="btn" href={project.repo} target="_blank" rel="noopener noreferrer">
                  <FiGithub aria-hidden="true" /> Source code
                </a>
              )}
            </div>
          )}
        </div>
      </header>

      <figure className="cs__figure">
        <img src={project.image} alt={`${project.title} screenshot`} decoding="async" />
      </figure>

      <div className="cs__content">
        <CaseStudyBody content={project.expandedContent} />
      </div>

      <nav className="cs__pager" aria-label="More case studies">
        <Link to={`/work/${prev.slug}`} className="cs__pager-link">
          <span className="mono muted">
            <FiArrowLeft aria-hidden="true" /> Previous
          </span>
          <span>{prev.title}</span>
        </Link>
        <Link to={`/work/${next.slug}`} className="cs__pager-link cs__pager-link--next">
          <span className="mono muted">
            Next <FiArrowRight aria-hidden="true" />
          </span>
          <span>{next.title}</span>
        </Link>
      </nav>
    </article>
  );
};

export default CaseStudy;
