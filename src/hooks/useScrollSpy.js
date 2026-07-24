import { useEffect, useState } from "react";

/**
 * Scroll spy hook.
 *
 * Given an ordered list of section ids, it returns the id that is currently
 * "active" in the viewport (based on IntersectionObserver).
 *
 * Design notes:
 * - Uses a generous rootMargin so the active item updates naturally
 *   (feels better than snapping at section boundaries).
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds?.[0] || "hero");

  useEffect(() => {
    const sections = (sectionIds || [])
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          );

        const nextId = visible[0]?.target?.id;
        if (nextId) setActiveId(nextId);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-15% 0px -60% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
