import React from "react";
import { Medal, Star, Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { ACHIEVEMENTS, SECTIONS } from "@/data/portfolioData";

/**
 * Visual treatment per achievement tier.
 * Driven by the `tier` field in data — no title-string parsing at render time,
 * so adding a new tier is a data + lookup change, nothing more.
 */
const TIERS = {
  gold: { Icon: Trophy, icon: "text-yellow-400", chip: "border-yellow-500/20 bg-yellow-500/10" },
  rank: { Icon: Medal, icon: "text-cyan-400", chip: "border-cyan-500/20 bg-cyan-500/10" },
  default: { Icon: Star, icon: "text-muted-foreground", chip: "border-white/10 bg-white/5" },
};

export function AchievementsSection() {
  return (
    <SectionShell id="achievements" {...SECTIONS.achievements} icon={<Trophy className="h-5 w-5" />}>
      <RevealGroup className="grid grid-cards items-stretch gap-5 md:grid-cols-2">
        {ACHIEVEMENTS.map((a) => {
          const { Icon, icon, chip } = TIERS[a.tier] ?? TIERS.default;
          return (
            <Reveal key={`${a.title}-${a.year}`} className="h-full">
              <Card className="card-equal surface surface-hover surface-pad shadow-none">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${chip}`}
                  >
                    <Icon className={`h-5 w-5 ${icon}`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold leading-snug tracking-tight">{a.title}</h3>
                      <Tag className="shrink-0 tabular-nums">{a.year}</Tag>
                    </div>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          );
        })}
      </RevealGroup>
    </SectionShell>
  );
}
