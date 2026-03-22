# Portfolio Memory

## Project Stack
- React 19 + TypeScript + Vite + Framer Motion
- CSS: CSS variables only, no CSS-in-JS, no Tailwind
- Icons: react-icons v5
- Build: `npm run build` → dist/; deploy: `npm run deploy` (gh-pages)

## Key Design Tokens (index.css)
- `--color-bg: #0e0e11` (dark bg)
- `--color-bg-variant: #020e80` (blue-dark card bg)
- `--color-primary: #ffffff`
- `--color-primary-variant: rgba(17, 0, 252, 0.932)` (deep blue)
- `--color-light: rgba(255, 255, 255, 0.6)` (muted text)
- `--gradient-accent: linear-gradient(135deg, #1100fc, #4facfe, #00f2fe)`
- `--container-width-lg: 75%` / `--container-width-md: 86%` / `--container-width-sm: 90%`
- Section margin-top: 8rem (desktop), 6rem (tablet)

## Section Pattern
Every homepage section follows:
```tsx
<section id="sectionname">
  <h5>subtitle</h5>
  <ScrambleText text="Heading" />
  <AnimatedSection>
    <div className="container sectionname_container">
      {/* content */}
    </div>
  </AnimatedSection>
</section>
```

## Card Pattern
Cards use: `background: var(--color-bg-variant)`, `border: 1px solid rgba(255,255,255,0.08)`, `border-radius: 1rem`
Hover: `border-color: rgba(79, 172, 254, 0.2)`, `box-shadow: 0 0 20px rgba(79,172,254,0.1)`
Tech pills: `background: rgba(255,255,255,0.06)`, `border: 1px solid rgba(255,255,255,0.1)`, `border-radius: 2rem`, `font-size: 0.65rem`

## Homepage Composition (App.tsx)
Order: About → Kaggle → Projects → Nav → Experience → Services → Testimonials → Contact → Footer

## Kaggle Section
- File: `src/components/kaggle/Kaggle.tsx` + `kaggle.css`
- 7 JHU ML competitions with per-competition `accentHue` (HSL hue int)
- Desktop (>1024px, full perf): Apple-style sticky scroll showcase
  - `.kgl-outer { height: 700vh }` / `.kgl-sticky { position: sticky; top: 0; height: 100vh }`
  - `useScroll` + `useMotionValueEvent` maps scrollYProgress → activeIndex
  - `AnimatePresence mode="wait"` cross-fades panels; scoreVariants spring animation
  - Right-side `.kgl-dots` nav with click-to-scroll
  - `section#kaggle { margin-top: 0 }` overrides global 8rem margin
- Mobile/lowPerf fallback: `KaggleFallbackGrid` — original card grid (all `.kaggle_item*` classes preserved)
- Colab links: currently empty strings — user fills in before deploying

## Kaggle Competition Scores (from notebooks)
| Competition | Score | Metric | Rank |
|---|---|---|---|
| DNA Sequence Classification | 0.9873 | AUC | 1 (tied) |
| Bacteria Classification | 0.9621 | F1 | 1 |
| Purchase Intent (Shop) | 0.9927 | Accuracy | 6/14 |
| Audio (Phonemes) | 0.9284 | Accuracy | 8/10 |
| Diamond Price | 603.56 | Local MAE | — |
| Netflix CF | 0.4200 | Accuracy | 6/9 |
| Stellar Classification | — | — | — (no notebook) |

## Notable Patterns
- `useIsLowPerformance()` hook — disable heavy animations on weak devices
- `TiltCard` wrapper — 3D tilt on desktop only (skips mobile + lowPerf)
- `AnimatedSection` — fade+slide in on scroll (uses framer-motion `useInView`)
- `ScrambleText` — scramble animation on heading text (skips lowPerf)
- Nav only tracks: about, project, experience, contact
