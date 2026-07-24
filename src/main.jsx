import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "@/App.jsx";

/**
 * Application bootstrap.
 *
 * - StrictMode helps catch side-effects in development.
 * - Vite injects the `#root` element in index.html.
 */
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
