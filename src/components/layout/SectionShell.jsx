import React from "react";

export function SectionShell({ id, title, icon, description, children }) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-4 py-16 sm:py-24">
      {/* Section divider */}
      <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

      {/* Section header */}
      <div className="mb-12">
        <div className="mb-3 flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-violet-500/5">
            <span className="text-cyan-400">{icon}</span>
          </span>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
        </div>

        {/* Gradient accent line */}
        <div className="ml-0.5 h-px w-24 bg-gradient-to-r from-cyan-500/70 via-indigo-500/40 to-transparent" />

        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </section>
  );
}
