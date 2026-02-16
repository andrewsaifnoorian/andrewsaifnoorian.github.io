import { useRef } from "react";
import { useInView } from "framer-motion";
import useTextScramble from "../../hooks/useTextScramble";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

interface ScrambleTextProps {
  text: string;
  as?: "h2" | "h3" | "h5";
  className?: string;
}

const ScrambleText = ({ text, as: Tag = "h2", className }: ScrambleTextProps) => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reducedMotion = usePrefersReducedMotion();
  const display = useTextScramble(text, inView, reducedMotion);

  return (
    <Tag ref={ref as React.RefObject<never>} className={className}>
      {display}
    </Tag>
  );
};

export default ScrambleText;
