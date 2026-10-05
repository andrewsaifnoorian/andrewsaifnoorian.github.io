import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHead from "./SectionHead";
import Dialog from "../ui/Dialog";
import CaseStudyBody from "../ui/CaseStudyBody";
import { competitions, KAGGLE_PROFILE_URL } from "../../data/kaggle";
import type { KaggleCompetition } from "../../data/types";
import "./kaggle.css";

const isTop = (rank: string) => /^Rank 1\b/.test(rank);

const Kaggle = () => {
  const [selected, setSelected] = useState<KaggleCompetition | null>(null);

  return (
    <section id="kaggle" className="section page" aria-labelledby="kaggle-title">
      <SectionHead
        index="04"
        eyebrow="Johns Hopkins / ML engineering"
        title="Kaggle competitions"
        id="kaggle-title"
        action={
          <a
            className="btn btn--sm"
            href={KAGGLE_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Kaggle profile <FiArrowUpRight aria-hidden="true" />
          </a>
        }
      >
        <p>
          {competitions.length} machine learning competitions from the Johns Hopkins ML Engineering
          program, spanning DNA sequence classification, audio phoneme detection, radon level
          prediction, collaborative filtering, gender classification, and crypto price forecasting.
        </p>
      </SectionHead>

      <div className="kgl reveal">
        <div className="kgl__head" aria-hidden="true">
          <span>Competition</span>
          <span>Approach</span>
          <span className="kgl__num">Score</span>
          <span className="kgl__num">Placement</span>
        </div>
        {competitions.map((c) => (
          <button
            key={c.id}
            className="kgl__row"
            onClick={() => setSelected(c)}
            aria-label={`${c.title}: ${c.score} ${c.scoreLabel}, ${c.rank}. Open details`}
          >
            <span className="kgl__title">
              {c.title}
              <span className="kgl__tags">{c.tags.join(" / ")}</span>
            </span>
            <span className="kgl__approach">{c.techniques[0]}</span>
            <span className="kgl__num kgl__score">
              <span className="mono">{c.score}</span>
              <span className="kgl__metric">{c.scoreLabel}</span>
            </span>
            <span className="kgl__num">
              <span className={`kgl__rank${isTop(c.rank) ? " is-top" : ""}`}>
                {c.rank.replace(/^Rank /, "")}
              </span>
            </span>
            <FiArrowUpRight className="arrow kgl__arrow" aria-hidden="true" />
          </button>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={selected?.title ?? "Details"}
      >
        {selected && (
          <article className="detail">
            <p className="eyebrow">{selected.tags.join(" / ")}</p>
            <h2 className="detail__title">{selected.title}</h2>
            <p className="kgl-detail__desc">{selected.description}</p>
            <dl className="kgl-detail__stats">
              <div>
                <dt className="mono">{selected.scoreLabel}</dt>
                <dd>{selected.score}</dd>
              </div>
              <div>
                <dt className="mono">Placement</dt>
                <dd>{selected.rank.replace(/^Rank /, "")}</dd>
              </div>
              {selected.runtime && (
                <div>
                  <dt className="mono">Runtime</dt>
                  <dd>{selected.runtime}</dd>
                </div>
              )}
            </dl>
            <ul className="detail__facts">
              {selected.techniques.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <CaseStudyBody content={selected.expandedContent} headingLevel={3} />
          </article>
        )}
      </Dialog>
    </section>
  );
};

export default Kaggle;
