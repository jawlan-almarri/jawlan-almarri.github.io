import React, { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { ArrowUp, Linkedin, Mail } from "lucide-react";

import { IDENTITY, LINKS, SECTION_IDS, TAGLINE } from "@/data/portfolioData";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useTheme } from "@/hooks/useTheme";

import { MeshBackground } from "@/components/background/MeshBackground";
import { Navbar } from "@/components/layout/Navbar";
import { TechMarquee } from "@/components/layout/TechMarquee";

import { HeroSection } from "@/sections/HeroSection";
import { ExperienceSection } from "@/sections/ExperienceSection";
import { EducationSection } from "@/sections/EducationSection";
import { PublicationsSection } from "@/sections/PublicationsSection";
import { CertificationsSection } from "@/sections/CertificationsSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { ActivitiesSection } from "@/sections/ActivitiesSection";
import { AchievementsSection } from "@/sections/AchievementsSection";
import { ContactSection } from "@/sections/ContactSection";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeSectionId = useScrollSpy(SECTION_IDS);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigate = useCallback((id) => {
    scrollToId(id);
    setIsMenuOpen(false);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const { scrollY, scrollYProgress } = useScroll();
  const blobY1 = useTransform(scrollY, [0, 700], [0, 90]);
  const blobY2 = useTransform(scrollY, [0, 700], [0, -70]);

  // Back-to-top is pointless while the hero is still in view, so it only
  // appears once the reader is roughly a screen down. Seeded from the current
  // offset so a reload part-way down the page still shows it immediately.
  const [showBackToTop, setShowBackToTop] = useState(
    () => typeof window !== "undefined" && window.scrollY > 500,
  );
  useMotionValueEvent(scrollY, "change", (y) => setShowBackToTop(y > 500));

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen text-foreground">
      {/* Skip link — ten nav items sit between the page start and the content. */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-xl focus:border focus:border-border focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:font-medium focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 via-indigo-500 to-violet-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      <MeshBackground y1={blobY1} y2={blobY2} />

      <Navbar
        activeSectionId={activeSectionId}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((v) => !v)}
        onCloseMenu={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main id="main-content" tabIndex={-1} className="pt-28">
        <HeroSection />
        <TechMarquee />
        {/* Order mirrors NAV_ITEMS in portfolioData.js — keep the two in sync. */}
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <PublicationsSection />
        <CertificationsSection />
        <ActivitiesSection />
        <AchievementsSection />
        <ContactSection />

        <footer className="mx-auto max-w-6xl px-4 pb-12 pt-8 text-center">
          <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10 mb-8" />

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div className="text-left">
              <p className="text-sm font-semibold">{IDENTITY.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{TAGLINE}</p>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`mailto:${LINKS.email}`}
                aria-label="Email"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a
                href={LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Alpha here fails AA in light mode whatever the value — the token
              is already at 4.74:1 there (/80 measured 3.23:1). Use it neat. */}
          <p className="mt-6 text-xs text-muted-foreground">© 2026 {IDENTITY.name} · All rights reserved</p>
        </footer>
      </main>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            onClick={() => handleNavigate("hero")}
            className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-black shadow-lg shadow-cyan-500/25"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Privacy-friendly analytics — only sends data on Vercel deployments. */}
      <Analytics />
    </div>
    </MotionConfig>
  );
}
