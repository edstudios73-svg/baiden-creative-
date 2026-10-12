"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through phrases with a vertical mask transition. Screen readers get the full sentence once
 * (sr-only) and the animated word is hidden from them. With reduced motion, the first phrase stays put.
 */
export function PhraseRotator({ phrases, interval = 2600 }: { phrases: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % phrases.length), interval);
    return () => window.clearInterval(id);
  }, [phrases.length, interval]);

  return (
    <>
      <span className="sr-only">{phrases.join(", ")}.</span>
      <span aria-hidden="true" className="relative inline-grid overflow-hidden align-bottom">
        {phrases.map((p, n) => (
          <span
            key={p}
            className="col-start-1 row-start-1 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: n === i ? "translateY(0)" : n === (i - 1 + phrases.length) % phrases.length ? "translateY(-110%)" : "translateY(110%)",
              opacity: n === i ? 1 : 0,
            }}
          >
            {p}
          </span>
        ))}
      </span>
    </>
  );
}
