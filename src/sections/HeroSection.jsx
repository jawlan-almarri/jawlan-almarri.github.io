import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, Linkedin } from "lucide-react";

import { Button } from "@/components/ui/button";
import { HERO, IDENTITY, LINKS } from "@/data/portfolioData";
import { revealUp, stagger } from "@/motion/variants";

/** Mono-font kicker, e.g. "SOFTWARE DEVELOPER · CYBERSECURITY" with the first item lit. */
function RoleEyebrow({ roles }) {
  return (
    <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
      {roles.map((role, i) => (
        <React.Fragment key={role}>
          {i > 0 && <span className="mx-2 opacity-40">·</span>}
          <span className={i === 0 ? "text-cyan-600 dark:text-cyan-400" : undefined}>
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
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-9">
        {/* Availability badge */}
        <motion.div variants={revealUp}>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-300">
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
            className="h-11 gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-6 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-200 hover:opacity-90 hover:shadow-cyan-500/35"
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
          <div className="flex flex-col items-center gap-2 text-muted-foreground/50 sm:items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em]">Scroll</span>
            <span
              aria-hidden="true"
              className="h-8 w-px animate-[float-y_2.6s_ease-in-out_infinite] bg-gradient-to-b from-cyan-400/70 to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
