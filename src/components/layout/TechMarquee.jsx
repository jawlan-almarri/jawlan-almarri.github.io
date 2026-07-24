import React from "react";

import { TECH_STACK } from "@/data/techStack";

/**
 * Infinite, auto-scrolling strip of technology logos shown below the hero.
 *
 * Style: logos only (no labels/containers), in their original brand colors.
 * Each logo sits in a fixed-size box with object-contain, so logos can never
 * overlap regardless of their individual aspect ratios or how a given browser
 * sizes inline SVGs.
 *
 * Seamless loop: two identical lists sit side by side; each animates
 * translateX(0 -> -100%) over the same duration, so as the first scrolls off
 * the left the second takes its place — a gap-free, continuous loop that never
 * pauses (see index.css).
 *
 * a11y: the first list exposes each logo's name via alt text; the duplicate
 * list is hidden from assistive tech.
 */
function MarqueeItem({ item, decorative }) {
  return (
    <li className="mx-6 flex shrink-0 items-center justify-center md:mx-8">
      <img
        src={item.icon}
        alt={decorative ? "" : item.name}
        aria-hidden={decorative ? "true" : undefined}
        decoding="async"
        width={40}
        height={40}
        className="h-9 w-9 shrink-0 object-contain md:h-10 md:w-10"
      />
    </li>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies and tools I work with"
      className="tech-marquee relative mt-2 border-y border-white/5 bg-white/[0.015] py-6"
    >
      <div className="tech-marquee__mask relative flex overflow-hidden">
        <ul className="tech-marquee__track flex w-max items-center">
          {TECH_STACK.map((t) => (
            <MarqueeItem key={t.name} item={t} />
          ))}
        </ul>
        <ul className="tech-marquee__track flex w-max items-center" aria-hidden="true">
          {TECH_STACK.map((t) => (
            <MarqueeItem key={`${t.name}-dup`} item={t} decorative />
          ))}
        </ul>
      </div>
    </section>
  );
}
