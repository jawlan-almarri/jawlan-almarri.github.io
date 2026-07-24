import React, { useCallback, useEffect, useState } from "react";
import { motion, MotionConfig, useScroll, useTransform } from "framer-motion";
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

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen text-foreground">
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

      <main className="pt-28">
        <HeroSection />
        <TechMarquee />
        <ExperienceSection />
        <EducationSection />
        <PublicationsSection />
        <CertificationsSection />
        <SkillsSection />
        <ProjectsSection />
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

          <p className="mt-6 text-xs text-muted-foreground/70">© 2026 {IDENTITY.name} · All rights reserved</p>
        </footer>
      </main>

      {/* Back to top */}
      <motion.button
        type="button"
        onClick={() => handleNavigate("hero")}
        className="fixed bottom-6 right-6 z-40 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-black shadow-lg shadow-cyan-500/25"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Back to top"
      >
        <ArrowUp className="h-5 w-5" />
      </motion.button>

      {/* Privacy-friendly analytics — only sends data on Vercel deployments. */}
      <Analytics />
    </div>
    </MotionConfig>
  );
}
