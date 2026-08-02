import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Horizontal card rail with arrow paging.
 *
 * Built on native scroll + CSS scroll-snap rather than a carousel library:
 * touch and trackpad swiping come for free, the cards stay in DOM order (so
 * tabbing through them still works), and `scroll-behavior` is already
 * neutralised by the global prefers-reduced-motion rule in index.css.
 *
 * The rail itself is focusable with an accessible name — a scrollable region
 * has to be reachable by keyboard, and the arrows are a pointer convenience
 * on top of that, not the only way through.
 *
 * Arrows disable at each end. With few enough cards to fit, both sit disabled,
 * which is the honest state rather than a bug.
 */
export function CardRail({ children, label }) {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    // 1px of slack absorbs sub-pixel rounding at the extremes.
    setCanScrollLeft(el.scrollLeft > 1);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  const page = (direction) => {
    const el = railRef.current;
    if (!el) return;
    // Page by one card so the snap points stay aligned at any breakpoint.
    const first = el.firstElementChild;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = first ? first.getBoundingClientRect().width + gap : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <RailButton
          onClick={() => page(-1)}
          disabled={!canScrollLeft}
          label={`Previous ${label}`}
          icon={ChevronLeft}
        />
        <RailButton
          onClick={() => page(1)}
          disabled={!canScrollRight}
          label={`Next ${label}`}
          icon={ChevronRight}
        />
      </div>

      {/* `snap-proximity`, not mandatory: with only a few cards the last snap
          point can sit past the maximum scroll offset, and mandatory then
          yanks the rail back to the start instead of resting at the end. */}
      <div
        ref={railRef}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="no-scrollbar flex snap-x snap-proximity items-stretch gap-5 overflow-x-auto scroll-smooth pb-2 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/30"
      >
        {children}
      </div>
    </div>
  );
}

function RailButton({ onClick, disabled, label, icon: Icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground backdrop-blur transition hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

/**
 * Slide sizing, applied to whatever element the section uses as a rail child
 * (usually <Reveal>, so it stays a motion child of its RevealGroup).
 * Widths leave a sliver of the next card visible as a scroll affordance.
 *
 * Deliberately no `h-full`: an explicit height on a flex item opts it out of
 * `align-items: stretch`, which left the slides ragged. Let the rail stretch
 * them and have the card inside fill with its own h-full.
 */
export const RAIL_ITEM_CLASS =
  "min-w-0 shrink-0 basis-[86%] snap-start sm:basis-[52%] lg:basis-[44%]";
