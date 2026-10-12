"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Exposes scroll progress through the hero as the CSS variable --p (0 → 1) so the 3D composition can
 * move through depth. Disabled on small screens and for reduced motion, where the stage stays static.
 */
export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      el.style.setProperty("--p", p.toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const bind = () => {
      window.removeEventListener("scroll", onScroll);
      if (mq.matches) {
        window.addEventListener("scroll", onScroll, { passive: true });
        update();
      } else {
        el.style.setProperty("--p", "0");
      }
    };
    bind();
    mq.addEventListener("change", bind);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener("change", bind);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className} style={{ "--p": 0 } as React.CSSProperties}>
      {children}
    </div>
  );
}
