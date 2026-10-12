import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { mission, philosophy, values, vision } from "@/content/company";
import { featuredProjects, publicProjects } from "@/content/projects";
import { baidx } from "@/content/products";
import { breadcrumbLd, foundersLd, graph, pageMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { Carousel } from "@/components/Carousel";
import { CtaBand } from "@/components/CtaBand";
import { ArrowLink, Breadcrumbs, ButtonLink, JsonLd, Label } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is a creative and technology company founded in Accra by ${site.founders[0].name} and ${site.founders[1].name}. Our story, mission, values and way of working.`,
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

// The studio's story so far, in order. Undated on purpose: only verified facts, no invented timeline.
const chapters = [
  { title: "Two founders, one studio", body: `${site.founders[0].name} and ${site.founders[1].name} start Baiden Creatives in Accra, Ghana.` },
  { title: "Websites that work for a living", body: "Restaurants, churches, stores and service businesses: sites built for phones first, often with an admin the client runs themselves." },
  { title: "Brand, campaigns and motion", body: "Logos, menus, launch flyers and event series, then promotional films composed in code from live products." },
  { title: "BAID X", body: "Our own product: Ghana's work network, with human-checked badges and escrow payments. Live on the web, with a mobile app in development." },
  { title: "The next chapter", body: "Working with ambitious founders and companies, in Ghana and beyond. Yours could be part of it." },
];

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;
const delay = (n: number) => ({ "--reveal-delay": n }) as React.CSSProperties;

export default function AboutPage() {
  return (
    <>
      {/* ── Typographic hero (black) ─────────────────────────────── */}
      <header className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="container-x pt-10 pb-16 md:pt-14 md:pb-24">
          <Breadcrumbs items={crumbs} tone="dark" />
          <h1 className="text-display-1 mt-12 md:mt-16">
            <span className="line-mask">
              <span style={v(1)}>Imagination,</span>
            </span>
            <span className="line-mask md:pl-[12%]">
              <span className="italic" style={v(2)}>
                made to work.
              </span>
            </span>
          </h1>
          <span aria-hidden="true" className="rule-draw hero-rule mt-12 text-ivory/30" style={v(3)} />
          <div className="mt-10 grid gap-8 md:grid-cols-12">
            <p className="text-label hero-line text-mist md:col-span-3" style={v(4)}>
              About {site.name}
            </p>
            <p className="text-lead hero-line max-w-2xl text-ivory/90 md:col-span-7" style={v(5)}>
              {site.name} is a creative and technology company founded in Accra, Ghana. We design and build brands, digital products and
              experiences for ambitious businesses, and we build products of our own.
            </p>
          </div>
        </div>
        {/* Vertical construction lines */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-ivory/10 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-ivory/10 md:block" />
      </header>

      {/* ── Story in chapters (white) ────────────────────────────── */}
      <section className="section-y" aria-labelledby="story-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Our story</Label>
            <h2 id="story-title" className="text-display-3 mt-4">
              A studio, in chapters.
            </h2>
          </div>
          <ol className="relative lg:col-span-8">
            {/* The spine draws itself as the section enters */}
            <span aria-hidden="true" className="absolute top-2 bottom-2 left-[0.6875rem] w-px origin-top bg-ink" data-reveal="spine" />
            {chapters.map((c, i) => (
              <li key={c.title} className="relative grid grid-cols-[2.5rem_1fr] gap-x-4 pb-10 last:pb-0 md:grid-cols-[2.5rem_7rem_1fr]" data-reveal style={delay(i)}>
                <span aria-hidden="true" className={`relative z-10 mt-1.5 size-6 border border-ink ${i === chapters.length - 1 ? "bg-ivory" : "bg-ink"}`} />
                <span className="text-label pt-2 text-graphite">Chapter {["I", "II", "III", "IV", "V"][i]}</span>
                <div className="col-start-2 md:col-start-3">
                  <h3 className="text-heading">{c.title}</h3>
                  <p className="mt-2 max-w-xl text-graphite">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Mission & vision (black) ─────────────────────────────── */}
      <section className="on-dark bg-ink text-ivory" aria-label="Mission and vision">
        <div className="container-x grid md:grid-cols-2">
          {[
            ["Mission", mission],
            ["Vision", vision],
          ].map(([k, text], i) => (
            <div key={k} className={`py-14 md:py-20 ${i === 0 ? "md:border-r md:border-line-dark md:pr-12" : "border-t border-line-dark md:border-t-0 md:pl-12"}`} data-reveal style={delay(i)}>
              <Label className="text-mist">{k}</Label>
              <p className="text-statement mt-6">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Philosophy (white) ───────────────────────────────────── */}
      <section className="section-y" aria-labelledby="philosophy-title">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12">
            <Label className="text-graphite lg:col-span-4">Creative philosophy</Label>
            <h2 id="philosophy-title" className="text-display-2 lg:col-span-8" data-reveal>
              Contrast is a decision. <em>So is every detail.</em>
            </h2>
          </div>
          <ol className="mt-12 md:mt-16">
            {philosophy.map((p, i) => (
              <li key={p.title} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8" data-reveal style={delay(i)}>
                <span aria-hidden="true" className="rule-draw text-ink md:col-span-12" data-reveal="rule" />
                <span className="text-label pt-2 text-graphite md:col-span-4">0{i + 1}</span>
                <h3 className="text-heading md:col-span-3">{p.title}</h3>
                <p className="text-graphite md:col-span-5">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Values (black) ───────────────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="values-title">
        <div className="container-x">
          <Label className="text-mist">Values</Label>
          <h2 id="values-title" className="text-display-3 mt-4 max-w-2xl">
            What we hold ourselves to.
          </h2>
          <ul className="mt-12 grid border-t border-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val, i) => (
              <li key={val.title} className="border-b border-line-dark py-8 sm:pr-8 lg:border-r lg:border-b-0 lg:px-8 lg:first:pl-0 lg:last:border-r-0" data-reveal style={delay(i)}>
                <span className="text-label text-mist">0{i + 1}</span>
                <h3 className="text-display-3 mt-6 italic">{val.title}</h3>
                <p className="mt-4 text-mist">{val.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Founders (white) ─────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="founders-title">
        <div className="container-x">
          <Label className="text-graphite">Founders</Label>
          <h2 id="founders-title" className="sr-only">
            Founders
          </h2>
          <ul className="mt-8">
            {site.founders.map((f, i) => (
              <li key={f.name} className="group grid items-end gap-4 border-t border-ink py-8 md:grid-cols-12" data-reveal style={delay(i)}>
                {f.photo && (
                  <div className="art md:col-span-3">
                    <div className="art-frame">
                      <div className="art-mat">
                        <Image src={f.photo.src} alt={`${f.name}, ${f.role.toLowerCase()} of ${site.name}`} width={f.photo.width} height={f.photo.height} sizes="(min-width: 768px) 22vw, 90vw" className="block h-auto w-full" />
                      </div>
                    </div>
                  </div>
                )}
                <p className={`text-display-1 ${f.photo ? "md:col-span-6" : "md:col-span-9"}`}>{f.name}</p>
                <p className="text-label text-graphite md:col-span-3 md:justify-self-end">{f.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Original products (black) ────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="products-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Label className="text-mist">Original products</Label>
            <h2 id="products-title" className="sr-only">
              Original products
            </h2>
            <Image src="/assets/brand-baidx-logo.png" alt="BAID X logo" width={881} height={217} className="mt-8 h-12 w-auto md:h-14" />
            <p className="text-statement mt-8">{baidx.tagline}</p>
            <p className="mt-5 text-mist">{baidx.overview}</p>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/baid-x" tone="dark">
                Read the story
              </ButtonLink>
              <ButtonLink href={baidx.url} tone="dark" variant="secondary">
                Visit baid-x.com
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="frame aspect-[16/10]" data-reveal="mask">
              <Image src={baidx.images.hero.src} alt={baidx.images.hero.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Work (white) ─────────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="proof-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <Label className="text-graphite">Products &amp; work</Label>
              <h2 id="proof-title" className="text-display-3 mt-4 max-w-2xl">
                Judge us by what&apos;s live.
              </h2>
            </div>
            <ArrowLink href="/work">See all {publicProjects.length} projects</ArrowLink>
          </div>
          <div className="mt-12">
            <Carousel
              label="Featured work"
              slideClassName="w-[86%] sm:w-[56%] lg:w-[36%]"
              slides={featuredProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} sizes="(min-width: 1024px) 36vw, (min-width: 640px) 56vw, 86vw" />
              ))}
            />
          </div>
        </div>
      </section>

      <CtaBand title={<>Let&apos;s build something <em>together.</em></>} />
      <JsonLd
        data={graph(
          breadcrumbLd(crumbs),
          { "@type": "AboutPage", url: `${site.url}/about`, about: { "@id": `${site.url}/#organization` }, mainEntity: { "@id": `${site.url}/#organization` } },
          ...foundersLd(),
        )}
      />
    </>
  );
}
