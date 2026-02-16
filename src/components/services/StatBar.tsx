import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import { stats } from "./servicesData";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const StatItem = ({
  target,
  suffix,
  label,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = usePrefersReducedMotion();
  const count = useMotionValue(0);
  const [display, setDisplay] = useState(reducedMotion ? target.toString() : "0");

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: "easeOut",
    });
    const unsubscribe = count.on("change", (v) => {
      setDisplay(Math.round(v).toString());
    });
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, count, target, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      className="stat-bar__item"
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <span className="stat-bar__value">
        {display}
        {suffix}
      </span>
      <span className="stat-bar__label">{label}</span>
    </motion.div>
  );
};

const StatBar = () => (
  <div className="stat-bar">
    {stats.map((stat, i) => (
      <StatItem
        key={stat.label}
        target={stat.target}
        suffix={stat.suffix}
        label={stat.label}
        index={i}
      />
    ))}
  </div>
);

export default StatBar;
