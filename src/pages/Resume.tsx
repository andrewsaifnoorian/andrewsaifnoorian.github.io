import { Link } from "react-router";
import EmailLink from "../components/ui/EmailLink";
import { getEmail } from "../data/profile";
import useDocumentMeta from "../hooks/useDocumentMeta";
import "./pages.css";

// Intentionally a lighthearted placeholder rather than a resume download.
const Resume = () => {
  useDocumentMeta("Resume");

  return (
    <div className="subpage subpage--center page">
      <h1 className="subpage__title">Oops... Awkward.</h1>
      <p className="subpage__text">
        Hey, sorry about that! I'm currently <strong>not</strong> looking for a job, but I
        appreciate the curiosity!
      </p>
      <p className="subpage__text">
        For any serious inquiries, feel free to reach me at{" "}
        <EmailLink className="text-link">{getEmail()}</EmailLink>
      </p>
      <Link to="/" className="btn btn--primary">
        Take me back
      </Link>
    </div>
  );
};

export default Resume;
