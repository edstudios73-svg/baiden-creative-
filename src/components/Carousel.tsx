"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "./icons";

type Tone = "light" | "dark";

/**
 * Monochrome carousel. Native scroll-snap gives touch and trackpad swiping for free; buttons, keyboard
 * arrows and the progress line drive the same track. No autoplay. Inactive slides ease back slightly.
 */
export function Carousel({
  label,
  slides,
  slideClassName = "w-[85%] sm:w-[60%] lg:w-[40%]",
  tone = "light",
  footer,
}: {
  label: string;
  slides: ReactNode[];
  slideClassName?: string;
  tone?: Tone;
  footer?: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = slides.length;

  // Active slide = the one whose start is nearest the scroll position; the last slide wins at the end of the track.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = [...track.children] as HTMLElement[];
      const origin = items[0]?.offsetLeft ?? 0;
      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (atEnd) return setActive(items.length - 1);
      let best = 0;
      items.forEach((el, i) => {
        if (Math.abs(el.offsetLeft - origin - track.scrollLeft) < Math.abs(items[best].offsetLeft - origin - track.scrollLeft)) best = i;
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [count]);

  const go = useCallback(
    (i: number) => {
      const track = trackRef.current;
      const target = track?.children[Math.max(0, Math.min(count - 1, i))] as HTMLElement | undefined;
      if (!track || !target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: target.offsetLeft - (track.firstElementChild as HTMLElement).offsetLeft, behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  const dark = tone === "dark";
  const btn = `grid size-12 place-items-center border transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30 ${
    dark ? "border-ivory/40 hover:bg-ivory hover:text-ink disabled:hover:bg-transparent disabled:hover:text-ivory" : "border-ink/30 hover:bg-ink hover:text-ivory disabled:hover:bg-transparent disabled:hover:text-ink"
  }`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={trackRef}
        tabIndex={0}
        aria-label={`${label}: use arrow keys to move between slides`}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            go(active + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            go(active - 1);
          }
        }}
        className={"relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] md:gap-6 [&::-webkit-scrollbar]:hidden -mx-[clamp(1rem,0.4rem+3vw,3rem)] px-[clamp(1rem,0.4rem+3vw,3rem)] scroll-px-[clamp(1rem,0.4rem+3vw,3rem)]"}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
            data-active={i === active}
            className={`shrink-0 snap-start transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:md:data-[active=false]:scale-[0.97] motion-safe:md:data-[active=false]:opacity-70 ${slideClassName}`}
          >
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-6">
        <p className="text-label w-16 shrink-0 tabular-nums" aria-live="polite">
          {String(active + 1).padStart(2, "0")} <span className={dark ? "text-mist" : "text-graphite"}>/ {String(count).padStart(2, "0")}</span>
        </p>
        <div className={`relative h-px flex-1 ${dark ? "bg-ivory/20" : "bg-ink/15"}`} aria-hidden="true">
          <span
            className={`absolute inset-y-0 left-0 transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${dark ? "bg-ivory" : "bg-ink"}`}
            style={{ width: `${((active + 1) / count) * 100}%` }}
          />
        </div>
        <div className="flex gap-2">
          <button type="button" className={btn} onClick={() => go(active - 1)} disabled={active === 0} aria-label="Previous slide">
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <button type="button" className={btn} onClick={() => go(active + 1)} disabled={active === count - 1} aria-label="Next slide">
            <ArrowRight className="size-4" />
          </button>
        </div>
        {footer}
      </div>
    </div>
  );
}
