import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { caseStudies } from "@/content/projects";
import { services } from "@/content/services";
import { ecosystemPromise } from "@/content/ecosystem";
import { pageMetadata } from "@/lib/seo";
import { HeroVisual } from "@/components/HeroVisual";
import { PhraseRotator } from "@/components/PhraseRotator";
import { CtaBand } from "@/components/CtaBand";
import { Ecosystem } from "@/components/Ecosystem";
import { ArrowRight } from "@/components/icons";
import { ArrowLink, ButtonLink, Label, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({
    title: site.name,
    description: site.description,
    path: "/",
  }),
  // Search results show the name alone, like a personal site: "Baiden Creatives".
  title: { absolute: site.name },
};


const v = (n: number) => ({ "--i": n }) as React.CSSProperties;
const delay = (n: number) => ({ "--reveal-delay": n }) as React.CSSProperties;

export default function HomePage() {
  const showcase = caseStudies.filter((p) => p.inHouse);
  const productHref = (slug: string) => (slug === "baid-x" ? "/baid-x" : `/work#${slug}`);

  return (
    <>
      {/* ── Hero (black) ─────────────────────────────────────────── */}
      <section className="on-dark relative overflow-x-clip bg-ink text-ivory" aria-labelledby="hero-title">
        <div className="container-x pt-8 md:pt-14">
          <div className="hero-line flex flex-wrap items-center justify-between gap-4 text-label text-mist" style={v(0)}>
            <span>Creative &amp; technology company · {site.base}</span>
            <span className="hidden sm:block">Design / Technology / Brand</span>
          </div>
          <span aria-hidden="true" className="rule-draw hero-rule mt-5 text-ivory/25" style={v(0)} />

          <div className="mt-8 grid gap-10 md:mt-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6 xl:col-span-5">
              <h1 id="hero-title" className="text-display-1 lg:text-[clamp(4rem,1.2rem+4.4vw,6.75rem)]">
                <span className="line-mask">
                  <span style={v(1)}>Built from</span>
                </span>
                <span className="line-mask">
                  <span style={v(2)}>imagination.</span>
                </span>
                <span className="line-mask">
                  <span className="italic" style={v(3)}>
                    Made for impact.
                  </span>
                </span>
              </h1>
              <p className="text-heading hero-line mt-6 text-mist" style={v(4)}>
                Ideas into{" "}
                <span className="text-ivory italic">
                  <PhraseRotator phrases={["products", "platforms", "brands", "experiences"]} />
                </span>
              </p>
              <p className="text-lead hero-line mt-8 max-w-md text-ivory/90" style={v(5)}>
                {site.summary}
              </p>
              <div className="hero-line mt-8 grid gap-3 sm:grid-cols-2 lg:max-w-md" style={v(6)}>
                <ButtonLink href="/contact" tone="dark">
                  Start a Project
                </ButtonLink>
                <ButtonLink href="/work" tone="dark" variant="secondary">
                  Our Products
                </ButtonLink>
              </div>
            </div>
            <div className="hidden lg:col-span-6 lg:block xl:col-span-7">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Our products, set as type: the hero's closing band on every screen. */}
        <nav className="hero-line mt-14 pb-10 md:mt-20 md:pb-14" style={v(7)} aria-label="Our products">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <p className="text-label text-mist">Our products</p>
              <p className="text-label hidden text-mist sm:block">Five products · Designed, built and run in Accra</p>
            </div>
            <span aria-hidden="true" className="rule-draw hero-rule mt-4 text-ivory/30" style={v(8)} />
            <ul className="grid sm:grid-cols-2 lg:grid-cols-5">
              {showcase.map((p, i) => (
                <li key={p.slug} className="border-b border-ivory/20 lg:border-b-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-ivory/20">
                  <Link href={productHref(p.slug)} className="group grid h-full grid-cols-[1fr_auto] items-end gap-x-4 gap-y-3 py-6 transition-colors duration-500 hover:bg-ivory hover:text-ink sm:flex sm:flex-col sm:items-start sm:justify-between sm:px-4 lg:min-h-[14rem] lg:px-5 lg:py-7">
                    <span className="text-label col-span-2 text-mist transition-colors group-hover:text-graphite">
                      {String(i + 1).padStart(2, "0")}
                      {p.externalUrl ? "" : ` · ${p.status ?? "Coming soon"}`}
                    </span>
                    <span>
                      <span className="text-display-3 block leading-[0.95]">{p.title}</span>
                      <span className="mt-2 block text-sm text-mist transition-colors group-hover:text-graphite">{p.tagline}</span>
                    </span>
                    <span className="grid size-10 shrink-0 place-items-center border border-ivory/40 transition-colors duration-300 group-hover:border-ink sm:self-end">
                      <ArrowRight className="size-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>

      {/* ── Introduction (white) ─────────────────────────────────── */}
      <section className="section-y" aria-labelledby="intro-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Label className="text-graphite lg:col-span-3">(01) Who we are</Label>
          <div className="lg:col-span-9">
            <h2 id="intro-title" className="text-display-3 max-w-4xl" data-reveal>
              A creative and technology company from Accra. We design, build and run five products of our own.
            </h2>
            <span aria-hidden="true" className="rule-draw mt-10 text-ink" data-reveal="rule" />

            {/* The founders, by name */}
            <p className="text-label mt-8 text-graphite">Founded by</p>
            <ul className="mt-4 grid items-stretch border-y border-ink md:grid-cols-[1fr_auto_1fr]" aria-label="Founders">
              {site.founders.map((f, i) => (
                <li key={f.name} className="contents">
                  {i === 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden items-center justify-center border-x border-ink px-6 font-display text-[clamp(3rem,2rem+3vw,5.5rem)] leading-none italic md:flex"
                    >
                      &amp;
                    </span>
                  )}
                  <div
                    className={`group flex flex-col justify-between gap-6 p-5 transition-colors duration-500 hover:bg-ink hover:text-ivory md:p-7 ${
                      i === 1 ? "border-t border-ink md:border-t-0 md:text-right" : ""
                    }`}
                    data-reveal
                    style={delay(i)}
                  >
                    <span className="text-label text-graphite group-hover:text-mist">
                      {String(i + 1).padStart(2, "0")} · {f.role}
                    </span>
                    <span className="text-display-2 leading-[0.9]">
                      {f.name.split(" ")[0]}
                      <br />
                      <em>{f.name.split(" ").slice(1).join(" ")}</em>
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-6" data-reveal>
              <p className="max-w-xl text-graphite">Brand, interface, code and motion, under one roof.</p>
              <ArrowLink href="/about">About the studio</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services (black) ────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="(02) What we do"
            title={<span id="services-title">Six disciplines. One team.</span>}
            action={<ArrowLink href="/contact">Start a project</ArrowLink>}
          />
          <ul className="mt-12 grid border-t border-ivory/25 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((sv, i) => (
              <li key={sv.slug} className="border-b border-ivory/25 py-7 sm:px-6 sm:[&:nth-child(odd)]:pl-0 lg:[&:nth-child(odd)]:pl-6 lg:[&:nth-child(3n+1)]:pl-0" data-reveal style={delay(i % 3)}>
                <span className="text-label text-mist">{sv.index}</span>
                <h3 className="text-heading mt-4">{sv.title}</h3>
                <p className="mt-2 text-sm text-mist">{sv.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How the products connect (white) ─────────────────────── */}
      <section className="section-y" aria-labelledby="ecosystem-title">
        <div className="container-x">
          <SectionHeading
            label="(03) One ecosystem"
            title={
              <span id="ecosystem-title">
                From the plan <em>to the sale.</em>
              </span>
            }
            intro={ecosystemPromise}
            action={<ArrowLink href="/work">All five products</ArrowLink>}
          />
          <Ecosystem hrefFor={productHref} />
          <p className="mt-8 text-sm text-graphite" data-reveal>
            And Skin Lab, our laptop sticker and skin shop in Accra.{" "}
            <Link href="/work#skin-lab" className="link-draw text-ink">
              See Skin Lab
            </Link>
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
