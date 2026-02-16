import { useState, useEffect, useRef } from "react";

const GLYPHS = "!<>-_\\/[]{}—=+*^?#________";
const DURATION = 600;

const useTextScramble = (text: string, trigger: boolean, skip: boolean) => {
  const [display, setDisplay] = useState(skip ? text : text);
  const frameRef = useRef(0);

  useEffect(() => {
    if (skip || !trigger) return;

    const chars = text.split("");
    const total = chars.length;
    const start = performance.now();

    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / DURATION, 1);
      const resolved = Math.floor(progress * total);

      const result = chars
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < resolved) return char;
          return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        })
        .join("");

      setDisplay(result);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step);
      }
    };

    frameRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameRef.current);
  }, [text, trigger, skip]);

  return display;
};

export default useTextScramble;
