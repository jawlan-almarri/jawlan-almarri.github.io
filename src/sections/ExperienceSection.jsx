import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { EXPERIENCE, SECTIONS } from "@/data/portfolioData";
import { useCardInteraction } from "@/motion/variants";

/** One timeline entry: node + tilt/spotlight card. Split out so the hook has its own instance per role. */
function ExperienceCard({ role }) {
  const { rotateX, rotateY, spotX, spotY, onMouseMove, onMouseLeave } = useCardInteraction({
    tilt: 3,
  });

  return (
    <Reveal className="relative pl-14">
      {/* Timeline node */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-violet-500/5"
      >
        <Briefcase className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
      </div>

      <div className="[perspective:1400px]">
        <motion.div
          style={{ rotateX, rotateY, "--spot-x": spotX, "--spot-y": spotY }}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
        >
          <Card className="spotlight card-equal surface surface-hover surface-pad group shadow-none">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                {role.logo && (
                  <div className="flex h-14 w-20 shrink-0 items-center justify-center rounded-xl bg-white p-2.5 shadow-md ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                    <img
                      src={role.logo}
                      alt={role.logoAlt ?? `${role.org} logo`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="min-w-0">
                  <h3 className="text-base font-bold leading-snug tracking-tight">{role.role}</h3>
                  <p className="mt-0.5 text-sm font-medium text-cyan-600 dark:text-cyan-400/80">
                    {role.org}
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 font-mono text-[11px] tracking-tight">
                  <Calendar className="h-3 w-3 opacity-60" />
                  {role.period}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 opacity-70" />
                  <span>{role.location}</span>
                </div>
              </div>
            </div>

            <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-muted-foreground">
              {role.bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>
      </div>
    </Reveal>
  );
}

export function ExperienceSection() {
  return (
    <SectionShell id="experience" {...SECTIONS.experience} icon={<Briefcase className="h-5 w-5" />}>
      <RevealGroup amount={0.15} className="relative space-y-6">
        {/* Timeline rail */}
        <div
          aria-hidden="true"
          className="absolute left-5 top-5 bottom-4 w-px bg-gradient-to-b from-cyan-500/50 via-indigo-500/20 to-transparent"
        />

        {EXPERIENCE.map((role) => (
          <ExperienceCard key={`${role.org}-${role.period}`} role={role} />
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
