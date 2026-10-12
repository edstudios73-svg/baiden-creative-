import Image from "next/image";
import { HeroStage } from "./HeroStage";

const layers = [
  {
    src: "/assets/work/sites/bold.jpg",
    alt: "Bold Restaurant Ghana website: homepage",
    w: 1280,
    h: 800,
    pos: "top-[2%] left-[4%] w-[68%]",
    z: "-70px",
    sizes: "(min-width: 1024px) 40vw, 70vw",
  },
  {
    src: "/assets/work/sites/csc.jpg",
    alt: "Christian Service Church website: homepage",
    w: 1280,
    h: 800,
    pos: "top-[34%] right-0 w-[58%]",
    z: "30px",
    sizes: "(min-width: 1024px) 34vw, 60vw",
  },
  {
    src: "/assets/work/eslyn-logo.jpg",
    alt: "Eslyn Local Kitchen and Pub logo",
    w: 1080,
    h: 663,
    pos: "top-[5%] right-[3%] w-[26%]",
    z: "110px",
    sizes: "(min-width: 1024px) 16vw, 28vw",
  },
];

/**
 * Hero composition in depth, built only from real work. Each layer is unmasked on load, and on larger
 * screens the stack tilts and moves through depth as the visitor scrolls (see .stage3d in globals.css).
 */
export function HeroVisual() {
  return (
    <HeroStage className="stage3d relative aspect-[5/4] w-full sm:aspect-[16/11]">
      <div className="stage3d-inner absolute inset-0" role="group" aria-label="Selected work: Bold Restaurant, Christian Service Church, Eslyn and Blackboy's Vault">
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
          <div key={l.src} className={`absolute ${l.pos}`} style={{ "--z": l.z } as React.CSSProperties}>
            <div className="frame hero-unmask" style={{ "--i": i } as React.CSSProperties}>
              <Image src={l.src} alt={l.alt} width={l.w} height={l.h} priority={i < 2} sizes={l.sizes} className="block w-full" />
            </div>
          </div>
        ))}

        <div className="absolute bottom-0 left-0 w-[23%] min-w-[92px]" style={{ "--z": "160px" } as React.CSSProperties}>
          <div className="hero-unmask rounded-[1.6rem] border border-ivory/25 bg-ink p-[0.35rem]" style={{ "--i": 3 } as React.CSSProperties}>
            <Image
              src="/assets/work/vault/01-home.jpg"
              alt="Blackboy's Vault mobile store: home screen"
              width={585}
              height={1266}
              priority
              sizes="(min-width: 1024px) 14vw, 26vw"
              className="block w-full rounded-[1.3rem]"
            />
          </div>
        </div>
      </div>
    </HeroStage>
  );
}
