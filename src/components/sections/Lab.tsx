import { useState } from "react";
import { FiArrowUpRight, FiFileText } from "react-icons/fi";
import SectionHead from "./SectionHead";
import Dialog from "../ui/Dialog";
import CaseStudyBody from "../ui/CaseStudyBody";
import { labEntries } from "../../data/lab";
import type { LabEntry } from "../../data/types";
import "./lab.css";

type Line = [kind: "cmd" | "ok" | "dim" | "out", text: string, dim?: string];

const TERMINAL: Line[] = [
  ["cmd", "make up"],
  ["dim", "[+] Running 3/3"],
  ["ok", "Network ollama-bridge   ", "172.30.0.0/24"],
  ["ok", "Container ollama        ", "healthy  172.30.0.10:11434"],
  ["ok", "Container open-webui    ", "started  localhost:3000"],
  ["cmd", "ollama ps"],
  ["dim", "NAME          SIZE     PROCESSOR"],
  ["out", "gemma4:26b    14 GB    100% GPU     ", "RTX 5080"],
];

const Lab = () => {
  const [selected, setSelected] = useState<LabEntry | null>(null);

  return (
    <section id="lab" className="section page" aria-labelledby="lab-title">
      <SectionHead
        index="03"
        eyebrow="Personal lab / AI infrastructure"
        title="A local AI stack on my own hardware"
        id="lab-title"
        action={
          <a
            className="btn btn--sm"
            href="/localai-guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiFileText aria-hidden="true" /> 18-page guide
          </a>
        }
      >
        <p>
          A fully self-hosted LLM stack: Ollama for inference, Google's Gemma models as the backend,
          and Open WebUI as the chat interface. Containerized with Docker Compose on an isolated
          bridge network, with a CI/CD pipeline covering lint, build, test, security scanning, and
          deploy. No API keys, no rate limits, no data leaving the machine.
        </p>
      </SectionHead>

      <div className="lab-terminal reveal" aria-hidden="true">
        <div className="lab-terminal__bar">
          <span />
          <span />
          <span />
          <p className="mono">~/local-ai</p>
        </div>
        <pre className="mono">
          {TERMINAL.map(([kind, text, dim], i) => (
            <span key={i} className="t-line">
              {kind === "cmd" && <span className="t-prompt">$ </span>}
              {kind === "ok" && <span className="t-ok"> {"✓"} </span>}
              <span className={kind === "dim" ? "t-dim" : undefined}>{text}</span>
              {dim && <span className="t-dim">{dim}</span>}
            </span>
          ))}
          <span className="t-cursor" />
        </pre>
      </div>

      <div className="lab-grid">
        {labEntries.map((entry, i) => (
          <article
            key={entry.id}
            className="lab-card card card--interactive reveal"
            style={{ "--hue": entry.accentHue } as React.CSSProperties}
          >
            <p className="lab-card__num mono">{String(i + 1).padStart(2, "0")}</p>
            <p className="lab-card__sub mono">{entry.subtitle}</p>
            <h3>{entry.title}</h3>
            <p className="lab-card__desc">{entry.description}</p>
            <ul className="chips">
              {entry.tags.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
            <button className="text-link lab-card__open" onClick={() => setSelected(entry)}>
              Deep dive <FiArrowUpRight className="arrow" aria-hidden="true" />
            </button>
          </article>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onClose={() => setSelected(null)}
        label={selected?.title ?? "Details"}
      >
        {selected && (
          <article className="detail">
            <p className="eyebrow">{selected.subtitle}</p>
            <h2 className="detail__title">{selected.title}</h2>
            <ul className="detail__facts">
              {selected.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <CaseStudyBody content={selected.expandedContent} headingLevel={3} />
          </article>
        )}
      </Dialog>
    </section>
  );
};

export default Lab;
