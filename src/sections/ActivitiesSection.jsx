import React from "react";
import { Trophy } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { ACTIVITIES, SECTIONS } from "@/data/portfolioData";

export function ActivitiesSection() {
  return (
    <SectionShell id="activities" {...SECTIONS.activities} icon={<Trophy className="h-5 w-5" />}>
      <RevealGroup className="grid grid-cards items-stretch gap-5 lg:grid-cols-2">
        {ACTIVITIES.map((a) => (
          <Reveal key={`${a.title}-${a.year}`} className="h-full">
            <Card className="card-equal surface surface-hover surface-pad shadow-none">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-base font-semibold tracking-tight">{a.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {a.bullets.map((b) => (
                      <li key={b} className="flex gap-2">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Tag className="shrink-0">{a.year}</Tag>
              </div>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
