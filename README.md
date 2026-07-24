# Jawlan Almarri — Glassmorphism Cyber Portfolio

Built with **React + Vite + TailwindCSS + Framer Motion**.

## Features
- Glassmorphism UI (Apple-like clean look)
- Animated cyber background (Canvas particles + links + grid overlay)
- Hamburger menu with dropdown sections (desktop + mobile)
- Dark/Light toggle (persists via localStorage)
- Scroll-spy highlighting the active section while scrolling
- Projects cards with cover images + hover interactions
- Reveal-on-scroll animations + subtle parallax in the hero

## Run locally
```bash
npm install
npm run dev
```

## Customize content

All content (text + links + project cards + publications) lives in:
- `src/data/portfolioData.js`
  - `HERO` — intro, tagline badge, and the credibility stat tiles
  - `EXPERIENCE` — roles (most recent first)
  - `PUBLICATIONS` — peer-reviewed papers (author name is highlighted automatically)
  - `CERTIFICATIONS`, `SKILLS`, `PROJECTS`, `ACTIVITIES`, `ACHIEVEMENTS`

UI is split into small components:
- `src/app/App.jsx` (composition root)
- `src/sections/*` (page sections)
- `src/components/*` (reusable UI)

### CV download button
- Replace the placeholder file in `public/Jawlan_Almarri_CV.pdf` with your real CV PDF.

### Links
- Replace the placeholder `href="#"` for LinkedIn with your real profile URL.
- Replace the email placeholder in the Contact section.

### Project cover images
- Cover images are stored in `src/assets/projects/`
- Replace the SVGs with your real images (PNG/JPG/SVG) and update the imports in `src/data/portfolioData.js`.

## Notes
- Import alias: you can now use `@/` to import from `src/` (configured in `vite.config.js`).

## Build for production
```bash
npm run build
npm run preview
```
