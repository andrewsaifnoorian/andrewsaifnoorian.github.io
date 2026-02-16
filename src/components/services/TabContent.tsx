import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import type { TabData } from "./servicesData";
import MiniTimeline from "./MiniTimeline";
import BentoGrid from "./BentoGrid";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface TabContentProps {
  tab: TabData;
}

const contentVariants = {
  enter: { opacity: 0, x: 20 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

const TabContent = ({ tab }: TabContentProps) => {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleNodeClick = useCallback(
    (cardId: string) => {
      if (reducedMotion) return;
      setHighlightedId(cardId);
      const el = document.querySelector(`[data-card-id="${cardId}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      setTimeout(() => setHighlightedId(null), 1200);
    },
    [reducedMotion]
  );

  return (
    <motion.div
      className="tab-content"
      key={tab.id}
      variants={reducedMotion ? undefined : contentVariants}
      initial={reducedMotion ? false : "enter"}
      animate="center"
      exit={reducedMotion ? undefined : "exit"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="tab-content__timeline">
        <MiniTimeline nodes={tab.timeline} onNodeClick={handleNodeClick} />
      </div>
      <div className="tab-content__bento">
        <BentoGrid cards={tab.bento} highlightedId={highlightedId} />
      </div>
    </motion.div>
  );
};

export default TabContent;
