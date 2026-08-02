import React from "react";
import { Sparkles } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { CardRail, RAIL_ITEM_CLASS } from "@/components/common/CardRail";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS, SECTIONS } from "@/data/portfolioData";

export function ProjectsSection() {
  // Featured leads the rail rather than spanning a grid row — every slide is
  // the same width here, so the badge alone carries the emphasis.
  const ordered = [...PROJECTS].sort((a, b) => Boolean(b.featured) - Boolean(a.featured));

  return (
    <SectionShell id="projects" {...SECTIONS.projects} icon={<Sparkles className="h-5 w-5" />}>
      <RevealGroup>
        <CardRail label="projects">
          {ordered.map((p) => (
            <Reveal key={p.title} className={RAIL_ITEM_CLASS}>
              <ProjectCard project={p} featured={p.featured} />
            </Reveal>
          ))}
        </CardRail>
      </RevealGroup>
    </SectionShell>
  );
}
