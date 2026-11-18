import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/config/site";
import { mission, vision } from "@/content/company";
import { featuredProjects } from "@/content/projects";
import { breadcrumbLd, foundersLd, graph, imageLd, pageMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { Carousel } from "@/components/Carousel";
import { ArtFrame } from "@/components/ArtFrame";
import { CtaBand } from "@/components/CtaBand";
import { ArrowLink, Breadcrumbs, JsonLd, Label } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is a creative and technology company founded in Accra by ${site.founders[0].name} and ${site.founders[1].name}. Our mission, our founders and the products we build.`,
  path: "/about",
  image: site.foundersPhotos[0],
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
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
              {site.name} is a creative and technology company founded in Accra, Ghana. We design, build and run digital products.
            </p>
          </div>
        </div>
        {/* Vertical construction lines */}
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-ivory/10 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-ivory/10 md:block" />
      </header>

      {/* ── Founders (white) ─────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="founders-title">
        <div className="container-x">
          <Label className="text-graphite">Founders</Label>
          <h2 id="founders-title" className="text-display-3 mt-4">
            The people behind <em>the studio.</em>
          </h2>
          <div className="mt-10 grid items-end gap-8 md:mt-12 md:grid-cols-12 md:gap-10">
            {site.foundersPhotos.map((p, i) => (
              <div key={p.src} className={i === 0 ? "md:col-span-7" : "max-w-sm md:col-span-4 md:col-start-9 md:max-w-none"}>
                <ArtFrame
                  piece={{ ...p, title: p.caption, kind: site.name }}
                  index={i}
                  sizes={i === 0 ? "(min-width: 768px) 55vw, 100vw" : "(min-width: 768px) 30vw, 90vw"}
                />
              </div>
            ))}
          </div>
          <ul className="mt-14">
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

      {/* ── Our products (white) ──────────────────────────────────── */}
      <section className="section-y" aria-labelledby="proof-title">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
            <div>
              <Label className="text-graphite">Our products</Label>
              <h2 id="proof-title" className="text-display-3 mt-4 max-w-2xl">
                What we build.
              </h2>
            </div>
            <ArrowLink href="/work">All products</ArrowLink>
          </div>
          <div className="mt-12">
            <Carousel
              label="Our products"
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
          {
            "@type": "AboutPage",
            url: `${site.url}/about`,
            about: { "@id": `${site.url}/#organization` },
            mainEntity: { "@id": `${site.url}/#organization` },
            primaryImageOfPage: imageLd(site.foundersPhotos[0]),
            image: site.foundersPhotos.map(imageLd),
          },
          ...foundersLd(),
        )}
      />
    </>
  );
}
