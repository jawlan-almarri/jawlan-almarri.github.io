import React from "react";
import { BadgeCheck, ShieldCheck } from "lucide-react";

import { Card } from "@/components/ui/card";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal, RevealGroup } from "@/components/common/Reveal";
import { CERTIFICATIONS, SECTIONS } from "@/data/portfolioData";

/**
 * Certifications gallery.
 * Each card shows a lightweight WebP preview (page 1 of the certificate) and
 * links to the public INE verification page, with the full PDF a click away.
 */
export function CertificationsSection() {
  return (
    <SectionShell
      id="certifications"
      {...SECTIONS.certifications}
      icon={<BadgeCheck className="h-5 w-5" />}
    >
      <RevealGroup className="grid grid-cards items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((c) => (
          <Reveal key={c.title} className="h-full">
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-3xl outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30"
              aria-label={`Verify ${c.title} on INE`}
            >
              <Card className="card-equal surface surface-hover surface-pad shadow-none">
                {/* Preview — a lightweight WebP of page 1; the full PDF opens on click. */}
                <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/40">
                  <div className="aspect-[4/3] w-full">
                    <img
                      src={c.thumb}
                      alt={`${c.title} certificate`}
                      loading="lazy"
                      decoding="async"
                      width={900}
                      height={695}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  {/* Hover veil hinting the document opens */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>

                {/* Label + verify affordance */}
                <div className="mt-4 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug">{c.title}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Issued by <span className="font-medium text-foreground/90">{c.issuer}</span>
                    </p>
                  </div>
                  <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-medium text-cyan-600 transition-colors group-hover:text-cyan-500 dark:text-cyan-400">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verify
                  </span>
                </div>
              </Card>
            </a>
          </Reveal>
        ))}
      </RevealGroup>
    </SectionShell>
  );
}
