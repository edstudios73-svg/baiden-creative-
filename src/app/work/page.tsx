import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies, publicProjects } from "@/content/projects";
import { getService } from "@/content/services";
import { studio, type StudioPiece } from "@/content/studio";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { ArtFrame } from "@/components/ArtFrame";
import { Carousel } from "@/components/Carousel";
import { CtaBand } from "@/components/CtaBand";
import { ArrowUpRight } from "@/components/icons";
import { Breadcrumbs, ButtonLink, JsonLd, Label, SectionHeading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Explore Our Work",
  description:
    "The Baiden Creatives portfolio: featured projects, every live site we've built, web and app interface design, and brand identities and campaigns.",
  path: "/work",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;

const webDesign: StudioPiece[] = [studio.foody, studio.burgerWeb, studio.restaurantDesktop, studio.biteNow, studio.healingBird, studio.luxeva, studio.cinnamon];
const appDesign: StudioPiece[] = [studio.furnitureBlue, studio.flowerApp, studio.barber, studio.eventApp, studio.furnitureRental, studio.furnitureLight];
const brandStudio: StudioPiece[] = [studio.kwabszzMonogram, studio.slushify, studio.awesomeLogo, studio.layera, studio.foodVisual, studio.steelJee, studio.kwabszzCard];

export default function WorkPage() {
  // Every print piece from the case studies (flyers, menus, launch artwork, posters) joins the studio pieces.
  const caseArtwork = caseStudies.flatMap((p) =>
    p.gallery.filter((g) => g.kind === "print").map((g) => ({ ...g, title: p.title, kind: "Campaign" })),
  );
  const brandWall = [...brandStudio.slice(0, 4), ...caseArtwork.slice(0, 4), ...brandStudio.slice(4), ...caseArtwork.slice(4)];
  const studioCount = webDesign.length + appDesign.length + brandWall.length;

  const stats = [
    { n: publicProjects.length, label: "Live projects" },
    { n: caseStudies.length, label: "Featured case studies" },
    { n: studioCount, label: "Studio pieces" },
    { n: 1, label: "Original product" },
  ];
  const chapters = [
    ["#featured", "Featured"],
    ["#index", "Index"],
    ["#web", "Web"],
    ["#apps", "Apps"],
    ["#brand", "Brand & campaigns"],
  ];

  return (
    <>
      {/* ── Hero (black) ─────────────────────────────────────────── */}
      <header className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="container-x pt-8 pb-12 md:pt-12 md:pb-16">
          <Breadcrumbs items={crumbs} tone="dark" />
          <h1 className="text-display-1 mt-10 md:mt-14">
            <span className="line-mask">
              <span style={v(1)}>Work that speaks</span>
            </span>
            <span className="line-mask">
              <span className="italic" style={v(2)}>
                for itself.
              </span>
            </span>
          </h1>
          <p className="text-lead hero-line mt-8 max-w-xl text-mist" style={v(3)}>
            Live websites, platforms and stores, interface design, and the identities and campaigns behind them. Every piece here is real.
          </p>

          <dl className="hero-line mt-12 grid grid-cols-2 border-t border-line-dark md:grid-cols-4" style={v(4)}>
            {stats.map((s, i) => (
              <div key={s.label} className={`border-b border-line-dark py-6 md:border-b-0 ${i % 2 === 0 ? "pr-4" : "border-l border-line-dark pl-4"} md:border-l md:px-6 md:first:border-l-0 md:first:pl-0`}>
                <dt className="text-label text-mist">{s.label}</dt>
                <dd className="text-display-2 mt-2 tabular-nums">{String(s.n).padStart(2, "0")}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Sections" className="hero-line mt-10 flex flex-wrap gap-2" style={v(5)}>
            {chapters.map(([href, label]) => (
              <a key={href} href={href} className="border border-ivory/30 px-4 py-2.5 text-sm transition-colors duration-300 hover:bg-ivory hover:text-ink">
                {label}
              </a>
            ))}
          </nav>
        </div>
        <span aria-hidden="true" className="rule-draw hero-rule absolute inset-x-0 bottom-0 text-ivory/20" />
      </header>

      {/* ── Featured case studies (white) ────────────────────────── */}
      <section id="featured" className="section-y scroll-mt-16" aria-labelledby="featured-title">
        <div className="container-x">
          <SectionHeading label="(01) Featured" title={<span id="featured-title">Case studies, start to finish.</span>} />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="Featured projects"
              slideClassName="w-[90%] md:w-[80%] lg:w-[70%]"
              slides={caseStudies.map((p, i) => {
                const services = p.services.map(getService).filter((s) => s !== undefined);
                return (
                  <article key={p.slug} className="group">
                    <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="frame img-zoom relative block aspect-[4/3] sm:aspect-[16/10]">
                      <Image src={p.coverImage.src} alt={p.coverImage.alt} fill sizes="(min-width: 1024px) 70vw, 90vw" className="object-cover object-top" />
                      <span className="sr-only">Visit {p.title} (opens in a new tab)</span>
                    </a>
                    <div className="mt-6 grid gap-6 md:grid-cols-12 md:gap-8">
                      <p className="text-display-2 leading-none tabular-nums md:col-span-2" aria-hidden="true">
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <div className="md:col-span-6">
                        <p className="text-label flex flex-wrap items-center gap-2 text-graphite">
                          {p.category}
                          {p.inHouse && <span className="border border-ink px-1.5 py-0.5 text-ink">Original product</span>}
                        </p>
                        <h3 className="text-display-3 mt-3">{p.title}</h3>
                        <p className="mt-4 text-graphite">{p.summary}</p>
                        {p.challenge && <p className="mt-4 border-l border-ink pl-4 text-[0.95rem]">{p.challenge}</p>}
                      </div>
                      <div className="md:col-span-4">
                      <dl className="grid content-start gap-4 border-t border-ink pt-4 text-sm">
                        <div>
                          <dt className="text-label text-graphite">{p.inHouse ? "Owner" : "Client"}</dt>
                          <dd className="mt-1">{p.clientOrOwner}</dd>
                        </div>
                        <div>
                          <dt className="text-label text-graphite">Our role</dt>
                          <dd className="mt-1">{p.projectRole.join(", ")}</dd>
                        </div>
                        <div>
                          <dt className="text-label text-graphite">Disciplines</dt>
                          <dd className="mt-1">{services.map((s) => s.shortTitle).join(" · ")}</dd>
                        </div>
                        {p.technologies.length > 0 && (
                          <div>
                            <dt className="text-label text-graphite">Built with</dt>
                            <dd className="mt-1">{p.technologies.join(", ")}</dd>
                          </div>
                        )}
                      </dl>
                      {p.externalUrl && (
                        <ButtonLink href={p.externalUrl} variant="secondary" className="mt-6 w-full">
                          Visit the live site
                        </ButtonLink>
                      )}
                      </div>
                    </div>
                  </article>
                );
              })}
            />
          </div>
        </div>
      </section>

      {/* ── Project index (black) ────────────────────────────────── */}
      <section id="index" className="on-dark section-y scroll-mt-16 bg-ink text-ivory" aria-labelledby="index-title">
        <div className="container-x">
          <SectionHeading tone="dark" label="(02) Index" title={<span id="index-title">Every live project.</span>} intro="All online now. Open any of them in a new tab." />
          <ol className="mt-10 border-t border-ivory/40 md:mt-12">
            {publicProjects.map((p, i) => (
              <li key={p.slug} id={p.slug} className="group relative scroll-mt-24 border-b border-line-dark">
                <a
                  href={p.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="-mx-3 grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 px-3 py-5 transition-colors duration-300 group-target:bg-ivory/10 hover:bg-ivory hover:text-ink md:grid-cols-[3.5rem_1.4fr_1fr_1fr_auto] md:py-6"
                >
                  <span className="text-label text-mist transition-colors group-hover:text-graphite">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="text-heading block">{p.title}</span>
                    <span className="text-label mt-1 block text-mist transition-colors group-hover:text-graphite md:hidden">{p.category}</span>
                  </span>
                  <span className="hidden text-mist transition-colors group-hover:text-graphite md:block">{p.category}</span>
                  <span className="hidden text-mist transition-colors group-hover:text-graphite md:block">{p.projectRole[0]}</span>
                  <span className="grid size-10 place-items-center border border-current">
                    <ArrowUpRight className="size-4" />
                  </span>
                  <span className="sr-only">(opens {p.title} in a new tab)</span>
                </a>
                {/* Desktop preview that appears with the hovered row */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-24 z-10 hidden aspect-[16/10] w-64 -translate-y-1/2 scale-95 overflow-hidden border border-ink opacity-0 shadow-[0_30px_50px_-25px_rgb(0_0_0/0.6)] transition-[opacity,transform] duration-500 group-hover:scale-100 group-hover:opacity-100 xl:block"
                >
                  <Image src={p.coverImage.src} alt="" fill sizes="256px" className="object-cover object-top" />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Web design (white) ───────────────────────────────────── */}
      <section id="web" className="section-y scroll-mt-16" aria-labelledby="web-title">
        <div className="container-x">
          <SectionHeading label="(03) Web design" title={<span id="web-title">Interfaces for the web.</span>} intro="Landing pages, online stores and restaurant sites, designed screen by screen." />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="Web design"
              slideClassName="w-[82%] sm:w-[52%] lg:w-[36%]"
              slides={webDesign.map((w, i) => (
                <ArtFrame key={w.src} piece={w} index={i} reveal={false} sizes="(min-width: 1024px) 36vw, (min-width: 640px) 52vw, 82vw" />
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── App UI (black) ───────────────────────────────────────── */}
      <section id="apps" className="on-dark section-y scroll-mt-16 bg-ink text-ivory" aria-labelledby="apps-title">
        <div className="container-x">
          <SectionHeading tone="dark" label="(04) App UI" title={<span id="apps-title">Interfaces for the pocket.</span>} intro="Commerce, booking and service apps: home, product and checkout flows." />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="App interface design"
              tone="dark"
              slideClassName="w-[86%] sm:w-[58%] lg:w-[42%]"
              slides={appDesign.map((w, i) => (
                <ArtFrame key={w.src} piece={w} index={i} tone="dark" reveal={false} sizes="(min-width: 1024px) 42vw, (min-width: 640px) 58vw, 86vw" />
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── Brand & campaigns: salon hang (white) ────────────────── */}
      <section id="brand" className="section-y scroll-mt-16" aria-labelledby="brand-title">
        <div className="container-x">
          <SectionHeading label="(05) Brand & campaigns" title={<span id="brand-title">Identities, posters and launches.</span>} intro="Logos, menus, event series and launch artwork, hung as they were made: uncropped." />
          <div className="mt-10 columns-2 gap-4 sm:gap-6 md:mt-12 md:columns-3 lg:columns-4 lg:gap-8">
            {brandWall.map((w, i) => (
              <div key={w.src} className="mb-8 break-inside-avoid md:mb-10">
                <ArtFrame piece={w} index={i} style={{ "--reveal-delay": i % 4 } as React.CSSProperties} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw" />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6 border-t border-ink pt-6">
            <Label className="text-graphite">More on {site.handle}</Label>
            <ButtonLink href="/contact">Start a Project</ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand title={<>Your project could be <em>next.</em></>} />
      <JsonLd data={graph(breadcrumbLd(crumbs), { "@type": "CollectionPage", url: `${site.url}/work`, name: "Explore our work", about: { "@id": `${site.url}/#organization` } })} />
    </>
  );
}
