import { useEffect } from "react";

const lightFavicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%23f5f5f5'/><text x='50' y='68' font-size='55' font-family='system-ui' font-weight='700' text-anchor='middle' fill='%230e0e11'>A</text></svg>`;
const darkFavicon = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='48' fill='%230e0e11'/><text x='50' y='68' font-size='55' font-family='system-ui' font-weight='700' text-anchor='middle' fill='%23f5f5f5'>A</text></svg>`;

const useDynamicFavicon = () => {
  useEffect(() => {
    const update = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const link =
        document.querySelector<HTMLLinkElement>("link[rel='icon']") ??
        (() => {
          const el = document.createElement("link");
          el.rel = "icon";
          document.head.appendChild(el);
          return el;
        })();
      link.href = theme === "light" ? lightFavicon : darkFavicon;
    };

    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);
};

export default useDynamicFavicon;
