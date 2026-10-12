import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { processSteps } from "@/content/company";
import { publicProjects } from "@/content/projects";
import { getService, services } from "@/content/services";
import { breadcrumbLd, graph, pageMetadata, serviceLd } from "@/lib/seo";
import { ProjectCard } from "@/components/ProjectCard";
import { CtaBand } from "@/components/CtaBand";
import { ArrowRight } from "@/components/icons";
import { ArrowLink, Faq, JsonLd, Label, PageHeader } from "@/components/ui";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = getService((await params).slug);
  if (!service) return {};
  return pageMetadata({ title: service.seoTitle, description: service.seoDescription, path: `/services/${service.slug}` });
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = getService((await params).slug);
  if (!service) notFound();

  const path = `/services/${service.slug}`;
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path },
  ];
  // Published case studies first, then listed work, for this service.
  const work = publicProjects
    .filter((p) => p.services.includes(service.slug))
    .sort((a, b) => Number(b.publicationStatus === "published") - Number(a.publicationStatus === "published"))
    .slice(0, 4);
  const related = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <PageHeader crumbs={crumbs} title={service.title} lead={service.lead}>
        <p className="text-label mt-10 text-graphite">Service {service.index} / 06</p>
      </PageHeader>

      {service.practiceNote && (
        <aside className="container-x pt-12 md:pt-16" aria-label="Where this practice stands">
          <div className="grid gap-4 border-l-2 border-ink bg-paper p-6 md:grid-cols-12 md:p-8">
            <p className="text-label text-graphite md:col-span-3">Where we are today</p>
            <p className="md:col-span-9">{service.practiceNote}</p>
          </div>
        </aside>
      )}

      <section className="section-y" aria-labelledby="solves-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">What it solves</Label>
            <h2 id="solves-title" className="text-display-3 mt-4">
              Problems we&apos;re brought in for.
            </h2>
          </div>
          <ol className="lg:col-span-8">
            {service.problems.map((p, i) => (
              <li key={p} className="grid grid-cols-[3rem_1fr] border-t border-line py-6 text-lg" data-reveal>
                <span className="text-label pt-1.5 text-graphite">0{i + 1}</span>
                {p}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y bg-paper" aria-labelledby="scope-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Scope &amp; deliverables</Label>
            <h2 id="scope-title" className="text-display-3 mt-4">
              What you can engage us for.
            </h2>
            <h3 className="text-label mt-12 text-graphite">Typically for</h3>
            <ul className="mt-4 grid gap-2">
              {service.audience.map((a) => (
                <li key={a} className="flex gap-3">
                  <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 bg-ink" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {service.deliverables.map((d) => (
              <div key={d.title} className="border-t border-ink/80 pt-5" data-reveal>
                <h3 className="text-heading">{d.title}</h3>
                <ul className="mt-4 grid gap-2 text-graphite">
                  {d.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {work.length > 0 && (
        <section className="section-y" aria-labelledby="work-title">
          <div className="container-x">
            <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
              <div>
                <Label className="text-graphite">Relevant work</Label>
                <h2 id="work-title" className="text-display-3 mt-4">
                  Where we&apos;ve done this.
                </h2>
              </div>
              <ArrowLink href="/work">All work</ArrowLink>
            </div>
            <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
              {work.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section-y border-t border-line" aria-labelledby="process-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Working process</Label>
            <h2 id="process-title" className="text-display-3 mt-4">
              How we&apos;ll work together.
            </h2>
          </div>
          <div className="lg:col-span-8">
            <ol className="flex flex-wrap gap-x-3 gap-y-2 text-lg" aria-label="Process steps">
              {processSteps.map((s, i) => (
                <li key={s.n} className="flex items-center gap-3">
                  <span>{s.title}</span>
                  {i < processSteps.length - 1 && <ArrowRight className="size-3.5 text-graphite" />}
                </li>
              ))}
            </ol>
            <ul className="mt-10 grid gap-4">
              {service.processNotes.map((n) => (
                <li key={n} className="border-t border-line pt-4 text-graphite">
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {service.faqs.length > 0 && (
        <section className="section-y bg-paper" aria-labelledby="faq-title">
          <div className="container-x grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Label className="text-graphite">FAQ</Label>
              <h2 id="faq-title" className="text-display-3 mt-4">
                Good questions.
              </h2>
            </div>
            <div className="lg:col-span-8">
              <Faq items={service.faqs} />
            </div>
          </div>
        </section>
      )}

      <section className="section-y" aria-labelledby="related-title">
        <div className="container-x">
          <Label className="text-graphite">Related capabilities</Label>
          <h2 id="related-title" className="sr-only">
            Related capabilities
          </h2>
          <ul className="mt-6 grid border-t border-line md:grid-cols-3">
            {related.map((r) => (
              <li key={r.slug} className="border-b border-line md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <Link href={`/services/${r.slug}`} className="group flex h-full flex-col justify-between gap-10 py-8">
                  <span className="text-label text-graphite">{r.index}</span>
                  <span className="flex items-end justify-between gap-4">
                    <span className="text-heading group-hover:italic">{r.title}</span>
                    <ArrowRight className="mb-1.5 size-4 shrink-0" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Let&apos;s talk about <em>your project.</em>
          </>
        }
      />
      <JsonLd data={graph(breadcrumbLd(crumbs), serviceLd({ title: service.title, summary: service.summary, path }))} />
    </>
  );
}
