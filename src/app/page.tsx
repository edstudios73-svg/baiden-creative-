import type { Metadata } from "next";
import { site } from "@/config/site";
import { caseStudies, publicProjects } from "@/content/projects";
import { pageMetadata } from "@/lib/seo";
import { HeroVisual } from "@/components/HeroVisual";
import { ProjectCard } from "@/components/ProjectCard";
import { CapabilityIndex } from "@/components/CapabilityIndex";
import { BaidxFeature } from "@/components/BaidxFeature";
import { ProcessList } from "@/components/ProcessList";
import { CtaBand } from "@/components/CtaBand";
import { ArrowLink, ButtonLink, Label, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  ...pageMetadata({
    title: `${site.name}: ${site.statement}`,
    description:
      "Baiden Creatives is a creative and technology company. We design and build websites, web platforms, digital products and brand identities for ambitious businesses.",
    path: "/",
  }),
  title: { absolute: `${site.name}: ${site.statement}` },
};

// Order of the editorial selection on the homepage.
const HOME_WORK = ["baid-x", "blackboys-vault", "christian-service-church", "eslyn-local-kitchen"];

export default function HomePage() {
  const work = HOME_WORK.map((slug) => caseStudies.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  const [lead, ...rest] = work;

  return (
    <>
      {/* Hero */}
      <section className="container-x pt-8 pb-20 md:pt-14 md:pb-28" aria-labelledby="hero-title">
        <p className="text-label hero-line text-graphite">Creative &amp; technology company · {site.base}</p>
        <h1 id="hero-title" className="text-display-1 mt-6 md:mt-8">
          <span className="hero-line" style={{ "--i": 1 } as React.CSSProperties}>
            Built from imagination.
          </span>
          <span className="hero-line italic" style={{ "--i": 2 } as React.CSSProperties}>
            Made for{" "}
            <span className="relative isolate whitespace-nowrap">
              impact.
              <span aria-hidden="true" className="absolute right-[0.1em] bottom-[0.06em] left-0 -z-10 h-[0.16em] bg-lime" />
            </span>
          </span>
        </h1>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="hero-line lg:col-span-4 lg:pt-6" style={{ "--i": 3 } as React.CSSProperties}>
            <p className="text-lead max-w-md">{site.summary}</p>
            <p className="mt-5 max-w-md text-graphite">
              Strategy, design and engineering under one roof, for companies, startups and founders in Ghana and around the world.
            </p>
            <div className="mt-10 grid max-w-sm gap-3">
              <ButtonLink href="/contact">Start a Project</ButtonLink>
              <ButtonLink href="/work" variant="secondary">
                Explore Our Work
              </ButtonLink>
            </div>
          </div>
          <div className="hero-line lg:col-span-8" style={{ "--i": 4 } as React.CSSProperties}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Selected work */}
      <section className="section-y border-t border-line bg-paper" aria-labelledby="work-title">
        <div className="container-x">
          <SectionHeading
            label="Selected work"
            title={<span id="work-title">Products, platforms and brands we&apos;ve designed and built.</span>}
            action={<ArrowLink href="/work">All work ({publicProjects.length})</ArrowLink>}
          />
          <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-20 md:grid-cols-12">
            {lead && (
              <div className="md:col-span-12">
                <ProjectCard project={lead} variant="wide" sizes="100vw" />
              </div>
            )}
            {rest[0] && (
              <div className="md:col-span-7">
                <ProjectCard project={rest[0]} sizes="(min-width: 768px) 58vw, 100vw" />
              </div>
            )}
            {rest[1] && (
              <div className="md:col-span-5 md:mt-32">
                <ProjectCard project={rest[1]} sizes="(min-width: 768px) 42vw, 100vw" />
              </div>
            )}
            {rest[2] && (
              <div className="md:col-span-6 md:col-start-4">
                <ProjectCard project={rest[2]} sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section-y" aria-labelledby="capabilities-title">
        <div className="container-x">
          <SectionHeading
            label="Capabilities"
            title={<span id="capabilities-title">Six disciplines. One team that designs and builds.</span>}
            intro="Each project draws on the disciplines it needs, so your brand, interface and code are made to fit together."
            action={<ArrowLink href="/services">All services</ArrowLink>}
          />
          <div className="mt-14 md:mt-20">
            <CapabilityIndex />
          </div>
        </div>
      </section>

      {/* Original products */}
      <section className="on-dark section-y bg-ink text-ivory" aria-label="Original products">
        <div className="container-x">
          <BaidxFeature />
        </div>
      </section>

      {/* Approach */}
      <section className="section-y" aria-label="Our approach">
        <div className="container-x">
          <ProcessList
            title="How an idea becomes something real."
            intro="A clear sequence we adapt to each project's size, budget and timeline. Scope and schedule are always agreed with you in writing."
          />
        </div>
      </section>

      {/* About preview */}
      <section className="section-y border-t border-line bg-paper" aria-labelledby="about-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <Label className="text-graphite">About Baiden Creatives</Label>
            <h2 id="about-title" className="text-display-3 mt-4">
              A creative company with an engineer&apos;s discipline, and products of <em>our own</em>.
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:pt-10" data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
            <p className="text-graphite">
              Baiden Creatives was founded in Accra by {site.founders[0].name} and {site.founders[1].name}. We work across brand,
              interface, code and motion, and we build our own products as well as our clients&apos;, which keeps us honest
              about what it takes to make something people rely on.
            </p>
            <ArrowLink href="/about" className="mt-8">
              About us
            </ArrowLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
