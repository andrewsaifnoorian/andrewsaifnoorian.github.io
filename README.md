<div align="center">

# andrewsaifnoorian.github.io

**My personal portfolio — built to feel like an Apple product page.**

[View Live](https://andrewsaifnoorian.github.io) &nbsp;&middot;&nbsp; [LinkedIn](https://www.linkedin.com/in/andrewsaifnoorian/)

</div>

---

## Highlights

| Feature | Details |
|---------|---------|
| **Scroll-Pinned Hero** | Sticky hero fades and scales out as you scroll, content slides over it |
| **Horizontal Project Scroll** | Projects scroll horizontally on desktop, vertical grid on mobile |
| **Counting Stats** | Numbers animate from 0 when scrolled into view |
| **Word-by-Word Reveal** | Bio text reveals progressively as you scroll through it |
| **Typewriter Hero** | Name types out letter by letter on load |
| **Dark / Light Mode** | Toggle with smooth transitions across the entire site |
| **Cursor Glow** | Subtle radial glow follows the mouse on desktop |
| **Scroll Progress Bar** | Thin gradient bar at the top tracks your scroll position |
| **Scroll-Tracking Nav** | Bottom nav highlights the active section automatically |
| **Page Transitions** | Animated route transitions between home and resume |

---

## Tech Stack

```
React 19          TypeScript          Vite 7
Framer Motion 12  React Router 7      GitHub Pages
```

**Zero external animation libraries** — all scroll effects use Framer Motion's `useScroll` and `useTransform` hooks for GPU-accelerated, scroll-driven animations.

---

## Quickstart

```bash
# install
npm install

# dev server
npm run dev

# type-check
npx tsc --noEmit

# build + deploy to GitHub Pages
npm run deploy
```

---

## Project Structure

```
src/
├── components/
│   ├── about/          # Hero + bio + stats (scroll-pinned, counting, word reveal)
│   ├── project/        # Horizontal scroll gallery with hover overlays
│   ├── experience/     # Skills & tech stack
│   ├── contact/        # Contact form via EmailJS
│   ├── nav/            # Scroll-tracking bottom nav bar
│   ├── testimonials/   # Swiper carousel
│   ├── services/       # What I offer
│   ├── resume/         # Resume page
│   ├── animated-section/  # Reusable fade-in-on-scroll wrapper
│   ├── cursor-glow/    # Mouse-following radial glow
│   ├── theme-toggle/   # Dark/light mode switch
│   ├── back-to-top/    # Floating scroll-to-top button
│   └── footer/         # Links & socials
├── assets/             # Images & textures
├── App.tsx             # Routes & layout
└── index.css           # Global styles & CSS variables
```

---

<div align="center">

Built by **Andrew Saifnoorian**

</div>
