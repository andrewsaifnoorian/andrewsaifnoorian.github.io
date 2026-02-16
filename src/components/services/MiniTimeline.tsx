import { motion } from "framer-motion";
import type { TimelineNode } from "./servicesData";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface MiniTimelineProps {
  nodes: TimelineNode[];
  onNodeClick: (linkedCardId: string) => void;
}

const nodeVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
  }),
};

const MiniTimeline = ({ nodes, onNodeClick }: MiniTimelineProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="mini-timeline">
      <div className="mini-timeline__line" />
      {nodes.map((node, i) => (
        <motion.button
          key={`${node.year}-${i}`}
          className="mini-timeline__node"
          custom={i}
          initial={reducedMotion ? false : "hidden"}
          animate="visible"
          variants={reducedMotion ? undefined : nodeVariants}
          onClick={() => onNodeClick(node.linkedCardId)}
          type="button"
        >
          <span className="mini-timeline__dot" />
          <span className="mini-timeline__year">{node.year}</span>
          <span className="mini-timeline__text">{node.text}</span>
        </motion.button>
      ))}
    </div>
  );
};

export default MiniTimeline;
