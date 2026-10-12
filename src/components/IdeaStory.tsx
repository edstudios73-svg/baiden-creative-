"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ArrowRight } from "@/components/icons";

/*
 * "From an idea to an opportunity": an auto-advancing comic in four chapters, starring the studio character.
 *
 * Timing: the active chapter's progress bar is a CSS animation; when it ends, the next chapter starts. Pausing
 * just pauses that animation, so the bar and the timer can never drift apart.
 * Autoplay stops while the pointer is over the comic, while a keyboard user is inside it, while it is off screen
 * or the tab is hidden, and whenever the visitor presses pause. With reduced motion there is no autoplay and every
 * chapter renders in its final state.
 * Stage art uses a 400×300 coordinate space; the character is positioned in percentages of the same space.
 */

const DURATION = 7000;
const S = { pathLength: 1, stroke: "currentColor", strokeWidth: 2.4, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

type Chapter = {
  title: string;
  narration: string;
  caption: string;
  /** Character placement: left edge in % of the stage width. */
  x: number;
  art: ReactNode;
};

function Bubble({ x, y, w, h = 36, text, tailX, tailY, delay = 900 }: { x: number; y: number; w: number; h?: number; text: string; tailX: number; tailY: number; delay?: number }) {
  const cx = Math.min(Math.max(tailX, x + 16), x + w - 16);
  const edge = tailY > y ? y + h : y;
  return (
    <g className="st-pop" style={{ ...d(delay), transformBox: "view-box", transformOrigin: `${tailX}px ${tailY}px` }}>
      <path
        d={`M${x + 10} ${y} H${x + w - 10} Q${x + w} ${y} ${x + w} ${y + 10} V${y + h - 10} Q${x + w} ${y + h} ${x + w - 10} ${y + h} H${x + 10} Q${x} ${y + h} ${x} ${y + h - 10} V${y + 10} Q${x} ${y} ${x + 10} ${y} Z`}
        fill="#fff"
        stroke="currentColor"
        strokeWidth={2.4}
      />
      <path d={`M${cx - 8} ${edge} L${tailX} ${tailY} L${cx + 8} ${edge}`} fill="#fff" stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" />
      <path d={`M${cx - 6.5} ${edge} H${cx + 6.5}`} stroke="#fff" strokeWidth={3} />
      <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill="currentColor" fontSize="14" fontWeight="700" fontFamily="var(--font-mono)" letterSpacing="1">
        {text}
      </text>
    </g>
  );
}

function Burst({ cx, cy, r, delay }: { cx: number; cy: number; r: number; delay: number }) {
  const rays = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    return `M${cx + Math.cos(a) * r * 0.45} ${cy + Math.sin(a) * r * 0.45} L${cx + Math.cos(a) * r} ${cy + Math.sin(a) * r}`;
  }).join(" ");
  return <path {...S} strokeWidth={2} className="st-burst" style={{ ...d(delay), transformBox: "view-box", transformOrigin: `${cx}px ${cy}px` }} d={rays} />;
}

const chapters: Chapter[] = [
  {
    title: "An idea",
    narration: "IT STARTS WITH AN IDEA",
    caption: "Every project starts with an idea: a problem worth solving, or an opportunity no one has taken yet.",
    x: 10,
    art: (
      <>
        {/* Thought trail from the head to the bulb */}
        <circle className="st-pop" style={d(250)} cx="170" cy="104" r="4" fill="currentColor" />
        <circle className="st-pop" style={d(380)} cx="188" cy="90" r="5.5" fill="currentColor" />
        <circle className="st-pop" style={d(510)} cx="208" cy="78" r="7" fill="currentColor" />
        {/* Bulb */}
        <g className="st-flicker" style={d(1300)}>
          <circle cx="262" cy="80" r="52" fill="url(#st-dots)" opacity="0.5" />
        </g>
        <path {...S} strokeWidth={3} className="st-draw" style={d(500)} d="M262 36 C238 36 224 54 224 72 C224 88 234 96 240 106 C244 112 244 116 244 122 H280 C280 116 280 112 284 106 C290 96 300 88 300 72 C300 54 286 36 262 36 Z" />
        <path {...S} className="st-draw" style={d(800)} d="M248 130 H276 M250 138 H274 M255 146 H269" />
        <path {...S} className="st-draw" style={d(950)} d="M253 122 L256 92 L262 102 L268 92 L271 122" />
        <g className="st-flicker" style={d(1300)}>
          <path {...S} strokeWidth={3} d="M262 22 V10 M222 34 L214 26 M208 72 H194 M316 72 H330 M302 34 L310 26 M220 108 L210 116 M304 108 L314 116" />
        </g>
        {/* Drifting question marks */}
        <text className="st-float" style={d(1500)} x="344" y="150" fontSize="26" fontFamily="var(--font-display)" fill="currentColor">?</text>
        <text className="st-float" style={d(2100)} x="320" y="196" fontSize="18" fontFamily="var(--font-display)" fill="currentColor">?</text>
        <Bubble x={222} y={198} w={136} text="WHAT IF…?" tailX={210} tailY={184} delay={1700} />
      </>
    ),
  },
  {
    title: "A design",
    narration: "IT BECOMES A DESIGN",
    caption: "We shape it into a design: structure first, then the look, the feel and the words that make it clear.",
    x: 66,
    art: (
      <>
        {/* Drawing board */}
        <path {...S} strokeWidth={3} className="st-draw" style={d(150)} d="M22 40 H222 V246 H22 Z" />
        <path {...S} className="st-draw" style={d(350)} d="M60 246 L46 284 M184 246 L198 284" />
        <path {...S} className="st-draw" style={d(550)} d="M36 56 H208 M36 66 H76" />
        <path {...S} className="st-draw" style={d(750)} d="M36 80 H136 V150 H36 Z M36 80 L136 150 M136 80 L36 150" />
        <path {...S} className="st-draw" style={d(1000)} d="M148 84 H206 M148 98 H198 M148 112 H206 M148 126 H184" />
        <path {...S} className="st-draw" style={d(1200)} d="M36 166 H96 V190 H36 Z M108 170 H206 M108 182 H180" />
        {/* Palette: black, grey, white */}
        <circle className="st-pop" style={d(1500)} cx="48" cy="222" r="10" fill="currentColor" />
        <circle className="st-pop" style={d(1620)} cx="74" cy="222" r="10" fill="#777" />
        <circle className="st-pop" style={d(1740)} cx="100" cy="222" r="10" fill="#fff" stroke="currentColor" strokeWidth="2.4" />
        {/* Pencil, writing */}
        <g className="st-write" style={d(1300)}>
          <path {...S} strokeWidth={2.6} fill="#fff" d="M150 226 L196 180 L208 192 L162 238 L146 242 Z" />
          <path {...S} strokeWidth={2.6} d="M190 186 L202 198 M150 226 L162 238" />
          <path d="M146 242 L149 232 L156 239 Z" fill="currentColor" />
        </g>
        <Bubble x={228} y={14} w={112} text="SKETCH IT." tailX={276} tailY={60} delay={1800} />
      </>
    ),
  },
  {
    title: "A product",
    narration: "IT BECOMES A PRODUCT",
    caption: "Then we build it: a working website, platform or app that real people can use today.",
    x: 4,
    art: (
      <>
        {/* Browser */}
        <path {...S} strokeWidth={3} className="st-draw" style={d(150)} d="M160 34 H340 V196 H160 Z M160 52 H340" />
        <circle className="st-pop" style={d(400)} cx="172" cy="43" r="3.2" fill="currentColor" />
        <circle className="st-pop" style={d(460)} cx="184" cy="43" r="3.2" fill="currentColor" />
        <circle className="st-pop" style={d(520)} cx="196" cy="43" r="3.2" fill="currentColor" />
        <rect className="st-build" style={d(650)} x="172" y="62" width="156" height="44" fill="currentColor" />
        <rect className="st-build" style={d(800)} x="172" y="114" width="46" height="40" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <rect className="st-build" style={d(900)} x="227" y="114" width="46" height="40" fill="#777" />
        <rect className="st-build" style={d(1000)} x="282" y="114" width="46" height="40" fill="none" stroke="currentColor" strokeWidth="2.4" />
        <path {...S} className="st-draw" style={d(1100)} d="M172 168 H250 M172 180 H226" />
        {/* Phone */}
        <g className="st-rise" style={d(1100)}>
          <rect x="298" y="118" width="74" height="146" rx="12" fill="#fff" stroke="currentColor" strokeWidth="3" />
          <path {...S} d="M326 128 H344" />
          <rect x="308" y="140" width="54" height="34" fill="currentColor" />
          <path {...S} d="M308 186 H362 M308 198 H346 M308 214 H362 V240 H308 Z" />
        </g>
        {/* Cursor and click */}
        <g className="st-cursor" style={d(1500)}>
          <path d="M240 150 L240 176 L247 169 L252 181 L257 179 L252 167 L262 167 Z" fill="#fff" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        </g>
        <circle className="st-ripple" style={{ ...d(2300), transformOrigin: "240px 150px" }} cx="240" cy="150" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
        {/* Stamp */}
        <g className="st-stamp" style={{ ...d(2600), transformOrigin: "232px 236px" }}>
          <g transform="rotate(-8 232 236)">
            <rect x="172" y="214" width="120" height="44" fill="#fff" stroke="currentColor" strokeWidth="3.5" />
            <rect x="177" y="219" width="110" height="34" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <text x="232" y="243" textAnchor="middle" fontSize="17" fontWeight="700" fontFamily="var(--font-mono)" letterSpacing="3" fill="currentColor">
              IT&apos;S LIVE
            </text>
          </g>
        </g>
      </>
    ),
  },
  {
    title: "An opportunity",
    narration: "IT OPENS A DOOR",
    caption: "And a good product opens doors: new customers, new markets and the next opportunity.",
    x: 30,
    art: (
      <>
        {/* Light from the doorway */}
        <g className="st-glow" style={d(900)}>
          <polygon points="262,282 352,282 300,300 150,300" fill="url(#st-dots)" opacity="0.7" />
          <path {...S} strokeWidth={2} d="M262 120 L218 96 M262 160 L210 160 M262 200 L216 222 M352 120 L390 92 M352 170 L394 170" />
        </g>
        {/* Doorway */}
        <rect x="266" y="62" width="82" height="220" fill="url(#st-dots)" className="st-glow" style={d(700)} />
        <path {...S} strokeWidth={3.2} className="st-draw" style={d(150)} d="M258 282 V54 H356 V282" />
        {/* Door leaf swinging open on its hinge */}
        <g className="st-door" style={{ ...d(500), transformOrigin: "266px 172px" }}>
          <rect x="266" y="62" width="82" height="220" fill="#fff" stroke="currentColor" strokeWidth="3" />
          <path {...S} d="M278 78 H336 V150 H278 Z M278 166 H336 V266 H278 Z" />
          <circle cx="338" cy="176" r="3.5" fill="currentColor" />
        </g>
        <Burst cx={384} cy={34} r={18} delay={1600} />
        <Burst cx={226} cy={36} r={12} delay={1850} />
        <Burst cx={384} cy={240} r={11} delay={2100} />
        <Bubble x={8} y={50} w={114} text="NEXT: GROW." tailX={118} tailY={98} delay={2000} />
      </>
    ),
  },
];

export function IdeaStory() {
  const [index, setIndex] = useState(0);
  const [userPaused, setUserPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [moved, setMoved] = useState(false);
  // Bumped each time the comic scrolls into view, so the current chapter replays instead of sitting finished.
  const [entry, setEntry] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  const playing = !userPaused && !hovered && !focused && inView && !reduced;
  const chapter = chapters[index];

  const go = useCallback((n: number) => {
    setMoved(true);
    setIndex((n + chapters.length) % chapters.length);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let visible = false;
    const update = () => setInView(visible && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !visible) setEntry((n) => n + 1);
      visible = e.isIntersecting;
      update();
    }, { threshold: 0.35 });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="st grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12"
      role="region"
      aria-roledescription="carousel"
      aria-label="Comic: from an idea to an opportunity"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={(e) => setFocused((e.target as HTMLElement).matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(index + 1);
        if (e.key === "ArrowLeft") go(index - 1);
      }}
    >
      {/* ── Stage ── */}
      <div className="lg:col-span-7">
        <div className="st-stack relative">
          <div
            className="st-stage relative aspect-[4/3] overflow-hidden border-[3px] border-ivory bg-ivory text-ink"
            role="group"
            aria-roledescription="slide"
            aria-label={`Chapter ${index + 1} of ${chapters.length}: ${chapter.title}`}
          >
            <svg className="absolute inset-0 size-full" viewBox="0 0 400 300" aria-hidden="true">
              <defs>
                <pattern id="st-dots" width="7" height="7" patternUnits="userSpaceOnUse">
                  <circle cx="3.5" cy="3.5" r="1.2" fill="#111" />
                </pattern>
              </defs>
              {/* Speed-line backdrop, slowly turning */}
              <g className="st-spin" style={{ transformOrigin: "200px 150px" }}>
                {Array.from({ length: 36 }, (_, k) => {
                  const a = (k * Math.PI) / 18;
                  return <path key={k} d={`M${200 + Math.cos(a) * 120} ${150 + Math.sin(a) * 120} L${200 + Math.cos(a) * 420} ${150 + Math.sin(a) * 420}`} stroke="#e5e5e5" strokeWidth="1.4" />;
                })}
              </g>
              <path d="M0 282 H400" stroke="currentColor" strokeWidth="3" />
              <g key={`${index}-${entry}`} className="text-ink">
                {chapter.art}
              </g>
            </svg>

            {/* Character */}
            <div className="st-char absolute bottom-[5.4%] w-[29%]" style={{ left: `${chapter.x}%` }}>
              <span className="st-shadow absolute -bottom-[2%] left-[12%] h-[3%] w-[76%] rounded-[50%] bg-ink/25" aria-hidden="true" />
              <div key={`${index}-${entry}`} className={`st-react st-react-${index}`}>
                <div className="st-idle">
                  <Image src="/assets/character.png" alt="" width={414} height={848} sizes="(min-width: 1024px) 17vw, 30vw" className="block h-auto w-full" priority={false} />
                </div>
              </div>
            </div>

            {/* Narration box */}
            <p key={`n${index}-${entry}`} className="st-narration absolute left-0 top-0 bg-ink px-3 py-2 font-mono text-[0.62rem] tracking-[0.14em] text-ivory md:px-4 md:text-[0.72rem]" aria-hidden="true">
              {String(index + 1).padStart(2, "0")} — {chapter.narration}
            </p>

            {/* Panel wipe between chapters */}
            <span key={`w${index}`} className={`st-wipe pointer-events-none${moved ? " is-moving" : ""} absolute inset-0 bg-ink`} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* ── Story text and controls ── */}
      <div className="lg:col-span-5">
        <div className="flex items-center justify-between gap-4">
          <p className="text-label text-mist">
            Chapter <span className="text-ivory">{String(index + 1).padStart(2, "0")}</span> / {String(chapters.length).padStart(2, "0")}
          </p>
          {!reduced && (
            <button
              type="button"
              onClick={() => setUserPaused((p) => !p)}
              className="text-label inline-flex items-center gap-2 border border-ivory/30 px-3 py-2 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
              aria-label={userPaused ? "Play the comic" : "Pause the comic"}
            >
              {userPaused ? (
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                  <path d="M3 1.5 L10.5 6 L3 10.5 Z" fill="currentColor" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
                  <path d="M2.5 1.5 H5 V10.5 H2.5 Z M7 1.5 H9.5 V10.5 H7 Z" fill="currentColor" />
                </svg>
              )}
              {userPaused ? "Play" : "Pause"}
            </button>
          )}
        </div>

        <div aria-live={playing ? "off" : "polite"} aria-atomic="true">
          <h3 key={`t${index}`} className="st-text text-display-3 mt-6">
            {chapter.title.split(" ").slice(0, -1).join(" ")} <em>{chapter.title.split(" ").slice(-1)}.</em>
          </h3>
          <p key={`c${index}`} className="st-text mt-4 max-w-md text-mist" style={{ animationDelay: "120ms" }}>
            {chapter.caption}
          </p>
        </div>

        <ol className="mt-8 grid grid-cols-4 gap-2 lg:mt-10 lg:grid-cols-1 lg:gap-0">
          {chapters.map((c, i) => (
            <li key={c.title}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index ? "true" : undefined}
                aria-label={`Chapter ${i + 1}: ${c.title}`}
                className={`group block w-full py-3 text-left transition-colors duration-300 lg:border-t lg:border-ivory/15 lg:py-4 ${i === index ? "text-ivory" : "text-mist hover:text-ivory"}`}
              >
                <span className="flex items-baseline gap-3">
                  <span className="text-label">{String(i + 1).padStart(2, "0")}</span>
                  <span className="hidden font-display text-[1.35rem] leading-none lg:inline">{c.title}</span>
                </span>
                <span className="relative mt-3 block h-px overflow-hidden bg-ivory/20" aria-hidden="true">
                  {i < index && <span className="absolute inset-0 bg-ivory/60" />}
                  {i === index && (
                    <span
                      key={`p${index}`}
                      className="st-progress absolute inset-0 origin-left bg-ivory"
                      style={{ animationDuration: `${DURATION}ms`, animationPlayState: playing ? "running" : "paused" }}
                      onAnimationEnd={() => go(index + 1)}
                    />
                  )}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-6 flex gap-2">
          <button type="button" onClick={() => go(index - 1)} className="grid size-12 place-items-center border border-ivory/30 text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink" aria-label="Previous chapter">
            <ArrowRight className="size-4 rotate-180" />
          </button>
          <button type="button" onClick={() => go(index + 1)} className="grid size-12 place-items-center border border-ivory bg-ivory text-ink transition-colors duration-300 hover:bg-ink hover:text-ivory" aria-label="Next chapter">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
