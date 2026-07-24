import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NAV_ITEMS, TAGLINE } from "@/data/portfolioData";

export function Navbar({
  activeSectionId,
  isMenuOpen,
  onToggleMenu,
  onCloseMenu,
  onNavigate,
  theme,
  onToggleTheme,
}) {
  return (
    <header className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="glass flex items-center justify-between rounded-2xl px-5 py-3">

          {/* Brand */}
          <button
            type="button"
            onClick={() => onNavigate("hero")}
            className="flex items-center gap-2.5 text-left"
            aria-label="Go to top"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/20 via-indigo-500/15 to-violet-500/10">
              <Sparkles className="h-4 w-4 text-cyan-400" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Jawlan Almarri</div>
              <div className="hidden text-[10px] text-muted-foreground sm:block">{TAGLINE}</div>
            </div>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Contact CTA */}
            <Button
              variant="outline"
              onClick={() => onNavigate("contact")}
              className="h-9 rounded-xl border-cyan-400/25 bg-cyan-500/10 px-4 text-xs font-medium text-cyan-600 dark:text-cyan-50 backdrop-blur hover:bg-cyan-500/20 hover:text-cyan-700 dark:hover:text-white transition-all"
            >
              Contact Me
            </Button>

            {/* Dark / Light toggle */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground backdrop-blur transition hover:bg-muted hover:text-foreground"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === "dark" ? (
                  <motion.span
                    key="sun"
                    initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Sun className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ rotate: 90, opacity: 0, scale: 0.7 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Moon className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {/* Menu toggle */}
            <button
              type="button"
              onClick={onToggleMenu}
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground backdrop-blur transition hover:bg-muted hover:text-foreground"
              aria-controls="nav-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="h-4 w-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={onCloseMenu}
              className="fixed inset-0 z-40 cursor-default bg-black/20 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              id="nav-menu"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="relative z-50 mx-auto mt-3 max-w-6xl px-4"
            >
              <div className="glass overflow-hidden rounded-2xl">
                <div className="grid grid-cols-2 gap-1 p-2 sm:grid-cols-3 lg:grid-cols-5">
                  {NAV_ITEMS.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onNavigate(item.id)}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm transition hover:bg-muted ${
                        activeSectionId === item.id
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <span className="font-medium">{item.label}</span>
                      {activeSectionId === item.id && (
                        <span
                          className="ml-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-r from-cyan-400 to-indigo-400"
                          aria-hidden="true"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
