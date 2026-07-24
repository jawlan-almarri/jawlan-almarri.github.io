import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

/**
 * Vite configuration.
 *
 * - `base`            : root path (adjust if deploying under a sub-path).
 * - `manualChunks`    : split heavy, rarely-changing vendor code (React, Framer
 *                       Motion) into their own cached chunks so an app-code
 *                       change doesn't invalidate the whole bundle for returning
 *                       visitors.
 * - `chunkSizeWarningLimit` : raised slightly; our vendor split is intentional.
 */
export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "motion-vendor": ["framer-motion"],
          "icons-vendor": ["lucide-react"],
        },
      },
    },
  },
});
