import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import SectionHead from "./SectionHead";
import { aims, research } from "../../data/research";
import "./research.css";

const Research = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="research" className="section page" aria-labelledby="research-title">
      <SectionHead
        index="01"
        eyebrow="Doctoral research"
        title="Doctor of Engineering"
        id="research-title"
      >
        <p>{research.intro}</p>
      </SectionHead>

      <div className="research reveal">
        <div className="research__main card">
          <p className="research__label mono">Dissertation</p>
          <p className="research__title">{research.title}</p>

          <div className="research__flow" aria-label="G RAG context sources">
            {research.sources.map((s) => (
              <span key={s} className="research__source">
                {s}
              </span>
            ))}
            <span className="research__arrow" aria-hidden="true" />
            <span className="research__sink">Grounded, auditable recommendation</span>
          </div>

          <div id="research-body" className={`research__body${expanded ? " is-expanded" : ""}`}>
            {research.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
            <p>{research.closing}</p>
          </div>
          <button
            className="research__toggle text-link"
            onClick={() => setExpanded((e) => !e)}
            aria-expanded={expanded}
            aria-controls="research-body"
          >
            {expanded ? "Show less" : "Read the full research statement"}
            <FiChevronDown className={expanded ? "is-flipped" : undefined} aria-hidden="true" />
          </button>
        </div>

        <ol className="research__aims">
          {aims.map((aim) => (
            <li key={aim.number} className="research__aim">
              <span className="research__aim-num mono">Aim {aim.number}</span>
              <h3>{aim.title}</h3>
              <p>{aim.text}</p>
            </li>
          ))}
          <li className="research__aim research__aim--meta">
            <span className="research__aim-num mono">Timeline</span>
            <h3>{research.timeline}</h3>
            <p>Defense expected in 2029.</p>
          </li>
        </ol>
      </div>
    </section>
  );
};

export default Research;
