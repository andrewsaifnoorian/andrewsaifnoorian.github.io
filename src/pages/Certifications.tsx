import { Link } from "react-router";
import { FiArrowLeft, FiArrowUpRight } from "react-icons/fi";
import { certifications } from "../data/certifications";
import useDocumentMeta from "../hooks/useDocumentMeta";
import "./pages.css";

const Certifications = () => {
  useDocumentMeta(
    "Certifications",
    "Certifications earned by Andrew Saifnoorian, including Anthropic's Model Context Protocol courses and ServiceNow Certified Application Developer.",
  );

  return (
    <div className="subpage page">
      <Link to="/#experience" className="text-link subpage__back">
        <FiArrowLeft aria-hidden="true" /> Back
      </Link>
      <header className="subpage__header">
        <p className="eyebrow">Credentials</p>
        <h1 className="subpage__title">Certifications</h1>
      </header>

      <ol className="cert-list">
        {certifications.map((c) => {
          const verifiable = c.credentialUrl && c.credentialUrl !== "#";
          return (
            <li key={c.id} className="cert card">
              <div className="cert__head">
                <div>
                  <p className="cert__issuer mono">{c.issuer}</p>
                  <h2 className="cert__name">{c.name}</h2>
                </div>
                {verifiable && (
                  <a
                    className="btn btn--sm"
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Verify <FiArrowUpRight aria-hidden="true" />
                  </a>
                )}
              </div>
              <p className="cert__desc">{c.description}</p>
              <ul className="chips">
                {c.skills.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
              <dl className="cert__facts">
                <div>
                  <dt className="mono">Issued</dt>
                  <dd>{c.date}</dd>
                </div>
                <div>
                  <dt className="mono">Credential ID</dt>
                  <dd className="mono">{c.credentialId}</dd>
                </div>
                <div>
                  <dt className="mono">Context</dt>
                  <dd>{c.locationDetail}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Certifications;
