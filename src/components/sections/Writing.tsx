import { FiArrowUpRight } from "react-icons/fi";
import SectionHead from "./SectionHead";
import { papers } from "../../data/writing";
import "./writing.css";

const Writing = () => (
  <section id="writing" className="section page" aria-labelledby="writing-title">
    <SectionHead index="05" eyebrow="Long-form" title="Writing" id="writing-title">
      <p>
        Every project on this site is backed by a full write-up: methodology, results, and honest
        limitations, not just a demo. A few of them, below.
      </p>
    </SectionHead>

    <ol className="papers reveal">
      {papers.map((paper, i) => (
        <li key={paper.href}>
          <a className="paper" href={paper.href} target="_blank" rel="noopener noreferrer">
            <span className="paper__num mono">{String(i + 1).padStart(2, "0")}</span>
            <span className="paper__main">
              <span className="paper__title">{paper.title}</span>
              <span className="paper__desc">{paper.description}</span>
            </span>
            <span className="paper__meta">
              <span>{paper.meta}</span>
              <span className="mono">PDF / {paper.pages} pp</span>
            </span>
            <FiArrowUpRight className="arrow paper__arrow" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ol>
  </section>
);

export default Writing;
