import Image from "next/image";
import type { StudioPiece } from "@/content/studio";

/**
 * Infinite, CSS-only image marquee. The set is rendered twice and the track slides by exactly half its
 * width, so the loop is seamless. Hover pauses it; with reduced motion it becomes a static strip the
 * visitor can swipe. The duplicate set is hidden from assistive technology.
 */
export function Marquee({
  items,
  reverse = false,
  duration = 70,
  heightClass = "h-32 sm:h-44 lg:h-56",
  sizes = "(min-width: 1024px) 380px, (min-width: 640px) 300px, 220px",
}: {
  items: StudioPiece[];
  reverse?: boolean;
  duration?: number;
  heightClass?: string;
  sizes?: string;
}) {
  const half = (copy: boolean) => (
    <ul className="flex shrink-0 gap-3 pr-3 md:gap-4 md:pr-4" aria-hidden={copy || undefined}>
      {items.map((it) => (
        <li key={it.src} className={`relative shrink-0 overflow-hidden border border-ivory/15 ${heightClass}`}>
          <Image
            src={it.src}
            alt={copy ? "" : it.alt}
            width={it.width}
            height={it.height}
            sizes={sizes}
            className="h-full w-auto max-w-none object-cover"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative overflow-hidden motion-reduce:overflow-x-auto motion-reduce:[scrollbar-width:none]">
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
