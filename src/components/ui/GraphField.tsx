import { useEffect, useRef } from "react";

/**
 * Ambient knowledge-graph animation for the hero. Three node kinds stand in for
 * the three context sources in the G-RAG research (graph, vector, analytics);
 * every few seconds a "query" walks a short path across the graph and lights it
 * up, the way a retrieval traversal would. Pauses off-screen and in background
 * tabs, and renders a single still frame for reduced-motion visitors.
 */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: 0 | 1 | 2;
}

const NODE_COUNT = 46;
const LINK_DIST = 0.2; // as a fraction of the larger canvas dimension
const PATH_LEN = 5;
const PATH_MS = 2600;

const readColors = (el: HTMLElement) => {
  const s = getComputedStyle(el);
  return {
    line: s.getPropertyValue("--graph-line").trim() || "rgba(255,255,255,0.08)",
    node: s.getPropertyValue("--graph-node").trim() || "rgba(255,255,255,0.45)",
    accent: s.getPropertyValue("--accent").trim() || "#8ab4ff",
    kinds: [
      s.getPropertyValue("--graph-a").trim() || "#8ab4ff",
      s.getPropertyValue("--graph-b").trim() || "#c4b5fd",
      s.getPropertyValue("--graph-c").trim() || "#6ee7b7",
    ],
  };
};

const GraphField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let colors = readColors(canvas);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let inView = true;
    const pointer = { x: -1, y: -1 };

    // Deterministic seed so the composition looks the same on every load.
    let seed = 7;
    const rand = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: rand(),
      y: rand(),
      vx: (rand() - 0.5) * 0.00012,
      vy: (rand() - 0.5) * 0.00012,
      r: i % 9 === 0 ? 3.2 : 1.6 + rand() * 1.2,
      kind: (i % 3) as 0 | 1 | 2,
    }));

    let path: number[] = [];
    let pathStart = 0;

    const neighbors = (i: number) => {
      const a = nodes[i];
      const max = LINK_DIST * Math.max(w, h);
      return nodes
        .map((b, j) => ({ j, d: Math.hypot((a.x - b.x) * w, (a.y - b.y) * h) }))
        .filter(({ j, d }) => j !== i && d < max)
        .sort((p, q) => p.d - q.d)
        .map(({ j }) => j);
    };

    const newPath = (now: number) => {
      let cur = Math.floor(rand() * nodes.length);
      const p = [cur];
      for (let k = 1; k < PATH_LEN; k++) {
        const next = neighbors(cur).find((n) => !p.includes(n));
        if (next === undefined) break;
        p.push(next);
        cur = next;
      }
      path = p.length > 2 ? p : [];
      pathStart = now;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h);
      const max = LINK_DIST * Math.max(w, h);

      // Edges
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.line;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot((a.x - b.x) * w, (a.y - b.y) * h);
          if (d < max) {
            ctx.moveTo(a.x * w, a.y * h);
            ctx.lineTo(b.x * w, b.y * h);
          }
        }
      }
      ctx.stroke();

      // Active retrieval path
      const t = Math.min((now - pathStart) / PATH_MS, 1);
      if (path.length > 1) {
        const segs = path.length - 1;
        const progress = t * segs;
        const fade = t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1;
        ctx.save();
        ctx.globalAlpha = fade;
        ctx.strokeStyle = colors.accent;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let s = 0; s < segs && s < progress; s++) {
          const a = nodes[path[s]];
          const b = nodes[path[s + 1]];
          const f = Math.min(progress - s, 1);
          ctx.moveTo(a.x * w, a.y * h);
          ctx.lineTo((a.x + (b.x - a.x) * f) * w, (a.y + (b.y - a.y) * f) * h);
        }
        ctx.stroke();
        ctx.restore();
      }

      // Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const idx = path.indexOf(i);
        const lit = idx !== -1 && idx <= t * (path.length - 1) + 0.001 && t < 1;
        ctx.beginPath();
        ctx.fillStyle = lit ? colors.kinds[n.kind] : colors.node;
        ctx.arc(n.x * w, n.y * h, lit ? n.r + 1.6 : n.r, 0, Math.PI * 2);
        ctx.fill();
        if (lit) {
          ctx.beginPath();
          ctx.strokeStyle = colors.kinds[n.kind];
          ctx.globalAlpha = 0.35;
          ctx.arc(n.x * w, n.y * h, n.r + 7, 0, Math.PI * 2);
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      }
    };

    const step = (now: number) => {
      for (const n of nodes) {
        n.x += n.vx * 16;
        n.y += n.vy * 16;
        if (n.x < 0.02 || n.x > 0.98) n.vx *= -1;
        if (n.y < 0.04 || n.y > 0.96) n.vy *= -1;
        if (pointer.x >= 0) {
          const dx = n.x - pointer.x;
          const dy = n.y - pointer.y;
          const d = Math.hypot(dx * w, dy * h);
          if (d < 90 && d > 0.01 && w && h) {
            // Nudge nodes ~0.6px per frame away from the pointer.
            n.x += (dx / d) * 0.6;
            n.y += (dy / d) * 0.6;
          }
        }
      }
      if (now - pathStart > PATH_MS + 900) newPath(now);
      draw(now);
      raf = requestAnimationFrame(step);
    };

    const start = () => {
      if (running || reduced || !inView || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(step);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    newPath(performance.now() - PATH_MS * 0.6);
    draw(performance.now());
    start();

    const ro = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    const mo = new MutationObserver(() => {
      colors = readColors(canvas);
      draw(performance.now());
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (e.clientX - rect.left) / rect.width;
      pointer.y = (e.clientY - rect.top) / rect.height;
    };
    const onLeave = () => {
      pointer.x = -1;
      pointer.y = -1;
    };
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove);
    host?.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="graph-field" aria-hidden="true" />;
};

export default GraphField;
