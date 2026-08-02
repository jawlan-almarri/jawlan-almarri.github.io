import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { TerminalCard } from "@/components/common/TerminalCard";
import { HERO, HERO_TERMINAL, IDENTITY, LINKS } from "@/data/portfolioData";
import { revealUp, stagger } from "@/motion/variants";

/**
 * Mono-font kicker, e.g. "SOFTWARE DEVELOPER · CYBERSECURITY". The first role
 * is the headline discipline — lit and weighted — while the rest read as
 * supporting specialisations. They keep `--muted-foreground` rather than a
 * dimmer tint so the smaller size never costs contrast.
 */
function RoleEyebrow({ roles }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
      {roles.map((role, i) => (
        <React.Fragment key={role}>
          {i > 0 && <span className="mx-2 opacity-40">·</span>}
          <span
            className={
              i === 0
                ? // cyan-600 on white is only 3.68:1 — below AA at this size,
                  // which would make the emphasised role the *least* legible
                  // text in the kicker. cyan-700 measures 5.37:1.
                  "font-semibold text-cyan-700 dark:text-cyan-400"
                : "text-[0.92em]"
            }
          >
            {role}
          </span>
        </React.Fragment>
      ))}
    </p>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative mx-auto max-w-6xl px-4 pb-20 pt-10 sm:pb-28 sm:pt-16"
    >
      {/* Two columns from `lg`: copy on the left, decorative shell on the
          right. Below that the shell is dropped rather than stacked — it is
          ornament, and stacking it would push the CTAs below the fold.
          Variants still propagate from here through the plain column div. */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]"
      >
      <div className="space-y-9">
        {/* Availability badge */}
        <motion.div variants={revealUp}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            {HERO.availability}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={revealUp} className="space-y-4">
          <RoleEyebrow roles={IDENTITY.roles} />
          <div className="space-y-1">
            <p className="text-base font-medium text-muted-foreground">{HERO.greeting}</p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              <span className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-white dark:via-cyan-50 dark:to-white/70">
                {IDENTITY.name}
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          variants={revealUp}
          className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {HERO.summary}
        </motion.p>

        {/* Calls to action */}
        <motion.div variants={revealUp} className="flex flex-wrap gap-3">
          <Button
            asChild
            className="h-11 gap-2 rounded-xl bg-gradient-to-r from-cyan-700 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:opacity-90 hover:shadow-cyan-500/35"
          >
            <a
              href={`${import.meta.env.BASE_URL}${LINKS.cv}`}
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="h-4 w-4" />
              Download CV
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-11 gap-2 rounded-xl border-border bg-background/60 px-6 backdrop-blur transition-all duration-200 hover:bg-muted"
          >
            <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
              <Linkedin className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4 opacity-60" />
            </a>
          </Button>
        </motion.div>

        {/* Scroll cue */}
        <motion.div variants={revealUp} className="pointer-events-none flex justify-center pt-6 sm:justify-start">
          {/* Any alpha here fails AA at 10px in light mode (/75 measured
              2.96:1 on white). Full --muted-foreground is already the
              WCAG-tuned token: 4.74:1 light, 8.37:1 dark. */}
          <div className="flex flex-col items-center gap-2 text-muted-foreground sm:items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <span
              aria-hidden="true"
              className="h-8 w-px animate-[float-y_2.6s_ease-in-out_infinite] bg-gradient-to-b from-cyan-400/70 to-transparent"
            />
          </div>
        </motion.div>
      </div>

        <motion.div variants={revealUp} className="hidden lg:block">
          <TerminalCard lines={HERO_TERMINAL} />
        </motion.div>
      </motion.div>
    </section>
  );
}
