import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies } from "@/content/projects";
import { getService } from "@/content/services";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { CtaBand } from "@/components/CtaBand";
import { ProductPoster } from "@/components/ProductPoster";
import { ArrowUpRight } from "@/components/icons";
import { Breadcrumbs, ButtonLink, JsonLd, Label, SectionHeading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Our Products",
  description:
    "The products Baiden Creatives designs, builds and runs from Accra: BAID X, Ghana's work network, with Blueprint for house plans and SiteMart for equipment and materials; Skin Lab, laptop stickers and skins; and PropertIQ, property in Accra.",
  path: "/work",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/work" },
];

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;

// How the BAID X family fits together, from the drawing to the finished building.
const journey = [
  { step: "Plan", slug: "blueprint", product: "Blueprint", body: "Choose and buy your house design." },
  { step: "Supply", slug: "sitemart", product: "SiteMart", body: "Get the equipment and building materials." },
  { step: "Build", slug: "baid-x", product: "BAID X", body: "Hire verified workers and manage the project." },
];

const statusOf = (p: { externalUrl?: string; status?: string }) => (p.externalUrl ? "Live" : (p.status ?? "Coming soon"));

export default function WorkPage() {
  const products = caseStudies.filter((p) => p.inHouse);

  return (
    <>
      {/* ── Hero (black) ─────────────────────────────────────────── */}
      <header className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="container-x pt-8 pb-12 md:pt-12 md:pb-16">
          <Breadcrumbs items={crumbs} tone="dark" />
          <h1 className="text-display-1 mt-10 md:mt-14">
            <span className="line-mask">
              <span style={v(1)}>We build what</span>
            </span>
            <span className="line-mask">
              <span className="italic" style={v(2)}>
                we believe in.
              </span>
            </span>
          </h1>
          <p className="text-lead hero-line mt-8 max-w-xl text-mist" style={v(3)}>
            Alongside the businesses we partner with, we design, build and run products of our own. Each one started as an idea in the studio.
          </p>

          {/* The products, as an index */}
          <ol className="hero-line mt-12 border-t border-line-dark" style={v(4)}>
            {products.map((p, i) => (
              <li key={p.slug} className="border-b border-line-dark">
                <a
                  href={`#${p.slug}`}
                  className="-mx-3 grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 px-3 py-5 transition-colors duration-300 hover:bg-ivory hover:text-ink md:grid-cols-[3.5rem_1.2fr_1.4fr_auto] md:py-6"
                >
                  <span className="text-label text-mist">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-display-3">
                    {p.title}
                    {p.family && <em className="whitespace-nowrap text-mist"> by {p.family}</em>}
                  </span>
                  <span className="hidden text-mist md:block">{p.tagline}</span>
                  <span className="text-label text-mist">{statusOf(p)}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
        <span aria-hidden="true" className="rule-draw hero-rule absolute inset-x-0 bottom-0 text-ivory/20" />
      </header>

      {/* ── Plan, supply, build: the BAID X family (white) ────────── */}
      <section className="section-y" aria-labelledby="journey-title">
        <div className="container-x">
          <SectionHeading
            label="The BAID X family"
            title={
              <span id="journey-title">
                Plan. Supply. <em>Build.</em>
              </span>
            }
            intro="Three products, one promise: verified people, safe payments and everything needed to build, in one place."
          />
          <ol className="mt-10 grid border-t border-ink md:mt-14 md:grid-cols-3">
            {journey.map((j, i) => (
              <li key={j.step} className={`border-b border-ink md:border-b-0 ${i > 0 ? "md:border-l" : ""}`}>
                <a href={`#${j.slug}`} className="group flex h-full flex-col gap-6 py-8 transition-colors duration-500 hover:bg-ink hover:text-ivory md:px-8 md:py-10 md:first:pl-0">
                  <span className="text-label text-graphite group-hover:text-mist">
                    {String(i + 1).padStart(2, "0")} · {j.step}
                  </span>
                  <span className="text-display-2 leading-none">{j.product}</span>
                  <span className="text-graphite group-hover:text-mist">{j.body}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Each product, in full ─────────────────────────────────── */}
      {products.map((p, i) => {
        const dark = i % 2 === 0;
        const services = p.services.map(getService).filter((s) => s !== undefined);
        const phones = p.gallery.filter((g) => g.kind === "phone").slice(0, 3);
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`section-y scroll-mt-16 ${dark ? "on-dark bg-ink text-ivory" : ""}`}
            aria-labelledby={`${p.slug}-title`}
          >
            <div className="container-x">
              <SectionHeading
                tone={dark ? "dark" : undefined}
                label={`(${String(i + 1).padStart(2, "0")}) ${p.category}`}
                title={
                  <span id={`${p.slug}-title`}>
                    {p.title}
                    {p.family && <em> by {p.family}</em>}
                  </span>
                }
                intro={p.summary}
              />

              <div className="frame relative mt-10 aspect-[16/10] overflow-hidden md:mt-12">
                {p.coverImage ? (
                  <Image src={p.coverImage.src} alt={p.coverImage.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-top" />
                ) : (
                  <ProductPoster project={p} tone={dark ? "light" : "dark"} />
                )}
              </div>

              <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12">
                <div className="md:col-span-7">
                  {p.challenge && (
                    <>
                      <Label className={dark ? "text-mist" : "text-graphite"}>{p.externalUrl ? "Why we built it" : "Why we're building it"}</Label>
                      <p className="text-heading mt-4">{p.challenge}</p>
                    </>
                  )}
                  {p.solution && p.solution.length > 0 && (
                    <ul className="mt-8 grid gap-3">
                      {p.solution.map((s) => (
                        <li key={s} className={`flex gap-4 border-t pt-3 ${dark ? "border-ivory/20 text-mist" : "border-ink/15 text-graphite"}`}>
                          <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-current" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="md:col-span-4 md:col-start-9">
                  <dl className={`grid content-start gap-4 border-t pt-4 text-sm ${dark ? "border-ivory" : "border-ink"}`}>
                    <div>
                      <dt className={`text-label ${dark ? "text-mist" : "text-graphite"}`}>Our role</dt>
                      <dd className="mt-1">{p.projectRole.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className={`text-label ${dark ? "text-mist" : "text-graphite"}`}>Disciplines</dt>
                      <dd className="mt-1">{services.map((s) => s.shortTitle).join(" · ")}</dd>
                    </div>
                    <div>
                      <dt className={`text-label ${dark ? "text-mist" : "text-graphite"}`}>Status</dt>
                      <dd className="mt-1">{statusOf(p)}</dd>
                    </div>
                  </dl>
                  <div className="mt-6 grid gap-3">
                    {p.slug === "baid-x" && (
                      <ButtonLink href="/baid-x" tone={dark ? "dark" : undefined}>
                        Read the BAID X story
                      </ButtonLink>
                    )}
                    {p.externalUrl && (
                      <a
                        href={p.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between border px-5 py-3.5 text-sm transition-colors duration-300 ${
                          dark ? "border-ivory/40 hover:bg-ivory hover:text-ink" : "border-ink hover:bg-ink hover:text-ivory"
                        }`}
                      >
                        Visit {p.externalUrl.replace(/^https?:\/\/(www\.)?/, "")}
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {phones.length > 0 && (
                <ul className="mt-12 grid grid-cols-3 gap-3 md:mt-16 md:gap-8" aria-label={`${p.title} on a phone`}>
                  {phones.map((g) => (
                    <li key={g.src} className={`frame overflow-hidden ${dark ? "border-ivory/20" : ""}`}>
                      <Image src={g.src} alt={g.alt} width={g.width} height={g.height} sizes="(min-width: 768px) 30vw, 32vw" className="block h-auto w-full" />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        );
      })}

      <CtaBand title={<>Have an idea worth <em>building?</em></>} />
      <JsonLd
        data={graph(breadcrumbLd(crumbs), {
          "@type": "CollectionPage",
          url: `${site.url}/work`,
          name: "Our products",
          about: { "@id": `${site.url}/#organization` },
        })}
      />
    </>
  );
}
