import { Link } from "react-router";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { openPalette } from "../components/ui/paletteEvents";
import "./pages.css";

const NotFound = () => {
  useDocumentMeta("Page not found");

  return (
    <div className="subpage subpage--center page">
      <p className="subpage__code mono">404</p>
      <h1 className="subpage__title">This page does not exist.</h1>
      <p className="subpage__text">It may have moved during the redesign.</p>
      <div className="subpage__actions">
        <Link to="/" className="btn btn--primary">
          Back to home
        </Link>
        <button className="btn" onClick={openPalette}>
          Search the site
        </button>
      </div>
    </div>
  );
};

export default NotFound;
