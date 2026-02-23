import { useState, useCallback } from "react";
import "./back-to-top.css";
import useWindowScroll from "../../hooks/useWindowScroll";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useWindowScroll(
    useCallback(() => {
      setVisible(window.scrollY > window.innerHeight);
    }, [])
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      &#8593;
    </button>
  );
};

export default BackToTop;
