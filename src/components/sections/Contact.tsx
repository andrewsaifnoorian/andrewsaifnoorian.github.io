import { FiArrowUpRight, FiCopy, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import EmailLink from "../ui/EmailLink";
import { showToast } from "../ui/toast";
import { getEmail, profile } from "../../data/profile";
import "./contact.css";

const copyEmail = () => {
  const email = getEmail();
  if (!navigator.clipboard) {
    showToast(email);
    return;
  }
  navigator.clipboard.writeText(email).then(
    () => showToast("Email copied to clipboard"),
    () => showToast(email),
  );
};

const Contact = () => (
  <section id="contact" className="section page" aria-labelledby="contact-title">
    <div className="contact card reveal">
      <p className="eyebrow">
        <span className="eyebrow__index">08</span>Contact
      </p>
      <h2 id="contact-title" className="contact__title">
        Have a hard problem in enterprise AI? <span>I would like to hear about it.</span>
      </h2>
      <p className="contact__lede">
        Research collaborations, speaking, or just comparing notes on RAG and MLOps. Email is the
        fastest way to reach me; LinkedIn works too.
      </p>
      <div className="contact__actions">
        <EmailLink className="btn btn--primary" subject="Hello from your portfolio">
          <FiMail aria-hidden="true" /> Send an email
        </EmailLink>
        <button className="btn" onClick={copyEmail}>
          <FiCopy aria-hidden="true" /> Copy address
        </button>
      </div>
      <ul className="contact__links">
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <FiLinkedin aria-hidden="true" /> LinkedIn{" "}
            <FiArrowUpRight className="arrow" aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            <FiGithub aria-hidden="true" /> GitHub{" "}
            <FiArrowUpRight className="arrow" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </div>
  </section>
);

export default Contact;
