import type { Metadata } from "next";
import Image from "next/image";
import { caseStudies } from "@/content/projects";
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
            Products we design, build and run from Accra.
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
            intro="Verified people, safe payments and everything needed to build, in one place."
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

      {/* ── Each product: name, cover, three points ────────────────── */}
      {products.map((p, i) => {
        const dark = i % 2 === 0;
        return (
          <section
            key={p.slug}
            id={p.slug}
            className={`section-y scroll-mt-16 ${dark ? "on-dark bg-ink text-ivory" : ""}`}
            aria-labelledby={`${p.slug}-title`}
          >
            <div className="container-x">
              <div className="grid gap-6 md:grid-cols-12 md:items-end">
                <div className="md:col-span-8">
                  <Label className={dark ? "text-mist" : "text-graphite"}>
                    {String(i + 1).padStart(2, "0")} · {statusOf(p)}
                  </Label>
                  <h2 id={`${p.slug}-title`} className="text-display-2 mt-4">
                    {p.title}
                    {p.family && <em className="whitespace-nowrap"> by {p.family}</em>}
                  </h2>
                  <p className={`text-lead mt-3 ${dark ? "text-mist" : "text-graphite"}`}>{p.tagline}</p>
                </div>
                <div className="grid gap-3 md:col-span-4">
                  {p.slug === "baid-x" && (
                    <ButtonLink href="/baid-x" tone={dark ? "dark" : "light"}>
                      Read the story
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

              <div className="frame relative mt-8 aspect-[16/10] overflow-hidden md:mt-10">
                {p.coverImage ? (
                  <Image src={p.coverImage.src} alt={p.coverImage.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" className="object-cover object-top" />
                ) : (
                  <ProductPoster project={p} tone={dark ? "light" : "dark"} />
                )}
              </div>

              {p.highlights && (
                <ul className={`mt-8 grid border-t sm:grid-cols-3 ${dark ? "border-ivory/25" : "border-ink"}`}>
                  {p.highlights.map((h, j) => (
                    <li
                      key={h}
                      className={`flex items-baseline gap-4 border-b py-5 sm:border-b-0 sm:px-6 sm:first:pl-0 ${dark ? "border-ivory/25" : "border-ink/15"} ${
                        j > 0 ? (dark ? "sm:border-l sm:border-ivory/25" : "sm:border-l sm:border-ink/15") : ""
                      }`}
                    >
                      <span className={`text-label ${dark ? "text-mist" : "text-graphite"}`}>{String(j + 1).padStart(2, "0")}</span>
                      <span className="text-heading">{h}</span>
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
