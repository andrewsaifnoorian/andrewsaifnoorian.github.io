import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useInView, animate } from "framer-motion";
import type { BentoCard } from "./servicesData";
import TiltCard from "../tilt-card/TiltCard";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

/* ── MetricCard ── */
const MetricCard = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = usePrefersReducedMotion();

  const numericMatch = value.match(/^(\d+)/);
  const numericPart = numericMatch ? parseInt(numericMatch[1], 10) : 0;
  const textPart = numericMatch ? value.slice(numericMatch[1].length) : value;

  const count = useMotionValue(0);
  const [display, setDisplay] = useState(reducedMotion ? numericPart.toString() : "0");

  useEffect(() => {
    if (!inView || reducedMotion || numericPart === 0) return;
    const controls = animate(count, numericPart, {
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
  }, [inView, count, numericPart, reducedMotion]);

  return (
    <div ref={ref} className="bento-metric">
      <span className="bento-metric__value">
        {numericPart > 0 ? display : value}
        {numericPart > 0 && textPart}
      </span>
      <span className="bento-metric__label">{label}</span>
    </div>
  );
};

/* ── TechCard ── */
const TechCardContent = ({
  icons,
  reducedMotion,
}: {
  icons: { icon: React.ComponentType<{ className?: string }>; name: string }[];
  reducedMotion: boolean;
}) => (
  <div className="bento-tech">
    {icons.map(({ icon: Icon, name }) => (
      <motion.div
        key={name}
        className="bento-tech__item"
        whileHover={reducedMotion ? undefined : { scale: 1.15, y: -3 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <Icon className="bento-tech__icon" />
        <span className="bento-tech__name">{name}</span>
      </motion.div>
    ))}
  </div>
);

/* ── ShowcaseCard ── */
const ShowcaseCardContent = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="bento-showcase">
    <h4 className="bento-showcase__title">{title}</h4>
    <p className="bento-showcase__desc">{description}</p>
  </div>
);

/* ── BentoGrid ── */
interface BentoGridProps {
  cards: BentoCard[];
  highlightedId: string | null;
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.4, ease: "easeOut" as const },
  }),
};

const BentoGrid = ({ cards, highlightedId }: BentoGridProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="bento-grid">
      {cards.map((card, i) => {
        const isHighlighted = highlightedId === card.id;

        const inner = (() => {
          switch (card.type) {
            case "metric":
              return <MetricCard value={card.value!} label={card.label!} />;
            case "tech":
              return <TechCardContent icons={card.icons!} reducedMotion={reducedMotion} />;
            case "showcase":
              return <ShowcaseCardContent title={card.title!} description={card.description!} />;
          }
        })();

        const content = (
          <motion.div
            className={`bento-card bento-card--${card.size} bento-card--${card.type} ${
              isHighlighted ? "bento-card--highlight" : ""
            }`}
            custom={i}
            initial={reducedMotion ? false : "hidden"}
            animate="visible"
            variants={reducedMotion ? undefined : cardVariants}
            data-card-id={card.id}
          >
            {inner}
          </motion.div>
        );

        return card.type === "showcase" ? (
          <TiltCard key={card.id}>{content}</TiltCard>
        ) : (
          <div key={card.id}>{content}</div>
        );
      })}
    </div>
  );
};

export default BentoGrid;
