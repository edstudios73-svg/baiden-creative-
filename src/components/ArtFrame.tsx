import Image from "next/image";
import type { CSSProperties } from "react";

export type FramedPiece = { src: string; width: number; height: number; alt: string; title: string; kind: string };

/**
 * Gallery-style frame: solid frame, mat with a fine inner line, the artwork at its natural proportions
 * (never cropped), and a museum plaque underneath. Inverts on dark sections.
 */
export function ArtFrame({
  piece,
  index,
  tone = "light",
  sizes = "(min-width: 1024px) 25vw, 50vw",
  reveal = true,
  style,
}: {
  piece: FramedPiece;
  index?: number;
  tone?: "light" | "dark";
  sizes?: string;
  reveal?: boolean;
  style?: CSSProperties;
}) {
  return (
    <figure className={`art group ${tone === "dark" ? "art-dark" : ""}`} {...(reveal ? { "data-reveal": "" } : {})} style={style}>
      <div className="art-frame">
        <div className="art-mat">
          <Image src={piece.src} alt={piece.alt} width={piece.width} height={piece.height} sizes={sizes} className="art-img block h-auto w-full" />
        </div>
      </div>
      <figcaption className="art-plaque">
        {index !== undefined && <span className="text-label">No. {String(index + 1).padStart(2, "0")}</span>}
        <span className="art-title">{piece.title}</span>
        <span className="text-label art-kind">{piece.kind}</span>
      </figcaption>
    </figure>
  );
}
