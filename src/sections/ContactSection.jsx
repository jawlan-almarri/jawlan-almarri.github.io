import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Linkedin, Mail, MessageSquare } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/layout/SectionShell";
import { Reveal } from "@/components/common/Reveal";
import { LINKS, SECTIONS } from "@/data/portfolioData";
import { useCardInteraction } from "@/motion/variants";

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const { spotX, spotY, onMouseMove } = useCardInteraction();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard may be unavailable in some contexts; the address stays visible.
    }
  }, []);

  return (
    <SectionShell id="contact" {...SECTIONS.contact} icon={<MessageSquare className="h-5 w-5" />}>
      <Reveal initial="hidden" whileInView="show" viewport={{ once: true }}>
        {/* Gradient CTA card */}
        <motion.div
          onMouseMove={onMouseMove}
          style={{ "--spot-x": spotX, "--spot-y": spotY }}
          className="spotlight relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-indigo-500/5 to-violet-500/10 p-8 sm:p-10"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
          />

          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-bold tracking-tight">Let's work together</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                Whether it's a project, a role, or just a conversation — I'd love to hear from you.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:min-w-[260px]">
              {/* Copy email */}
              <button
                type="button"
                onClick={copyEmail}
                className="flex h-11 w-full items-center justify-between rounded-xl border border-border bg-background/70 px-4 text-sm font-medium transition-all hover:bg-muted"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <Mail className="h-4 w-4 shrink-0 text-cyan-600 dark:text-cyan-400" />
                  <span className="truncate font-mono text-[13px]">{LINKS.email}</span>
                </span>
                <span className="ml-3 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {copied ? (
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  )}
                </span>
              </button>

              {/* LinkedIn */}
              <Button
                asChild
                className="h-11 w-full gap-2 rounded-xl bg-gradient-to-r from-cyan-700 to-indigo-600 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all hover:opacity-90"
              >
                <a href={LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="Open LinkedIn">
                  <Linkedin className="h-4 w-4" />
                  Connect on LinkedIn
                  <ArrowUpRight className="ml-auto h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>

        <span className="sr-only" aria-live="polite">
          {copied ? "Email copied to clipboard" : ""}
        </span>
      </Reveal>
    </SectionShell>
  );
}
