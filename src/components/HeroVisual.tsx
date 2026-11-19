import Image from "next/image";
import type { Img } from "@/content/types";
import { getCaseStudy } from "@/content/projects";

// Product screens: one large, two stacked beside it, all at the same 16:10 proportion.
const tiles = [
  { project: getCaseStudy("baid-x"), area: "col-span-2 row-span-2", sizes: "(min-width: 1024px) 30vw, 1px" },
  { project: getCaseStudy("propertiq"), area: "", sizes: "(min-width: 1024px) 15vw, 1px" },
  { project: getCaseStudy("skin-lab"), area: "", sizes: "(min-width: 1024px) 15vw, 1px" },
].flatMap((t) => (t.project?.coverImage ? [{ ...t, title: t.project.title, image: t.project.coverImage as Img }] : []));

/** Desktop hero: our product screens in an aligned grid. Phones get the products band instead. */
export function HeroVisual() {
  return (
    <figure className="w-full">
      <ul className="grid grid-cols-3 grid-rows-2 gap-3" aria-label="Our products">
        {tiles.map((t) => (
          <li key={t.title} className={`frame relative overflow-hidden ${t.area || "aspect-[16/10]"}`}>
            <Image src={t.image.src} alt={t.image.alt} fill sizes={t.sizes} loading="eager" className="object-cover object-top" />
            <span className="text-label absolute bottom-0 left-0 bg-ink px-2.5 py-1.5 text-ivory">{t.title}</span>
          </li>
        ))}
      </ul>
      <figcaption className="text-label mt-4 flex justify-between gap-4 text-mist">
        <span>Our products</span>
        <span>{tiles.map((t) => t.title).join(" · ")}</span>
      </figcaption>
    </figure>
  );
}
