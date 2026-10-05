import type { CaseStudy } from "../../data/types";
import "./case-study-body.css";

const CaseStudyBody = ({
  content,
  headingLevel = 2,
}: {
  content: CaseStudy;
  headingLevel?: 2 | 3;
}) => {
  const H = `h${headingLevel}` as const;
  return (
    <div className="cs-body">
      <section>
        <H className="cs-body__heading mono">Overview</H>
        <p className="cs-body__lead">{content.overview}</p>
      </section>
      <section>
        <H className="cs-body__heading mono">Approach</H>
        <ol className="cs-body__steps">
          {content.approach.map((step, i) => (
            <li key={i}>
              <span className="cs-body__step-num mono" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      </section>
      <section>
        <H className="cs-body__heading mono">Result</H>
        <p className="cs-body__result">{content.result}</p>
      </section>
    </div>
  );
};

export default CaseStudyBody;
