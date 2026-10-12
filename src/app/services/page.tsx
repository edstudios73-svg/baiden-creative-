import type { Metadata } from "next";
import { services } from "@/content/services";
import { breadcrumbLd, graph, pageMetadata, serviceLd } from "@/lib/seo";
import { CapabilityIndex } from "@/components/CapabilityIndex";
import { ProcessList } from "@/components/ProcessList";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, Label, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Web design and development, mobile apps and digital products, branding, graphic design, UI/UX and dashboards, and creative technology from Baiden Creatives.",
  path: "/services",
});

const audiences = [
  { title: "Founders", body: "Taking a product or business from an idea to a first release people can use." },
  { title: "Growing companies", body: "Replacing tools, sites or brands they've outgrown with something built to last." },
  { title: "Organisations", body: "Churches, schools, NGOs and community groups that need content their team can manage." },
  { title: "Retail & hospitality", body: "Stores and restaurants selling on WhatsApp, Instagram and the web." },
];

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Design, technology and brand, <em>under one roof.</em>
          </>
        }
        lead="We bring strategy, design and engineering to the same table, so what you sign off is what gets built. Choose a single discipline or combine them."
      />

      <section className="container-x pt-12 pb-16 md:pt-16 md:pb-20" aria-label="Our services">
        <CapabilityIndex headingLevel="h2" />
      </section>

      <section className="section-y border-t border-line bg-paper" aria-labelledby="who-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Who we work with</Label>
            <h2 id="who-title" className="text-display-3 mt-4">
              Ambitious teams, at any size.
            </h2>
          </div>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-8">
            {audiences.map((a) => (
              <li key={a.title} className="border-t border-line pt-5" data-reveal>
                <h3 className="text-heading">{a.title}</h3>
                <p className="mt-2 text-graphite">{a.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y" aria-label="Our approach">
        <div className="container-x">
          <ProcessList
            title="One process, adapted to each service."
            intro="The steps stay the same; the depth of each one depends on what you need. Every project starts with a written scope."
          />
        </div>
      </section>

      <CtaBand />
      <JsonLd data={graph(breadcrumbLd(crumbs), ...services.map((s) => serviceLd({ title: s.title, summary: s.summary, path: `/services/${s.slug}` })))} />
    </>
  );
}
