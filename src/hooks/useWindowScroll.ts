import { useEffect } from "react";

const useWindowScroll = (
  handler: () => void,
  options?: { passive?: boolean }
) => {
  useEffect(() => {
    const opts = { passive: options?.passive ?? true };
    handler();
    window.addEventListener("scroll", handler, opts);
    return () => window.removeEventListener("scroll", handler);
  }, [handler, options?.passive]);
};

export default useWindowScroll;
