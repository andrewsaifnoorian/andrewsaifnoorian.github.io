import { useIsLowPerformance } from "../../hooks/usePerformanceTier";
import "./noise-overlay.css";

const NoiseOverlay = () => {
  const lowPerf = useIsLowPerformance();
  if (lowPerf) return null;

  return (
    <div className="noise-overlay">
      <svg width="100%" height="100%">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
};

export default NoiseOverlay;
