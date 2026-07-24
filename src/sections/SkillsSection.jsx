import React from "react";
import { Boxes, Code2, LayoutGrid, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { SECTIONS, SKILLS } from "@/data/portfolioData";

/** Per-category icon, accent, chip tone, and grid span for the bento layout. */
const CATEGORY_META = {
  languages: {
    icon: Code2,
    accent: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    tone: "cyan",
    span: "sm:col-span-2",
  },
  frameworks: {
    icon: Boxes,
    accent: "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    tone: "indigo",
    span: "sm:col-span-1",
  },
  "frontend-data": {
    icon: LayoutGrid,
    accent: "border-cyan-500/20 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    tone: "cyan",
    span: "sm:col-span-1",
  },
  interpersonal: {
    icon: Users,
    accent: "border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    tone: "indigo",
    span: "sm:col-span-2",
  },
};

/** One bento tile: category icon/title + its skill chips. */
function SkillTile({ category }) {
  const meta = CATEGORY_META[category.id] ?? CATEGORY_META.languages;
  const Icon = meta.icon;

  return (
    <Card className="card-equal surface surface-hover surface-pad shadow-none">
      <div className="mb-5 flex items-center gap-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${meta.accent}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h3 className="text-sm font-bold tracking-tight">{category.title}</h3>
          <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
            {category.items.length} skills
          </p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.items.map((skill) => (
          <Tag key={skill} tone={meta.tone}>
            {skill}
          </Tag>
        ))}
      </div>
    </Card>
  );
}

export function SkillsSection() {
  return (
    <SectionShell id="skills" {...SECTIONS.skills} icon={<Code2 className="h-5 w-5" />}>
      <RevealGroup className="grid grid-cards items-stretch gap-5 sm:grid-cols-2">
        {SKILLS.map((category) => (
          <Reveal
            key={category.id}
            className={`h-full ${CATEGORY_META[category.id]?.span ?? ""}`}
          >
            <SkillTile category={category} />
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
