import type { Metadata } from "next";
import { caseStudies, projectCategories, publicProjects } from "@/content/projects";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { WorkIndex } from "@/components/WorkIndex";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work by Baiden Creatives: web platforms, online stores, websites and brand identities, including our own product, BAID X.",
  path: "/work",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work" },
];

export default function WorkPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Work that&apos;s live, in use and <em>real.</em>
          </>
        }
        lead={
          <>
            Every project here is real and online. {caseStudies.length} have full case studies, and the rest link straight to the live
            site.
          </>
        }
      />
      <section className="container-x pb-16 md:pb-20" aria-label="Projects">
        <WorkIndex projects={publicProjects} categories={projectCategories} />
      </section>
      <CtaBand />
      <JsonLd data={graph(breadcrumbLd(crumbs))} />
    </>
  );
}
