import React from "react";
import { GraduationCap, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/common/Reveal";
import { EDUCATION, SECTIONS } from "@/data/portfolioData";

export function EducationSection() {
  return (
    <SectionShell id="education" {...SECTIONS.education} icon={<GraduationCap className="h-5 w-5" />}>
      <Reveal
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
      >
        <Card className="surface surface-pad shadow-none">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-lg font-semibold tracking-tight">{EDUCATION.degree}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/90">{EDUCATION.school}</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-medium">
                {EDUCATION.date}
              </span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 opacity-80" />
                <span>{EDUCATION.location}</span>
              </div>
            </div>
          </div>
        </Card>
      </Reveal>
    </SectionShell>
  );
}
