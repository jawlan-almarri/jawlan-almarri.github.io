import React from "react";
import { cn } from "@/lib/utils";

/**
 * Tag — the single chip/pill primitive used across the site.
 *
 * Centralising it keeps skill chips, publication highlights, project tags, and
 * metadata badges visually consistent, and makes a palette change a one-line edit.
 *
 * Props
 *   tone  "cyan" | "indigo" | "neutral" | "overlay"   (default "neutral")
 *   size  "sm" | "md"                                  (default "md")
 */
const TONES = {
  cyan:
    "border-cyan-500/25 bg-cyan-500/10 text-cyan-700 hover:border-cyan-500/40 hover:bg-cyan-500/15 dark:text-cyan-200",
  indigo:
    "border-indigo-500/25 bg-indigo-500/10 text-indigo-700 hover:border-indigo-500/40 hover:bg-indigo-500/15 dark:text-indigo-200",
  neutral: "border-border bg-muted text-foreground/80",
  // For placing on top of imagery (dark, translucent, legible).
  overlay: "border-white/15 bg-black/35 text-white/90 backdrop-blur",
};

const SIZES = {
  sm: "px-2.5 py-0.5 text-[11px]",
  md: "px-3 py-1 text-xs",
};

export function Tag({ children, tone = "neutral", size = "md", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-medium leading-none transition-colors",
        TONES[tone] ?? TONES.neutral,
        SIZES[size] ?? SIZES.md,
        className
      )}
    >
      {children}
    </span>
  );
}
