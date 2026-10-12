import Image from "next/image";
import type { StudioPiece } from "@/content/studio";

/**
 * Infinite, CSS-only "studio wall": each piece hangs in a gallery frame (white frame, black mat, fine
 * inner line) with a small plaque, tilted slightly as if hung by hand; hovering straightens and lifts it.
 * The set is rendered twice and the track slides by exactly half its width, so the loop is seamless.
 * Hover pauses it; with reduced motion it becomes a static strip the visitor can swipe. The duplicate
 * set is hidden from assistive technology.
 */
export function Marquee({
  items,
  reverse = false,
  duration = 70,
  start = 0,
  heightClass = "h-28 sm:h-40 lg:h-48",
  sizes = "(min-width: 1024px) 340px, (min-width: 640px) 280px, 200px",
}: {
  items: StudioPiece[];
  reverse?: boolean;
  duration?: number;
  /** Number of the first plaque, so two rows can continue one sequence. */
  start?: number;
  heightClass?: string;
  sizes?: string;
}) {
  const half = (copy: boolean) => (
    <ul className="flex shrink-0 items-start gap-5 pr-5 md:gap-8 md:pr-8" aria-hidden={copy || undefined}>
      {items.map((it, i) => (
        <li key={it.src} className="mq-item shrink-0" style={{ "--tilt": `${[-1.6, 1.1, -0.6, 1.8, -1.2][i % 5]}deg` } as React.CSSProperties}>
          <figure>
            <div className="mq-frame">
              <div className="mq-mat">
                <Image src={it.src} alt={copy ? "" : it.alt} width={it.width} height={it.height} sizes={sizes} className={`block w-auto max-w-none ${heightClass}`} />
              </div>
            </div>
            <figcaption className="mq-plaque">
              <span>
                No. {String(start + i + 1).padStart(2, "0")} · {it.kind}
              </span>
              <span className="mq-title">{it.title}</span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative overflow-hidden py-3 motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]">
      <div
        className={`marquee-track flex w-max group-hover:[animation-play-state:paused] ${reverse ? "marquee-reverse" : ""}`}
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        {half(false)}
        {half(true)}
      </div>
    </div>
  );
}
