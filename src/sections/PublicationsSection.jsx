import React from "react";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { Tag } from "@/components/common/Tag";
import { PUBLICATIONS, SECTIONS } from "@/data/portfolioData";

/** Author list with the portfolio owner's name emphasised. */
function Authors({ authors }) {
  return (
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
      {authors.map((a, i) => (
        <React.Fragment key={a.name}>
          <span
            className={
              a.me
                ? "font-semibold text-foreground underline decoration-cyan-500/60 underline-offset-4"
                : undefined
            }
          >
            {a.name}
          </span>
          {i < authors.length - 1 ? ", " : ""}
        </React.Fragment>
      ))}
    </p>
  );
}

export function PublicationsSection() {
  return (
    <SectionShell id="publications" {...SECTIONS.publications} icon={<BookOpen className="h-5 w-5" />}>
      <RevealGroup className="space-y-5">
        {PUBLICATIONS.map((p) => (
          <Reveal key={p.title}>
            <Card className="surface surface-hover surface-pad shadow-none">
              {/* Eyebrow */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Tag tone="cyan" className="gap-1.5">
                    <FileText className="h-3.5 w-3.5" />
                    {p.type}
                  </Tag>
                  {p.status ? <Tag>{p.status}</Tag> : null}
                </div>
                <Tag>{p.year}</Tag>
              </div>

              {/* Title */}
              <h3 className="mt-4 text-lg font-semibold leading-snug tracking-tight sm:text-xl">
                {p.title}
              </h3>

              {Array.isArray(p.authors) ? <Authors authors={p.authors} /> : null}

              {/* Venue */}
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-foreground/90">{p.venue}</span>
                {p.details ? <span> · {p.details}</span> : null}
              </p>

              {/* Key contributions */}
              {p.points?.length ? (
                <ul className="mt-5 grid gap-2.5 text-sm leading-relaxed text-muted-foreground sm:grid-cols-2">
                  {p.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500/70" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              ) : null}

              {/* Footer */}
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <Button
                  asChild
                  className="h-10 rounded-xl bg-gradient-to-r from-cyan-700 to-indigo-600 font-medium text-white hover:opacity-95"
                >
                  <a
                    href={p.url ?? p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open "${p.title}" on the publisher site`}
                  >
                    View on ScienceDirect
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>

                {p.doi ? (
                  <a
                    href={p.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground underline decoration-border underline-offset-4 transition hover:text-foreground"
                  >
                    {p.doi.replace("https://", "")}
                  </a>
                ) : null}
              </div>
            </Card>
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
