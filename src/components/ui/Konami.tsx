import { useEffect, useRef, useState } from "react";
import "./konami.css";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLORS = ["#8ab4ff", "#c4b5fd", "#6ee7b7", "#fcd34d", "#f9a8d4", "#ffffff"];
const COUNT = 70;

/** Up, up, down, down, left, right, left, right, B, A. */
const Konami = () => {
  const [burst, setBurst] = useState(0);
  const pos = useRef(0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const expected = SEQUENCE[pos.current];
      if (e.key.toLowerCase() === expected.toLowerCase()) {
        pos.current += 1;
        if (pos.current === SEQUENCE.length) {
          pos.current = 0;
          setBurst((b) => b + 1);
        }
      } else {
        pos.current = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!burst) return;
    const t = setTimeout(() => setBurst(0), 2600);
    return () => clearTimeout(t);
  }, [burst]);

  if (!burst) return null;

  return (
    <div className="konami" aria-hidden="true" key={burst}>
      {Array.from({ length: COUNT }, (_, i) => {
        const angle = (i / COUNT) * Math.PI * 2 + (i % 3) * 0.3;
        const dist = 160 + ((i * 37) % 260);
        return (
          <span
            key={i}
            style={
              {
                "--dx": `${Math.cos(angle) * dist}px`,
                "--dy": `${Math.sin(angle) * dist - 120}px`,
                "--rot": `${((i * 97) % 720) - 360}deg`,
                "--delay": `${(i % 7) * 18}ms`,
                background: COLORS[i % COLORS.length],
                borderRadius: i % 2 ? "50%" : "2px",
              } as React.CSSProperties
            }
          />
        );
      })}
      <p className="konami__msg mono">+30 lives. Nice.</p>
    </div>
  );
};

export default Konami;
