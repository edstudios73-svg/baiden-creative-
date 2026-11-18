import Image from "next/image";
import type { Img } from "@/content/types";
import { getCaseStudy } from "@/content/projects";
import { HeroStage } from "./HeroStage";

const baidx = getCaseStudy("baid-x");
const skinLab = getCaseStudy("skin-lab");
const propertiq = getCaseStudy("propertiq");

const layers = [
  { piece: baidx?.coverImage, pos: "top-[3%] left-0 w-[64%]", z: "-80px", sizes: "(min-width: 1024px) 38vw, 1px" },
  { piece: skinLab?.coverImage, pos: "top-[40%] right-0 w-[56%]", z: "30px", sizes: "(min-width: 1024px) 34vw, 1px" },
  { piece: propertiq?.gallery[1], pos: "top-0 right-[6%] w-[20%]", z: "110px", sizes: "(min-width: 1024px) 12vw, 1px" },
  { piece: skinLab?.gallery[1], pos: "bottom-0 left-[8%] w-[17%]", z: "170px", sizes: "(min-width: 1024px) 10vw, 1px" },
].filter((l): l is typeof l & { piece: Img } => l.piece !== undefined);

/**
 * Desktop hero composition in depth, built from our own products. Each layer is unmasked on load
 * and the stack tilts and moves through depth with scroll (see .stage3d in globals.css).
 * Phones get the products band instead.
 */
export function HeroVisual() {
  return (
    <HeroStage className="stage3d relative aspect-[16/11] w-full">
      <div className="stage3d-inner absolute inset-0" role="group" aria-label="Our products: BAID X, Skin Lab and PropertIQ">
        {/* Fine construction lines behind the work */}
        <div className="absolute inset-0 [--z:-140px]" aria-hidden="true">
          <div className="h-full w-full" data-reveal>
            <svg className="ink-draw h-full w-full text-ivory/20" viewBox="0 0 160 110" preserveAspectRatio="none" fill="none">
              <path d="M0 20H160" pathLength={1} stroke="currentColor" strokeWidth="0.15" />
              <path d="M0 90H160" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 200 } as React.CSSProperties} />
              <path d="M40 0V110" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 400 } as React.CSSProperties} />
              <path d="M120 0V110" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 600 } as React.CSSProperties} />
              <path d="M138 20a18 18 0 1 1-36 0a18 18 0 1 1 36 0" pathLength={1} stroke="currentColor" strokeWidth="0.15" style={{ "--d": 800 } as React.CSSProperties} />
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
