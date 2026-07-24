import React from "react";
import { Sparkles } from "lucide-react";

import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { PROJECTS, SECTIONS } from "@/data/portfolioData";

export function ProjectsSection() {
  const featuredProject = PROJECTS.find((p) => p.featured);
  const restProjects = PROJECTS.filter((p) => p !== featuredProject);

  return (
    <SectionShell id="projects" {...SECTIONS.projects} icon={<Sparkles className="h-5 w-5" />}>
      <RevealGroup className="grid grid-cards items-stretch gap-5 md:grid-cols-2">
        {featuredProject ? (
          <Reveal className="h-full md:col-span-2">
            <ProjectCard project={featuredProject} featured />
          </Reveal>
        ) : null}

        {restProjects.map((p) => (
          <Reveal key={p.title} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
