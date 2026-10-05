import { Link } from "react-router";
import { FiArrowUpRight } from "react-icons/fi";
import SectionHead from "./SectionHead";
import { milestones, skillGroups, tools } from "../../data/experience";
import { certifications } from "../../data/certifications";
import "./experience.css";

const Experience = () => (
  <section id="experience" className="section page" aria-labelledby="experience-title">
    <SectionHead
      index="06"
      eyebrow="Experience"
      title="What I have been building"
      id="experience-title"
    >
      <p>
        Enterprise engineering in banking, applied AI research at Johns Hopkins, and the DevOps work
        that keeps both shipping safely.
      </p>
    </SectionHead>

    <div className="xp">
      <ol className="timeline reveal" aria-label="Milestones">
        {milestones.map((m, i) => {
          const showYear = i === 0 || milestones[i - 1].year !== m.year;
          return (
            <li key={m.title} className={showYear ? "has-year" : undefined}>
              <span className="timeline__year mono">{showYear ? m.year : ""}</span>
              <span className="timeline__dot" aria-hidden="true" />
              <div className="timeline__body">
                <p className="timeline__title">{m.title}</p>
                {m.detail && <p className="timeline__detail">{m.detail}</p>}
                <span className={`timeline__track timeline__track--${m.track.toLowerCase()}`}>
                  {m.track}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <div className="xp__side">
        <div className="xp__block reveal">
          <h3 className="xp__heading mono">Toolkit</h3>
          <dl className="skills">
            {skillGroups.map((g) => (
              <div key={g.title} className="skills__group">
                <dt>{g.title}</dt>
                <dd>
                  <ul className="chips">
                    {g.items.map((s) => (
                      <li key={s} className="chip">
                        {s}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
            <div className="skills__group">
              <dt>Daily drivers</dt>
              <dd className="skills__tools">
                <span>
                  <span className="muted">Work:</span> {tools.work.join(", ")}
                </span>
                <span>
                  <span className="muted">Personal:</span> {tools.personal.join(", ")}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="xp__block reveal">
          <div className="xp__heading-row">
            <h3 className="xp__heading mono">Certifications</h3>
            <Link to="/certifications" className="text-link xp__all">
              Details <FiArrowUpRight className="arrow" aria-hidden="true" />
            </Link>
          </div>
          <ul className="certs">
            {certifications.map((c) => (
              <li key={c.id}>
                <span className="certs__name">{c.name}</span>
                <span className="certs__meta">
                  {c.issuer} / {c.date.replace(/ \d{1,2},/, "")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

export default Experience;
