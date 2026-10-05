import { useEffect } from "react";
import { SITE_TITLE } from "../lib/site";

/** Keeps <title> and the meta description in sync with the current route. */
const useDocumentMeta = (title?: string, description?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | Andrew Saifnoorian` : SITE_TITLE;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute("content", description);
    }
  }, [title, description]);
};

export default useDocumentMeta;
