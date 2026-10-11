import Image from "next/image";
import { baidx } from "@/content/products";
import { ButtonLink, Label } from "./ui";

/** BAID X introduced as an original product. Live capabilities and in-development work are kept visibly separate. */
export function BaidxFeature({ headingLevel: H = "h2" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-5" data-reveal>
        <Label className="text-mist">Original products</Label>
        <H className="text-display-2 mt-5">
          {baidx.name}
          <span className="block text-mist italic">{baidx.tagline}</span>
        </H>
        <p className="text-label mt-6 text-lime">An original product by Baiden Creatives</p>
        <p className="text-lead mt-6 text-ivory/90">{baidx.overview}</p>
        <p className="mt-5 text-mist">{baidx.category}. Conceived, designed and built by our team rather than commissioned by a client.</p>

        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div>
            <p className="text-label flex items-center gap-2 text-ivory">
              <span aria-hidden="true" className="size-2 rounded-full bg-lime" /> Live today
            </p>
            <ul className="mt-4 grid gap-2 text-mist">
              {baidx.live.slice(0, 4).map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-label flex items-center gap-2 text-ivory">
              <span aria-hidden="true" className="size-2 rounded-full border border-mist" /> In development
            </p>
            <ul className="mt-4 grid gap-2 text-mist">
              {baidx.inDevelopment.map((f) => (
                <li key={f.title}>{f.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          <ButtonLink href="/products/baid-x" tone="dark">
            Explore BAID X
          </ButtonLink>
          <ButtonLink href={baidx.url} tone="dark" variant="secondary">
            Visit baid-x.com
          </ButtonLink>
        </div>
      </div>

      <div className="relative lg:col-span-7 lg:pl-6" data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
        <div className="frame aspect-[16/10]">
          <Image src={baidx.images.hero.src} alt={baidx.images.hero.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-top" />
        </div>
        <div className="frame relative -mt-[18%] ml-auto w-[38%] translate-x-[-6%] sm:w-[32%]">
          <Image src={baidx.images.roles.src} alt={baidx.images.roles.alt} width={baidx.images.roles.width} height={baidx.images.roles.height} sizes="(min-width: 1024px) 20vw, 38vw" />
        </div>
        <p className="text-label mt-4 text-mist">Live homepage and launch artwork</p>
      </div>
    </div>
  );
}
