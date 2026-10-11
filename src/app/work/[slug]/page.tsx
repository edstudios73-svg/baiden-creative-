import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/content/projects";
import { getService } from "@/content/services";
import { absoluteUrl, site } from "@/config/site";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { Gallery } from "@/components/Gallery";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { ArrowLink, Breadcrumbs, ButtonLink, JsonLd, Label, SmartLink } from "@/components/ui";

type Params = { slug: string };

// Only published case studies get a page; listed and draft projects 404.
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return caseStudies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const p = getCaseStudy((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.title}: Case Study`,
    description: p.summary,
    path: `/work/${p.slug}`,
    image: p.coverImage,
  });
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const p = getCaseStudy((await params).slug);
  if (!p) notFound();

  const path = `/work/${p.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
    { name: p.title, path },
  ];
  const services = p.services.map(getService).filter((s) => s !== undefined);
  const related = caseStudies
    .filter((o) => o.slug !== p.slug)
    .map((o) => ({ o, score: (o.category === p.category ? 2 : 0) + o.services.filter((s) => p.services.includes(s)).length }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map(({ o }) => o);

  const meta: { term: string; detail: React.ReactNode }[] = [
    { term: p.inHouse ? "Owner" : "Client", detail: p.clientOrOwner },
    { term: "Our role", detail: p.projectRole.join(", ") },
    {
      term: "Services",
      detail: (
        <span className="flex flex-wrap gap-x-3 gap-y-1">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="link-draw">
              {s.shortTitle}
            </Link>
          ))}
        </span>
      ),
    },
    ...(p.technologies.length ? [{ term: "Technology", detail: p.technologies.join(", ") }] : []),
    ...(p.externalUrl
      ? [
          {
            term: "Live",
            detail: (
              <SmartLink href={p.externalUrl} className="link-draw">
                {p.externalUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/.*$/, "")} ↗
              </SmartLink>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <article>
        <header className="container-x pt-10 md:pt-16">
          <Breadcrumbs items={crumbs} />
          <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-label text-graphite">
                Case study · {p.category}
                {p.inHouse && <span className="ml-3 bg-lime px-1.5 py-0.5 text-ink">An original product by {site.name}</span>}
              </p>
              <h1 className="text-display-2 mt-6">{p.title}</h1>
              <p className="text-lead mt-8 max-w-2xl text-graphite">{p.summary}</p>
            </div>
            <dl className="grid content-start gap-5 border-t border-line pt-6 lg:col-span-4 lg:mt-3">
              {meta.map((m) => (
                <div key={m.term} className="grid grid-cols-[7rem_1fr] gap-4">
                  <dt className="text-label pt-1 text-graphite">{m.term}</dt>
                  <dd>{m.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <div className="container-x mt-14 md:mt-20">
          <div className="frame aspect-[16/10]">
            <Image src={p.coverImage.src} alt={p.coverImage.alt} fill priority sizes="(min-width: 1440px) 1360px, 100vw" className="object-cover object-top" />
          </div>
        </div>

        {p.challenge && (
          <section className="section-y" aria-labelledby="context-title">
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <h2 id="context-title" className="text-label text-graphite lg:col-span-3">
                Background &amp; challenge
              </h2>
              <p className="text-statement max-w-5xl lg:col-span-9" data-reveal>
                {p.challenge}
              </p>
            </div>
          </section>
        )}

        {Boolean(p.approach?.length || p.solution?.length) && (
          <section className="section-y border-t border-line bg-paper" aria-label="Approach and execution">
            <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-12">
              {p.approach && p.approach.length > 0 && (
                <div data-reveal>
                  <Label className="text-graphite">Approach</Label>
                  <h2 className="text-heading mt-4">How we thought about it</h2>
                  <ol className="mt-8 grid gap-6">
                    {p.approach.map((a, i) => (
                      <li key={a} className="grid grid-cols-[2.5rem_1fr] border-t border-line pt-5">
                        <span className="text-label pt-1 text-graphite">0{i + 1}</span>
                        <p>{a}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
              {p.solution && p.solution.length > 0 && (
                <div data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
                  <Label className="text-graphite">Design &amp; engineering</Label>
                  <h2 className="text-heading mt-4">What we built</h2>
                  <ul className="mt-8 grid gap-4">
                    {p.solution.map((s) => (
                      <li key={s} className="flex gap-4 border-t border-line pt-4">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-ink" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {p.gallery.length > 0 && (
          <section className="section-y" aria-labelledby="gallery-title">
            <div className="container-x">
              <Label className="text-graphite">Gallery</Label>
              <h2 id="gallery-title" className="text-display-3 mt-4 mb-12">
                In detail.
              </h2>
              <Gallery images={p.gallery} label={`${p.title} gallery`} />
            </div>
          </section>
        )}

        {p.outcomes.length > 0 && (
          <section className="section-y border-t border-line" aria-labelledby="outcomes-title">
            <div className="container-x grid gap-10 lg:grid-cols-12">
              <h2 id="outcomes-title" className="text-label text-graphite lg:col-span-3">
                Outcomes
              </h2>
              <ul className="grid gap-6 lg:col-span-9">
                {p.outcomes.map((o) => (
                  <li key={o} className="text-heading border-t border-line pt-5">
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <section className="border-t border-line" aria-label="Project links">
          <div className="container-x flex flex-col gap-6 py-12 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-heading">{p.title}</p>
            <div className="grid gap-3 sm:grid-cols-[auto_auto]">
              {p.slug === "baid-x" && (
                <ButtonLink href="/products/baid-x" variant="secondary">
                  Product overview
                </ButtonLink>
              )}
              {p.externalUrl && <ButtonLink href={p.externalUrl}>Visit the live site</ButtonLink>}
            </div>
          </div>
        </section>
      </article>

      {related.length > 0 && (
        <section className="section-y border-t border-line bg-paper" aria-labelledby="related-title">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 id="related-title" className="text-display-3">
                More work
              </h2>
              <ArrowLink href="/work">All work</ArrowLink>
            </div>
            <ul className="mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <ProjectCard project={r} sizes="(min-width: 768px) 50vw, 100vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            Planning something <em className="text-lime">similar?</em>
          </>
        }
      />
      <JsonLd
        data={graph(breadcrumbLd(crumbs), {
          "@type": "CreativeWork",
          name: p.title,
          description: p.summary,
          url: absoluteUrl(path),
          image: absoluteUrl(p.coverImage.src),
          creator: { "@id": `${site.url}/#organization` },
        })}
      />
    </>
  );
}
