import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

import { Tag } from "@/components/common/Tag";
import { cn } from "@/lib/utils";
import { useCardInteraction } from "@/motion/variants";

/**
 * Project showcase card.
 *
 * Props
 *   project: { title, cover, tags?, desc, details?, links? }
 *   featured: renders the large "spotlight" tile in the bento grid — bigger
 *     cover, inline tags, a "Featured" eyebrow — instead of the standard tile.
 *
 * Layout goals
 *   • Equal heights inside the grid even with uneven copy.
 *   • Legible tag overlay on top of the cover art.
 *   • Copy gently clamped so rows stay tidy (standard tiles only).
 */
export function ProjectCard({ project, featured = false }) {
  const title = project?.title ?? "Untitled project";
  const tags = Array.isArray(project?.tags) ? project.tags : [];
  const { rotateX, rotateY, spotX, spotY, onMouseMove, onMouseLeave } = useCardInteraction({
    tilt: featured ? 4 : 6,
  });

  return (
    <div className="h-full [perspective:1200px]">
      <motion.article
        style={{ rotateX, rotateY, "--spot-x": spotX, "--spot-y": spotY }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 240, damping: 18 }}
        className="spotlight surface group flex h-full flex-col overflow-hidden shadow-none"
      >
        {/* Cover */}
        {/* Uniform ratio: in the rail every slide is the same width, so the
            old wider crop for `featured` would just make that card shorter
            than its neighbours. The badge carries the emphasis instead. */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.img
            src={project.cover}
            alt={`${title} cover`}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            loading="lazy"
          />

          {/* Readability overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {featured ? (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-black/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-cyan-200 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              Featured
            </span>
          ) : tags.length ? (
            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              {tags.slice(0, 4).map((t) => (
                <Tag key={t} tone="overlay" size="sm">
                  {t}
                </Tag>
              ))}
            </div>
          ) : null}
        </div>

        {/* Body */}
        <div className={cn("flex flex-1 flex-col", featured ? "p-7 sm:p-9" : "p-6 sm:p-7")}>
          <h3
            className={cn(
              "font-bold leading-snug tracking-tight",
              featured ? "text-xl sm:text-2xl" : "text-base font-semibold"
            )}
          >
            {title}
          </h3>

          {featured && tags.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((t) => (
                <Tag key={t} tone="cyan" size="sm">
                  {t}
                </Tag>
              ))}
            </div>
          ) : null}

          <p
            className={cn(
              "mt-3 leading-relaxed text-muted-foreground",
              featured ? "text-sm sm:text-base" : "text-sm clamp-4"
            )}
          >
            {project.desc}
          </p>

          {project.details?.length ? (
            <ul className="mt-4 min-h-[44px] space-y-2 text-sm leading-relaxed text-muted-foreground">
              {project.details.map((line) => (
                <li key={line} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />
                  <span className={featured ? undefined : "clamp-2"}>{line}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-4 min-h-[44px]" />
          )}

          {project.links?.length ? (
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-medium text-cyan-700 transition hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-200"
                >
                  {l.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          ) : null}

          <div className="mt-auto" />
        </div>
      </motion.article>
    </div>
  );
}
