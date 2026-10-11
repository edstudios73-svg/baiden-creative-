"use client";

import { useEffect } from "react";

/**
 * One observer for the whole site: marks [data-reveal] elements visible as they enter the viewport.
 * Hidden states only apply under html.js and prefers-reduced-motion: no-preference (see globals.css),
 * so content is always readable without JavaScript.
 */
export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => (el.dataset.visible = "true"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    const observeAll = () =>
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-visible])").forEach((el) => io.observe(el));
    observeAll();
    // Client-side navigation and filtering add new elements; observe them as they appear.
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}
