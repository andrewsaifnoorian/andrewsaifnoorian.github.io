import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import "./kaggle.css";
import TiltCard from "../tilt-card/TiltCard";
import { useIsLowPerformance } from "../../hooks/usePerformanceTier";
import useIsMobile from "../../hooks/useIsMobile";

interface KaggleCompetition {
  id: number;
  title: string;
  description: string;
  techniques: string[];
  score: string;
  scoreLabel: string;
  rank: string;
  tags: string[];
  colab: string;
  runtime?: string;
  accentHue: number;
}

const competitions: KaggleCompetition[] = [
  {
    id: 1,
    title: "DNA Sequence Classification",
    description:
      "Binary classification of bacterial DNA sequences as virulent or benign using multi-source feature fusion.",
    techniques: [
      "k-mer features (k=3,4,5)",
      "Biological features (CpG, reading frames, homopolymers)",
      "TF-IDF char n-grams (4–7)",
      "LogReg + 5-seed DNN ensemble",
    ],
    score: "0.9873",
    scoreLabel: "AUC",
    rank: "Rank 1 (tied)",
    tags: ["Bioinformatics", "NLP"],
    colab: "",
    runtime: "T4 GPU",
    accentHue: 220,
  },
  {
    id: 2,
    title: "Bacteria Classification",
    description:
      "5-class bacterial species classification from 286-dimensional k-mer count frequency features.",
    techniques: [
      "StandardScaler + class-weight balancing",
      "DNN: Dense(128) → BN → Dropout(0.3) → Dense(64)",
      "Nadam optimizer",
      "EarlyStopping + ReduceLROnPlateau",
    ],
    score: "0.9621",
    scoreLabel: "F1",
    rank: "Rank 1",
    tags: ["Bioinformatics"],
    colab: "",
    runtime: "T4 GPU",
    accentHue: 160,
  },
  {
    id: 3,
    title: "Purchase Intent Classification",
    description:
      "Binary classification of online purchase intent from 17 behavioral e-commerce session features.",
    techniques: [
      "Wide & Deep DNN (512→256→128→64)",
      "93 engineered features (PgVal interactions, frequency encoding)",
      "SGDR cosine warm restarts",
      "Nadam optimizer",
    ],
    score: "0.9927",
    scoreLabel: "Accuracy",
    rank: "Rank 6 of 14",
    tags: ["Tabular", "Business"],
    colab: "",
    runtime: "T4 GPU",
    accentHue: 260,
  },
  {
    id: 4,
    title: "Audio Classification (Phonemes)",
    description:
      "5-class phoneme classification from 256-point log-periodogram spectral features across 50K utterances.",
    techniques: [
      "StandardScaler on full training set",
      "LightGBM (200 trees, num_leaves=63)",
      "Balanced class weights",
    ],
    score: "0.9284",
    scoreLabel: "Accuracy",
    rank: "Rank 8 of 10",
    tags: ["Audio", "Speech"],
    colab: "",
    accentHue: 30,
  },
  {
    id: 5,
    title: "Diamond Price Prediction",
    description:
      "Regression task predicting prices of 40K diamonds from 9 physical and quality characteristics.",
    techniques: [
      "RidgeCV with log-target transform",
      "Degree-2 polynomial feature expansion",
      "One-hot categorical encoding",
      "Quantile-matching post-processing",
    ],
    score: "603.56",
    scoreLabel: "MAE",
    rank: "",
    tags: ["Regression", "Tabular"],
    colab: "",
    accentHue: 190,
  },
  {
    id: 6,
    title: "Collaborative Filtering (Netflix)",
    description:
      "Movie rating prediction on a 128K-user × 380-movie sparse matrix using matrix factorization.",
    techniques: [
      "Truncated SVD (k=5 latent dimensions, 10 iterations)",
      "User-bias imputation",
      "Optimized rating threshold rounding",
    ],
    score: "0.4200",
    scoreLabel: "Accuracy",
    rank: "Rank 6 of 9",
    tags: ["Recommender Systems"],
    colab: "",
    accentHue: 0,
  },
  {
    id: 7,
    title: "Stellar Classification",
    description:
      "Multi-class classification of astronomical objects (stars, galaxies, quasars) from spectroscopic survey data.",
    techniques: [
      "Linear Discriminant Analysis (LDA)",
      "Custom redshift-split model",
    ],
    score: "—",
    scoreLabel: "",
    rank: "",
    tags: ["Astronomy", "Tabular"],
    colab: "",
    accentHue: 280,
  },
];

// ── Animation variants ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as const;

const panelVariants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: EASE },
  },
};

const scoreVariants = {
  initial: { opacity: 0, scale: 0.85 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 120, damping: 14, delay: 0.15 },
  },
};

const techVariants = (i: number) => ({
  initial: { opacity: 0, x: -12 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: 0.2 + i * 0.07, ease: EASE },
  },
});

// ── Fallback grid (mobile / low-perf) ──────────────────────────────────────
const KaggleCard = ({ competition }: { competition: KaggleCompetition }) => {
  const isRank1 = competition.rank.startsWith("Rank 1");

  return (
    <TiltCard>
      <article className={`kaggle_item${isRank1 ? " kaggle_item--highlight" : ""}`}>
        <div className="kaggle_item-header">
          {competition.score !== "—" ? (
            <div className="kaggle_item-score">
              <span className="kaggle_item-score-value">{competition.score}</span>
              {competition.scoreLabel && (
                <span className="kaggle_item-score-label">{competition.scoreLabel}</span>
              )}
            </div>
          ) : (
            <div className="kaggle_item-score">
              <span className="kaggle_item-score-value kaggle_item-score-value--placeholder">—</span>
            </div>
          )}
          {competition.rank && (
            <span className={`kaggle_item-rank${isRank1 ? " kaggle_item-rank--gold" : ""}`}>
              {competition.rank}
            </span>
          )}
        </div>

        <h3 className="kaggle_item-title">{competition.title}</h3>
        <p className="kaggle_item-desc">{competition.description}</p>

        <ul className="kaggle_item-techniques">
          {competition.techniques.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>

        <div className="kaggle_item-footer">
          <div className="kaggle_item-tags">
            {competition.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
            {competition.runtime && (
              <span className="kaggle_item-tags__runtime">{competition.runtime}</span>
            )}
          </div>
          {competition.colab && (
            <a
              href={competition.colab}
              className="btn"
              target="_blank"
              rel="noreferrer"
            >
              Notebook
            </a>
          )}
        </div>
      </article>
    </TiltCard>
  );
};

const KaggleFallbackGrid = () => (
  <section id="kaggle">
    <h5>Johns Hopkins University · ML Engineering</h5>
    <h2>Kaggle Competitions</h2>
    <div className="container kaggle_container">
      {competitions.map((comp) => (
        <KaggleCard key={comp.id} competition={comp} />
      ))}
    </div>
  </section>
);

// ── Intro panel ────────────────────────────────────────────────────────────
const KaggleIntroPanel = () => (
  <motion.div
    className="kgl-panel kgl-panel--intro"
    style={{ "--kgl-accent-hue": 220 } as React.CSSProperties}
    variants={panelVariants}
    initial="initial"
    animate="animate"
    exit="exit"
  >
    <div className="kgl-bg-wash" />
    <div className="kgl-intro-inner">
      <p className="kgl-eyebrow">Johns Hopkins University · ML Engineering</p>
      <h2 className="kgl-intro-heading">Kaggle<br />Competitions</h2>
      <p className="kgl-intro-body">
        Seven machine learning competitions completed as part of the Johns
        Hopkins ML Engineering program. The projects range from DNA sequence
        classification and audio phoneme detection to diamond price prediction
        and collaborative filtering.
      </p>
      <motion.p
        className="kgl-scroll-hint"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Scroll to explore ↓
      </motion.p>
    </div>
  </motion.div>
);

// ── Showcase panel ─────────────────────────────────────────────────────────
const KagglePanel = ({
  comp,
  index,
  total,
}: {
  comp: KaggleCompetition;
  index: number;
  total: number;
}) => {
  const isRank1 = comp.rank.startsWith("Rank 1");

  return (
    <motion.div
      key={comp.id}
      className="kgl-panel"
      style={{ "--kgl-accent-hue": comp.accentHue } as React.CSSProperties}
      variants={panelVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Background radial wash */}
      <div className="kgl-bg-wash" />

      <div className="kgl-panel-inner">
        {/* Left column */}
        <div className="kgl-left">
          <p className="kgl-eyebrow">Johns Hopkins · ML Engineering</p>
          <h2 className="kgl-title">{comp.title}</h2>
          <p className="kgl-desc">{comp.description}</p>

          <ul className="kgl-techniques">
            {comp.techniques.map((t, i) => (
              <motion.li key={t} {...techVariants(i)}>
                {t}
              </motion.li>
            ))}
          </ul>

          <div className="kgl-footer">
            <div className="kgl-tags">
              {comp.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
              {comp.runtime && (
                <span className="kgl-tags__runtime">{comp.runtime}</span>
              )}
            </div>
            {comp.colab && (
              <a
                href={comp.colab}
                className="btn"
                target="_blank"
                rel="noreferrer"
              >
                Notebook
              </a>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="kgl-right">
          {comp.score !== "—" ? (
            <motion.div className="kgl-score-block" variants={scoreVariants}>
              <span className="kgl-score-value">{comp.score}</span>
              {comp.scoreLabel && (
                <span className="kgl-score-label">{comp.scoreLabel}</span>
              )}
            </motion.div>
          ) : (
            <motion.div className="kgl-score-block" variants={scoreVariants}>
              <span className="kgl-score-value kgl-score-value--placeholder">—</span>
            </motion.div>
          )}
          {comp.rank && (
            <span className={`kgl-rank${isRank1 ? " kgl-rank--gold" : ""}`}>
              {comp.rank}
            </span>
          )}
          <span className="kgl-counter">
            {index + 1} / {total}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

// ── Sticky scroll showcase ─────────────────────────────────────────────────
const TOTAL_PANELS = competitions.length + 1; // 1 intro + 7 competitions
const STEP_MS = 500; // ms between sequential panel steps (matches enter animation)

const KaggleShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const outerRef = useRef<HTMLDivElement>(null);

  // Refs so the step closure always reads the latest values
  const activeIndexRef = useRef(0);
  const targetIndexRef = useRef(0);
  const stepTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suppressRef = useRef(false); // ignore scroll events during dot-click smooth scroll

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // stepRef holds the latest version of the step function to avoid stale closures
  const stepRef = useRef<() => void>(() => {});
  stepRef.current = () => {
    stepTimerRef.current = null;
    const current = activeIndexRef.current;
    const target = targetIndexRef.current;
    if (current === target) return;

    // If the section has scrolled out of view, snap immediately and stop
    if (outerRef.current) {
      const rect = outerRef.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
        activeIndexRef.current = target;
        setActiveIndex(target);
        return;
      }
    }

    const next = current < target ? current + 1 : current - 1;
    activeIndexRef.current = next;
    setActiveIndex(next);

    if (next !== target) {
      stepTimerRef.current = setTimeout(() => stepRef.current(), STEP_MS);
    }
  };

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (suppressRef.current) return;
    const idx = Math.min(Math.floor(v * TOTAL_PANELS), TOTAL_PANELS - 1);
    targetIndexRef.current = idx;
    // Only start a new step sequence if none is running
    if (stepTimerRef.current === null && activeIndexRef.current !== idx) {
      stepRef.current();
    }
  });

  useEffect(() => {
    return () => {
      if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
    };
  }, []);

  const scrollToPanel = (i: number) => {
    if (!outerRef.current) return;

    // Cancel any ongoing sequential stepping and jump directly
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    targetIndexRef.current = i;
    activeIndexRef.current = i;
    setActiveIndex(i);

    // Suppress scroll-driven updates while smooth scroll is in flight
    suppressRef.current = true;
    const rect = outerRef.current.getBoundingClientRect();
    const totalHeight = outerRef.current.offsetHeight - window.innerHeight;
    const targetScroll =
      window.scrollY +
      rect.top +
      (i / TOTAL_PANELS) * totalHeight +
      totalHeight / TOTAL_PANELS / 2;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
    setTimeout(() => { suppressRef.current = false; }, 800);
  };

  return (
    <section id="kaggle">
      <div className="kgl-outer" ref={outerRef}>
        <div className="kgl-sticky">
          {/* mode="sync": exit and enter animate simultaneously — no blank gap */}
          <AnimatePresence mode="sync">
            {activeIndex === 0 ? (
              <KaggleIntroPanel key="intro" />
            ) : (
              <KagglePanel
                key={competitions[activeIndex - 1].id}
                comp={competitions[activeIndex - 1]}
                index={activeIndex - 1}
                total={competitions.length}
              />
            )}
          </AnimatePresence>

          {/* Progress dots — first dot = intro, rest = competitions */}
          <nav className="kgl-dots" aria-label="Kaggle section progress">
            {Array.from({ length: TOTAL_PANELS }, (_, i) => (
              <button
                key={i}
                className={`kgl-dot${i === activeIndex ? " kgl-dot--active" : ""}${i === 0 ? " kgl-dot--intro" : ""}`}
                aria-label={i === 0 ? "Introduction" : `Competition ${i}: ${competitions[i - 1].title}`}
                onClick={() => scrollToPanel(i)}
              />
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
};

// ── Export ─────────────────────────────────────────────────────────────────
const Kaggle = () => {
  const lowPerf = useIsLowPerformance();
  const isMobile = useIsMobile(1024);

  if (isMobile || lowPerf) return <KaggleFallbackGrid />;
  return <KaggleShowcase />;
};

export default Kaggle;
