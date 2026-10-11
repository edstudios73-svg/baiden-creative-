import type { Metadata } from "next";
import { site } from "@/config/site";
import { mission, philosophy, values, vision } from "@/content/company";
import { featuredProjects, publicProjects } from "@/content/projects";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { ArrowLink, JsonLd, Label, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: `${site.name} is a creative and technology company founded in Accra by ${site.founders[0].name} and ${site.founders[1].name}. Our mission, values and way of working.`,
  path: "/about",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Imagination, made <em>to work.</em>
          </>
        }
        lead={`${site.name} is a creative and technology company founded in Accra, Ghana. We design and build brands, digital products and experiences for ambitious businesses, and we build products of our own.`}
      />

      <section className="border-y border-line bg-paper" aria-label="Mission and vision">
        <div className="container-x grid md:grid-cols-2">
          <div className="py-10 md:border-r md:border-line md:py-14 md:pr-12" data-reveal>
            <Label className="text-graphite">Mission</Label>
            <p className="text-heading mt-5">{mission}</p>
          </div>
          <div className="border-t border-line py-10 md:border-t-0 md:py-14 md:pl-12" data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
            <Label className="text-graphite">Vision</Label>
            <p className="text-heading mt-5">{vision}</p>
          </div>
        </div>
      </section>

      <section className="section-y" aria-labelledby="philosophy-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Creative philosophy</Label>
            <h2 id="philosophy-title" className="text-display-3 mt-4">
              How creativity and technology meet here.
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {philosophy.map((p, i) => (
              <li key={p.title} className="grid gap-3 border-t border-line py-8 md:grid-cols-[4rem_1fr_1.4fr] md:gap-8" data-reveal>
                <span className="text-label pt-2 text-graphite">0{i + 1}</span>
                <h3 className="text-heading">{p.title}</h3>
                <p className="text-graphite">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="values-title">
        <div className="container-x">
          <Label className="text-mist">Values</Label>
          <h2 id="values-title" className="text-display-3 mt-4 max-w-2xl">
            What we hold ourselves to.
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} className="border-t border-line-dark pt-5" data-reveal style={{ "--reveal-delay": i } as React.CSSProperties}>
                <h3 className="text-display-3 italic">{v.title}</h3>
                <p className="mt-4 text-mist">{v.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-labelledby="founders-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Founders</Label>
            <h2 id="founders-title" className="text-display-3 mt-4">
              Started by two founders in Accra.
            </h2>
          </div>
          <ul className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
            {site.founders.map((f) => (
              <li key={f.name} className="border-t border-ink/80 py-6" data-reveal>
                <p className="text-display-3">{f.name}</p>
                <p className="text-label mt-3 text-graphite">{f.role}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="proof-title">
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
          <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {featuredProjects.slice(0, 3).map((p) => (
              <li key={p.slug}>
                <ProjectCard project={p} sizes="(min-width: 768px) 33vw, 100vw" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title={<>Let&apos;s build something <em className="text-lime">together.</em></>} />
      <JsonLd data={graph(breadcrumbLd(crumbs), { "@type": "AboutPage", url: `${site.url}/about`, about: { "@id": `${site.url}/#organization` } })} />
    </>
  );
}
