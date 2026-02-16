import { useState, useEffect, useCallback } from "react";

const useIsMobile = (breakpoint: number) => {
  const query = `(max-width: ${breakpoint}px)`;
  const getMatch = useCallback(
    () => window.matchMedia(query).matches,
    [query]
  );
  const [mobile, setMobile] = useState(getMatch);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = () => setMobile(mql.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return mobile;
};

export default useIsMobile;
