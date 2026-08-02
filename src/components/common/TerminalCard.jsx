import React from "react";

/**
 * Decorative terminal window for the hero's right column.
 *
 * Structure adapted from 21st.dev's "8-bit Demo Shell" (theorcdev) — the
 * line-type model (input/output/comment), the `$` prefixing, and the
 * traffic-light chrome. Re-skinned onto this site's glass tokens and
 * JetBrains Mono instead of its retro 8-bit styling, and its `animate-pulse`
 * cursor was dropped: the page already runs four looping animations, and a
 * decorative one more works against the excessive/continuous-motion
 * guidance. A steady block reads as a cursor just as well.
 *
 * Every fact shown here (name, role, stack, certifications) also appears in
 * semantic markup further down the page, so the whole block is hidden from
 * assistive tech rather than read out twice.
 */

/**
 * No alpha on --muted-foreground: in light mode the token is already tuned to
 * exactly 4.74:1, so any transparency drops it under AA (/80 measured 3.23:1).
 * Comments are set apart with italics instead of a dimmer tint.
 */
const LINE_TONE = {
  comment: "italic text-muted-foreground",
  input: "text-foreground",
  output: "text-muted-foreground",
};

function TerminalLine({ type, text }) {
  return (
    <p className={`whitespace-pre ${LINE_TONE[type] ?? LINE_TONE.output}`}>
      {type === "input" && <span className="text-cyan-700 dark:text-cyan-400">$ </span>}
      {text}
    </p>
  );
}

export function TerminalCard({ lines, title = "jawlan@portfolio: ~" }) {
  return (
    <div
      aria-hidden="true"
      className="surface overflow-hidden rounded-2xl font-mono text-[11px] leading-[1.9] shadow-xl lg:text-xs"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-[var(--glass-border)] px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        </span>
        <span className="ml-1 truncate text-[10px] text-muted-foreground">{title}</span>
      </div>

      {/* Session */}
      <div className="space-y-0.5 px-4 py-4">
        {lines.map((line, i) => (
          <TerminalLine key={i} type={line.type} text={line.text} />
        ))}

        <p className="pt-0.5 text-foreground">
          <span className="text-cyan-700 dark:text-cyan-400">$ </span>
          <span className="ml-0.5 inline-block h-[1.05em] w-[0.5em] translate-y-[0.15em] bg-foreground/70" />
        </p>
      </div>
    </div>
  );
}
