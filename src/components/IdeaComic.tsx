import type { CSSProperties, ReactNode } from "react";

/*
 * "From an idea to an opportunity": four black-and-white comic panels.
 * All linework is original SVG. Every stroke has pathLength={1}, so the .ink-draw CSS can sketch it in
 * when the panel enters the viewport (see globals.css). Text inside the art is decorative; each panel's
 * story is also given as real text in its caption.
 */

const S = { stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round", strokeLinejoin: "round", fill: "none" } as const;
const d = (ms: number) => ({ "--d": ms }) as CSSProperties;

function Bubble({ x, y, w, text, tail = "left" }: { x: number; y: number; w: number; text: string; tail?: "left" | "right" }) {
  const h = 18;
  const tx = tail === "left" ? x + 14 : x + w - 14;
  return (
    <g>
      <path
        {...S}
        pathLength={1}
        style={d(900)}
        d={`M${x + 4} ${y} H${x + w - 4} Q${x + w} ${y} ${x + w} ${y + 4} V${y + h - 4} Q${x + w} ${y + h} ${x + w - 4} ${y + h} H${tx + 6} L${tx + (tail === "left" ? -6 : 8)} ${y + h + 9} L${tx} ${y + h} H${x + 4} Q${x} ${y + h} ${x} ${y + h - 4} V${y + 4} Q${x} ${y} ${x + 4} ${y} Z`}
      />
      <text className="ink-fill" style={d(1500)} x={x + w / 2} y={y + 12.2} textAnchor="middle" fill="currentColor" fontSize="7.2" fontFamily="var(--font-mono)" letterSpacing="0.4">
        {text}
      </text>
    </g>
  );
}

function Narration({ n, text }: { n: string; text: string }) {
  return (
    <g>
      <rect x="8" y="8" width={text.length * 4.7 + 26} height="15" fill="currentColor" className="ink-fill" style={d(100)} />
      <text x="14" y="18.6" fill="black" fontSize="6.6" fontFamily="var(--font-mono)" letterSpacing="0.5" className="ink-fill" style={d(150)}>
        {n} {text}
      </text>
    </g>
  );
}

function Halftone({ id }: { id: string }) {
  return (
    <>
      <defs>
        <pattern id={id} width="5" height="5" patternUnits="userSpaceOnUse">
          <circle cx="2.5" cy="2.5" r="0.7" fill="currentColor" />
        </pattern>
      </defs>
    </>
  );
}

const panels: { title: string; caption: string; art: ReactNode }[] = [
  {
    title: "An idea",
    caption: "It starts with an idea: a problem worth solving, or an opportunity no one has taken yet.",
    art: (
      <>
        <Halftone id="ht1" />
        <rect x="120" y="40" width="70" height="95" fill="url(#ht1)" opacity="0.35" className="ink-fill" style={d(1200)} />
        <Narration n="01" text="IT STARTS WITH AN IDEA" />
        {/* Light bulb */}
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(200)} d="M100 44 C80 44 70 59 70 72 C70 84 78 90 83 98 C86 103 86 106 86 110 H114 C114 106 114 103 117 98 C122 90 130 84 130 72 C130 59 120 44 100 44 Z" />
        <path {...S} pathLength={1} style={d(500)} d="M88 116 H112 M90 122 H110 M94 128 H106" />
        <path {...S} pathLength={1} style={d(700)} d="M92 110 L95 86 L100 94 L105 86 L108 110" />
        {/* Rays */}
        <path {...S} pathLength={1} style={d(1000)} d="M100 32 V24 M66 40 L60 34 M56 72 H46 M144 72 H154 M64 102 L57 108 M136 102 L143 108" />
        <Bubble x={136} y={22} w={56} text="WHAT IF…?" tail="left" />
      </>
    ),
  },
  {
    title: "Becomes a design",
    caption: "We shape it into a design: structure first, then the look, feel and words that make it clear.",
    art: (
      <>
        <Narration n="02" text="IT BECOMES A DESIGN" />
        {/* Sketchbook page */}
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(150)} d="M38 36 H150 V136 H38 Z" />
        <path {...S} pathLength={1} style={d(400)} d="M46 46 H142 M46 52 H70" />
        <path {...S} pathLength={1} style={d(600)} d="M46 60 H104 V98 H46 Z M46 60 L104 98 M104 60 L46 98" />
        <path {...S} pathLength={1} style={d(800)} d="M112 62 H142 M112 70 H138 M112 78 H142 M112 86 H130" />
        <path {...S} pathLength={1} style={d(950)} d="M46 108 H78 V122 H46 Z M86 108 H142 M86 116 H128" />
        {/* Pencil */}
        <path {...S} strokeWidth={1.6} pathLength={1} style={d(1100)} d="M150 134 L184 100 L192 108 L158 142 L148 145 Z M180 104 L188 112 M150 134 L158 142" />
        <Bubble x={140} y={8} w={54} text="SKETCH IT." tail="left" />
      </>
    ),
  },
  {
    title: "A working product",
    caption: "Then we build it: a working website, platform or app that real people can use today.",
    art: (
      <>
        <Narration n="03" text="IT BECOMES A PRODUCT" />
        {/* Browser */}
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(150)} d="M24 40 H150 V126 H24 Z M24 52 H150" />
        <circle {...S} pathLength={1} style={d(300)} cx="32" cy="46" r="2" />
        <circle {...S} pathLength={1} style={d(350)} cx="40" cy="46" r="2" />
        <path {...S} pathLength={1} style={d(500)} d="M34 64 H96 M34 72 H84 M34 84 H62 V94 H34 Z" />
        <path {...S} pathLength={1} style={d(700)} d="M104 62 H140 V100 H104 Z" />
        {/* Phone */}
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(900)} d="M146 70 Q146 66 150 66 H176 Q180 66 180 70 V138 Q180 142 176 142 H150 Q146 142 146 138 Z M158 72 H168" />
        <path {...S} pathLength={1} style={d(1100)} d="M152 82 H174 M152 90 H168 M152 100 H174 V118 H152 Z M152 128 H166" />
        {/* Cursor */}
        <path {...S} pathLength={1} style={d(1300)} d="M112 106 L112 124 L117 119 L121 128 L124 127 L120 118 L127 118 Z" />
        <Bubble x={26} y={130} w={52} text="IT'S LIVE." tail="right" />
      </>
    ),
  },
  {
    title: "An opportunity",
    caption: "And a good product opens doors: new customers, new markets and new opportunities.",
    art: (
      <>
        <Halftone id="ht4" />
        <Narration n="04" text="IT OPENS A DOOR" />
        {/* Wall and open door with light spilling out */}
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(150)} d="M20 138 H190" />
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(300)} d="M92 138 V46 H140 V138" />
        <path {...S} strokeWidth={1.8} pathLength={1} style={d(500)} d="M92 46 L70 54 V146 L92 138" />
        <circle {...S} pathLength={1} style={d(650)} cx="76" cy="98" r="1.6" />
        <polygon points="96,50 136,50 136,136 96,136" fill="url(#ht4)" className="ink-fill" style={d(1300)} />
        {/* Light rays on the floor */}
        <path {...S} pathLength={1} style={d(900)} d="M92 138 L52 150 M140 138 L176 150 M110 138 L100 150 M124 138 L138 150" />
        {/* Path of steps toward the door */}
        <path {...S} pathLength={1} style={d(1100)} d="M24 124 C40 116 54 122 62 128" />
        <path {...S} pathLength={1} style={d(1200)} d="M58 122 L64 129 L55 131" />
        {/* Star burst */}
        <path {...S} pathLength={1} style={d(1400)} d="M164 30 V44 M157 37 H171 M159 32 L169 42 M169 32 L159 42" />
        <Bubble x={20} y={30} w={62} text="NEXT: GROW." tail="right" />
      </>
    ),
  },
];

export function IdeaComic() {
  return (
    <ol className="relative -mx-[clamp(1rem,0.4rem+3vw,3rem)] flex snap-x snap-mandatory scroll-px-[clamp(1rem,0.4rem+3vw,3rem)] gap-3 overflow-x-auto px-[clamp(1rem,0.4rem+3vw,3rem)] pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden" aria-label="Comic: from an idea to an opportunity, four panels">
      {panels.map((p, i) => (
        <li key={p.title} className="w-[82%] shrink-0 snap-start sm:w-auto" data-reveal style={{ "--reveal-delay": i } as CSSProperties}>
          <figure className="flex h-full flex-col border-2 border-ivory bg-ink">
            <svg className="ink-draw block w-full text-ivory" viewBox="0 0 200 155" aria-hidden="true">
              {p.art}
            </svg>
            <figcaption className="mt-auto border-t-2 border-ivory p-4">
              <span className="text-label text-mist">0{i + 1} · {p.title}</span>
              <span className="mt-2 block text-[0.95rem] leading-snug text-ivory/90">{p.caption}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ol>
  );
}
