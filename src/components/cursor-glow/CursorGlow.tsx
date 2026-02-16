import { useRef, useEffect } from "react";
import "./cursor-glow.css";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const glow = glowRef.current;
    if (!glow) return;

    let frameId = 0;
    let latestX = 0;
    let latestY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      if (!frameId) {
        frameId = requestAnimationFrame(() => {
          glow.style.left = `${latestX}px`;
          glow.style.top = `${latestY}px`;
          glow.style.opacity = "1";
          frameId = 0;
        });
      }
    };

    const handleMouseLeave = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return <div ref={glowRef} className="cursor-glow" />;
};

export default CursorGlow;
