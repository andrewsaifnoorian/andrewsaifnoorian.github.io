import { useState, useEffect, useCallback } from "react";

const useTypewriter = (text: string, speed = 80, skip = false) => {
  const [displayed, setDisplayed] = useState(skip ? text : "");
  const [done, setDone] = useState(skip);

  const type = useCallback(() => {
    if (skip) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, skip]);

  useEffect(() => {
    return type();
  }, [type]);

  return { displayed, done };
};

export default useTypewriter;
