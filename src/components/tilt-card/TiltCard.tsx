import { type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import useRelativeMouse from "../../hooks/useRelativeMouse";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";
import useIsMobile from "../../hooks/useIsMobile";

const MAX_TILT = 8;
const springConfig = { stiffness: 200, damping: 20 };

const TiltCard = ({ children }: { children: ReactNode }) => {
  const { ref, relX, relY, isHovered } = useRelativeMouse<HTMLDivElement>();
  const reducedMotion = usePrefersReducedMotion();
  const isMobile = useIsMobile(1024);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const sRotateX = useSpring(rotateX, springConfig);
  const sRotateY = useSpring(rotateY, springConfig);

  if (!reducedMotion && !isMobile) {
    rotateX.set(isHovered ? -relY * MAX_TILT : 0);
    rotateY.set(isHovered ? relX * MAX_TILT : 0);
  }

  if (reducedMotion || isMobile) {
    return <>{children}</>;
  }

  return (
    <motion.div
      ref={ref}
      style={{
        perspective: 800,
        rotateX: sRotateX,
        rotateY: sRotateY,
        transformStyle: "preserve-3d",
      }}
    >
      {children}
    </motion.div>
  );
};

export default TiltCard;
