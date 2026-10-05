import { useEffect } from "react";

/**
 * Fades `.reveal` elements in as they enter the viewport. Content is visible by
 * default; the hidden start state only applies once this hook adds `js-motion`
 * to <html>, so no-JS and reduced-motion visitors never see blank sections.
 */
const useReveal = (deps: unknown[] = []) => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    document.documentElement.classList.add("js-motion");
    const els = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};

export default useReveal;
