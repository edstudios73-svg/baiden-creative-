import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { baidx } from "@/content/products";
import { baidxLd, breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/Gallery";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs, ButtonLink, JsonLd, Label } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "BAID X: Ghana's Work Network",
  description:
    "BAID X, an original product by Baiden Creatives: hire verified professionals across Ghana, with payments held in escrow until the work is approved.",
  path: "/products/baid-x",
  image: baidx.images.hero,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "BAID X", path: "/products/baid-x" },
];

const gallery = [
  { src: "/assets/work/baidx-launch-flyer-1.jpg", alt: "BAID X launch artwork: how the platform works", width: 864, height: 1080, kind: "print" as const },
  { src: "/assets/work/baidx-launch-flyer-2.jpg", alt: "BAID X launch artwork for buyers and suppliers", width: 864, height: 1080, kind: "print" as const },
  { ...baidx.images.roles, kind: "print" as const },
];

export default function BaidxPage() {
  return (
    <>
      <div className="on-dark bg-ink text-ivory">
        <header className="container-x pt-10 pb-16 md:pt-16 md:pb-24">
          <Breadcrumbs items={crumbs} tone="dark" />
          <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-label text-lime">An original product by {site.name}</p>
              <h1 className="text-display-1 mt-6">{baidx.name}</h1>
              <p className="text-display-3 mt-4 text-mist italic">{baidx.tagline}</p>
            </div>
            <div className="lg:col-span-5">
              <p className="text-lead text-ivory/90">{baidx.overview}</p>
              <p className="text-label mt-6 text-mist">{baidx.category}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <ButtonLink href={baidx.url} tone="dark">
                  Visit baid-x.com
                </ButtonLink>
                <ButtonLink href={baidx.caseStudy} tone="dark" variant="secondary">
                  Read the case study
                </ButtonLink>
              </div>
            </div>
          </div>
        </header>
        <div className="container-x pb-20 md:pb-28">
          <div className="frame aspect-[16/10]">
            <Image src={baidx.images.hero.src} alt={baidx.images.hero.alt} fill priority sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover object-top" />
          </div>
          <p className="text-label mt-4 text-mist">The live BAID X homepage</p>
        </div>
      </div>

      <section className="section-y" aria-labelledby="problem-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="problem-title" className="text-label text-graphite lg:col-span-3">
            The problem
          </h2>
          <p className="text-display-3 lg:col-span-9" data-reveal>
            {baidx.problem}
          </p>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="users-title">
        <div className="container-x">
          <Label className="text-graphite">Who it&apos;s for</Label>
          <h2 id="users-title" className="text-display-3 mt-4 max-w-2xl">
            Five account types, one network.
          </h2>
          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {baidx.users.map((u, i) => (
              <li key={u.title} className="border-t border-ink/80 pt-5" data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
                <span className="text-label text-graphite">0{i + 1}</span>
                <h3 className="text-heading mt-3">{u.title}</h3>
                <p className="mt-3 text-graphite">{u.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="live-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <p className="text-label flex items-center gap-2 text-graphite">
              <span aria-hidden="true" className="size-2 rounded-full bg-lime ring-1 ring-ink" /> Live today
            </p>
            <h2 id="live-title" className="text-display-3 mt-4">
              What BAID X does now.
            </h2>
            <p className="mt-6 text-graphite">Checked against the live product on baid-x.com.</p>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {baidx.live.map((f) => (
              <li key={f.title} className="border-t border-line pt-5" data-reveal>
                <h3 className="text-heading">{f.title}</h3>
                <p className="mt-3 text-graphite">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-paper" aria-labelledby="dev-title">
        <div className="container-x grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <p className="text-label flex items-center gap-2 text-graphite">
              <span aria-hidden="true" className="size-2 rounded-full border border-ink" /> In development
            </p>
            <h2 id="dev-title" className="text-display-3 mt-4">
              Not live yet.
            </h2>
          </div>
          <ul className="grid gap-6 lg:col-span-5">
            {baidx.inDevelopment.map((f) => (
              <li key={f.title}>
                <h3 className="text-heading">{f.title}</h3>
                <p className="mt-3 text-graphite">{f.body}</p>
              </li>
            ))}
          </ul>
          <div className="mx-auto w-40 lg:col-span-3 lg:w-48">
            <div className="frame-phone">
              <Image src={baidx.images.app.src} alt={baidx.images.app.alt} width={baidx.images.app.width} height={baidx.images.app.height} sizes="12rem" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="launch-title">
        <div className="container-x">
          <Label className="text-graphite">Launch campaign</Label>
          <h2 id="launch-title" className="text-display-3 mt-4 mb-12 max-w-2xl">
            One identity from the interface to the street.
          </h2>
          <Gallery images={gallery} label="BAID X launch artwork" />
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="relationship-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <h2 id="relationship-title" className="text-label text-graphite lg:col-span-3">
            BAID X &amp; {site.name}
          </h2>
          <div className="prose-bc max-w-3xl text-lg lg:col-span-9">
            <p>
              BAID X is an original product created by {site.name}. We conceived it, designed it and built it. It wasn&apos;t
              commissioned by a client.
            </p>
            <p className="text-graphite">
              BAID X has its own name, brand and audience, kept separate from the {site.name} studio identity. To use BAID X, create an
              account or get support, go to <a className="link-draw text-ink" href={baidx.url} target="_blank" rel="noopener noreferrer">baid-x.com<span className="sr-only"> (opens in a new tab)</span></a>.
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Have a platform idea <em className="text-lime">of your own?</em>
          </>
        }
        body="We bring the product thinking, design and engineering behind BAID X to founders and companies building their own platforms."
      />
      <JsonLd data={graph(breadcrumbLd(crumbs), baidxLd(baidx))} />
    </>
  );
}
