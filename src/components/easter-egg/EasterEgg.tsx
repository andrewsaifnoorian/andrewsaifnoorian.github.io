import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useKonamiCode from "../../hooks/useKonamiCode";
import "./easter-egg.css";

const COLORS = ["#ff6b6b", "#feca57", "#48dbfb", "#ff9ff3", "#54a0ff", "#5f27cd", "#01a3a4", "#f368e0"];
const COUNT = 60;

const randomBetween = (a: number, b: number) => Math.random() * (b - a) + a;

const EasterEgg = () => {
  const activated = useKonamiCode();

  const particles = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        x: randomBetween(-300, 300),
        y: randomBetween(-500, -200),
        rotate: randomBetween(-720, 720),
        size: randomBetween(6, 12),
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activated]
  );

  return (
    <AnimatePresence>
      {activated && (
        <div className="confetti-container" aria-hidden="true">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              initial={{
                x: "50vw",
                y: "50vh",
                opacity: 1,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: `calc(50vw + ${p.x}px)`,
                y: `calc(50vh + ${p.y}px)`,
                opacity: 0,
                scale: 1,
                rotate: p.rotate,
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                position: "absolute",
                width: p.size,
                height: p.size,
                borderRadius: p.size > 9 ? "50%" : "2px",
                background: p.color,
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
};

export default EasterEgg;
