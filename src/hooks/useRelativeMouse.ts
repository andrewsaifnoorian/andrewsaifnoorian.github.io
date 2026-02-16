import { useRef, useState, useEffect, useCallback } from "react";

interface RelativeMouse {
  relX: number;
  relY: number;
  isHovered: boolean;
}

const useRelativeMouse = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [state, setState] = useState<RelativeMouse>({
    relX: 0,
    relY: 0,
    isHovered: false,
  });
  const raf = useRef(0);

  const handleMove = useCallback((e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setState({ relX: x, relY: y, isHovered: true });
    });
  }, []);

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(raf.current);
    setState({ relX: 0, relY: 0, isHovered: false });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf.current);
    };
  }, [handleMove, handleLeave]);

  return { ref, ...state };
};

export default useRelativeMouse;
