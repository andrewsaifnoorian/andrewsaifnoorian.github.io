import { useState, useEffect, useRef } from "react";

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

const useKonamiCode = () => {
  const [activated, setActivated] = useState(false);
  const index = useRef(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === KONAMI[index.current]) {
        index.current++;
        if (index.current === KONAMI.length) {
          setActivated(true);
          index.current = 0;
          setTimeout(() => setActivated(false), 3000);
        }
      } else {
        index.current = 0;
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return activated;
};

export default useKonamiCode;
