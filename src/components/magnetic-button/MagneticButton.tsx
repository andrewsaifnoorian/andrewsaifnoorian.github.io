import { type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useRelativeMouse from "../../hooks/useRelativeMouse";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import { useIsLowPerformance } from "../../hooks/usePerformanceTier";
import useIsMobile from "../../hooks/useIsMobile";

const STRENGTH = 7;
const springConfig = { stiffness: 300, damping: 20 };

const MagneticButton = ({ children }: { children: ReactNode }) => {
  const { ref, relX, relY, isHovered } = useRelativeMouse<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const lowPerf = useIsLowPerformance();
  const isMobile = useIsMobile(1024);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  if (!reducedMotion && !lowPerf && !isMobile) {
    x.set(isHovered ? relX * STRENGTH : 0);
    y.set(isHovered ? relY * STRENGTH : 0);
  }

  if (reducedMotion || lowPerf || isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div ref={ref} style={{ x: sx, y: sy, display: "inline-block" }}>
      {children}
    </motion.div>
  );
};

export default MagneticButton;
