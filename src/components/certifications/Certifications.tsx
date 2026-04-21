import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt, FaMedal } from "react-icons/fa";
import "./certifications.css";

interface Cert {
  id: number;
  name: string;
  issuer: string;
  date: string;
  location: string;
  locationDetail: string;
  credentialUrl: string;
  linkedinPostUrl: string;
  description: string;
  skills: string[];
}

// TODO: Fill in the actual cert names, dates, and LinkedIn post/credential URLs
// from your LinkedIn profile → Licenses & Certifications section.
const certs: Cert[] = [
  {
    id: 1,
    name: "Certification Name 1",
    issuer: "Issuing Organization",
    date: "Month 20XX",
    location: "Buffalo, NY",
    locationDetail: "Earned while working in Buffalo",
    credentialUrl: "#",
    linkedinPostUrl: "https://www.linkedin.com/in/andrewsaifnoorian/",
    description: "Add a short description of what this certification covers and why you pursued it.",
    skills: ["Skill A", "Skill B", "Skill C"],
  },
  {
    id: 2,
    name: "Certification Name 2",
    issuer: "Issuing Organization",
    date: "Month 20XX",
    location: "Buffalo, NY",
    locationDetail: "Earned while working in Buffalo",
    credentialUrl: "#",
    linkedinPostUrl: "https://www.linkedin.com/in/andrewsaifnoorian/",
    description: "Add a short description of what this certification covers and why you pursued it.",
    skills: ["Skill A", "Skill B", "Skill C"],
  },
  {
    id: 3,
    name: "Certification Name 3",
    issuer: "Issuing Organization",
    date: "Month 20XX",
    location: "New Jersey",
    locationDetail: "Earned while based in New Jersey",
    credentialUrl: "#",
    linkedinPostUrl: "https://www.linkedin.com/in/andrewsaifnoorian/",
    description: "Add a short description of what this certification covers and why you pursued it.",
    skills: ["Skill A", "Skill B", "Skill C"],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const CertCard = ({ cert, index }: { cert: Cert; index: number }) => (
  <motion.article
    className="cert-card"
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: EASE, delay: index * 0.12 }}
  >
    <div className="cert-card__accent" />

    <div className="cert-card__header">
      <div className="cert-card__medal">
        <FaMedal className="cert-card__medal-icon" />
      </div>
      <div className="cert-card__meta">
        <p className="cert-card__issuer">{cert.issuer}</p>
        <h2 className="cert-card__name">{cert.name}</h2>
      </div>
    </div>

    <p className="cert-card__desc">{cert.description}</p>

    <div className="cert-card__tags">
      {cert.skills.map((s) => (
        <span key={s}>{s}</span>
      ))}
    </div>

    <div className="cert-card__info-row">
      <span className="cert-card__info-item">
        <FaCalendarAlt className="cert-card__info-icon" />
        {cert.date}
      </span>
      <span className="cert-card__info-item">
        <FaMapMarkerAlt className="cert-card__info-icon" />
        {cert.location}
      </span>
      <span className="cert-card__location-detail">{cert.locationDetail}</span>
    </div>

    <div className="cert-card__actions">
      <a
        href={cert.linkedinPostUrl}
        className="cert-card__btn cert-card__btn--primary"
        target="_blank"
        rel="noreferrer"
      >
        View on LinkedIn <FaExternalLinkAlt className="cert-card__btn-icon" />
      </a>
      {cert.credentialUrl !== "#" && (
        <a
          href={cert.credentialUrl}
          className="cert-card__btn"
          target="_blank"
          rel="noreferrer"
        >
          Credential <FaExternalLinkAlt className="cert-card__btn-icon" />
        </a>
      )}
    </div>
  </motion.article>
);

const Certifications = () => (
  <div className="certs-page">
    <motion.div
      className="certs-hero"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
    >
      <p className="certs-eyebrow">Licenses &amp; Certifications</p>
      <h1 className="certs-headline">Credentials</h1>
      <p className="certs-subtext">
        Professional certifications earned across career milestones in Buffalo and New Jersey.
      </p>
      <a href="/" className="certs-back">
        ← Back to portfolio
      </a>
    </motion.div>

    <div className="certs-grid">
      {certs.map((cert, i) => (
        <CertCard key={cert.id} cert={cert} index={i} />
      ))}
    </div>
  </div>
);

export default Certifications;
