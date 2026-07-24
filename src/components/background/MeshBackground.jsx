import React from "react";
import { motion } from "framer-motion";

/**
 * The site's single background system: a layered, slow-drifting gradient
 * mesh plus a fine grain texture.
 *
 * Consolidates what used to be three separate, overlapping background
 * layers (body CSS radial-gradients, a `GradientBlobs` parallax layer, and a
 * canvas particle-link field) into one. No canvas, no per-frame JS loop —
 * everything here is GPU-friendly transforms/opacity, and the CSS drift
 * keyframes are automatically neutralized by the global
 * `prefers-reduced-motion` rule in index.css.
 *
 * `y1`/`y2` are scroll-linked motion values from `useScroll`/`useTransform`
 * in App.jsx, giving two of the three blobs a subtle parallax as the page scrolls.
 */
export function MeshBackground({ y1, y2 }) {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Cyan blob — top center, scroll-parallax */}
      <motion.div
        style={{ y: y1 }}
        className="absolute -top-32 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/30 via-sky-500/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Indigo blob — left mid, scroll-parallax */}
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[38vh] -left-40 h-[440px] w-[440px] rounded-full bg-gradient-to-br from-indigo-500/25 via-violet-500/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Violet blob — right mid, gentle CSS drift (independent of scroll) */}
      <div
        className="absolute top-[58vh] -right-32 h-[480px] w-[480px] animate-[mesh-drift_26s_ease-in-out_infinite] rounded-full bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Fine grain texture for tactile depth */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
