import Image from "next/image";
import { studio } from "@/content/studio";
import { HeroStage } from "./HeroStage";

const layers = [
  { piece: studio.foody, pos: "top-[3%] left-0 w-[64%]", z: "-80px", sizes: "(min-width: 1024px) 38vw, 1px" },
  { piece: studio.furnitureBlue, pos: "top-[40%] right-0 w-[56%]", z: "30px", sizes: "(min-width: 1024px) 34vw, 1px" },
  { piece: studio.kwabszzMonogram, pos: "top-0 right-[3%] w-[27%]", z: "110px", sizes: "(min-width: 1024px) 16vw, 1px" },
  { piece: studio.slushify, pos: "bottom-0 left-[6%] w-[22%]", z: "170px", sizes: "(min-width: 1024px) 13vw, 1px" },
];

/**
 * Desktop hero composition in depth, built from the studio's own work. Each layer is unmasked on load
 * and the stack tilts and moves through depth with scroll (see .stage3d in globals.css).
 * Phones get the lighter image marquee instead.
 */
export function HeroVisual() {
  return (
    <HeroStage className="stage3d relative aspect-[16/11] w-full">
      <div className="stage3d-inner absolute inset-0" role="group" aria-label="Studio work: Foody website, furniture app, Kwabszz identity and The Slushify poster">
        {/* Fine construction lines behind the work */}
        <div className="absolute inset-0 [--z:-140px]" aria-hidden="true">
          <div className="h-full w-full" data-reveal>
            <svg className="ink-draw h-full w-full text-ivory/20" viewBox="0 0 160 110" preserveAspectRatio="none" fill="none">
              <line x1="0" y1="20" x2="160" y2="20" pathLength={1} stroke="currentColor" strokeWidth="0.15" />
              <line x1="0" y1="90" x2="160" y2="90" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 200 } as React.CSSProperties} />
              <line x1="40" y1="0" x2="40" y2="110" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 400 } as React.CSSProperties} />
              <line x1="120" y1="0" x2="120" y2="110" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 600 } as React.CSSProperties} />
              <circle cx="120" cy="20" r="18" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 800 } as React.CSSProperties} />
            </svg>
          </div>
        </div>

        {layers.map((l, i) => (
          <div key={l.piece.src} className={`absolute ${l.pos}`} style={{ "--z": l.z } as React.CSSProperties}>
            <div className="frame hero-unmask" style={{ "--i": i } as React.CSSProperties}>
              <Image src={l.piece.src} alt={l.piece.alt} width={l.piece.width} height={l.piece.height} sizes={l.sizes} className="block w-full" />
            </div>
          </div>
        ))}
      </div>
    </HeroStage>
  );
}
