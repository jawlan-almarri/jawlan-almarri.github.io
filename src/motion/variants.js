import { useMotionValue, useReducedMotion } from "framer-motion";

export const revealUp = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09 } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5 } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

/**
 * Pointer-driven tilt + spotlight for premium card hovers.
 *
 * One hook drives both effects off a single onMouseMove so call sites don't
 * juggle two handlers: `rotateX`/`rotateY` feed a motion.div's `style` for a
 * subtle 3D tilt, and `spotX`/`spotY` feed CSS custom properties (`--spot-x`,
 * `--spot-y`) consumed by the `.spotlight` utility in index.css.
 *
 * No-ops under `prefers-reduced-motion` — rotation stays at rest and the
 * spotlight position freezes centered, so reduced-motion users still get the
 * static card with no half-animated state.
 */
export function useCardInteraction({ tilt = 6 } = {}) {
  const prefersReducedMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const spotX = useMotionValue("50%");
  const spotY = useMotionValue("50%");

  function onMouseMove(event) {
    if (prefersReducedMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateY.set((px - 0.5) * tilt * 2);
    rotateX.set(-(py - 0.5) * tilt * 2);
    spotX.set(`${px * 100}%`);
    spotY.set(`${py * 100}%`);
  }

  function onMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return { rotateX, rotateY, spotX, spotY, onMouseMove, onMouseLeave };
}
