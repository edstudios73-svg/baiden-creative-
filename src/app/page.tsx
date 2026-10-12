import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/config/site";
import { philosophy } from "@/content/company";
import { caseStudies, publicProjects } from "@/content/projects";
import { baidx } from "@/content/products";
import { services } from "@/content/services";
import { marqueeBottom, marqueeTop, studioWall } from "@/content/studio";
import { pageMetadata } from "@/lib/seo";
import { HeroVisual } from "@/components/HeroVisual";
import { Marquee } from "@/components/Marquee";
import { PhraseRotator } from "@/components/PhraseRotator";
import { Carousel } from "@/components/Carousel";
import { IdeaStory } from "@/components/IdeaStory";
import { CtaBand } from "@/components/CtaBand";
import { ArtFrame } from "@/components/ArtFrame";
import { ArrowRight } from "@/components/icons";
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

// Client work for the showcase; BAID X has its own story section.
const SHOWCASE = ["awesome-place-events-center", "the-slushify", "christian-service-church", "blackboys-vault", "eslyn-local-kitchen", "thenobles-gift-hub", "bold-restaurant"];

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;
const delay = (n: number) => ({ "--reveal-delay": n }) as React.CSSProperties;

export default function HomePage() {
  const showcase = SHOWCASE.map((slug) => caseStudies.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  // Studio pieces, then a few client flyers already in the case studies.
  const flyers = ["csc-sunday-service-flyer", "eslyn-kitchen-menu-flyer", "csc-21-days-fasting-prayer", "eslyn-banku-tilapia-promo"];
  const caseFlyers = caseStudies.flatMap((p) =>
    p.gallery.filter((g) => flyers.some((f) => g.src.includes(f))).map((g) => ({ ...g, title: p.title, kind: "Campaign" as const })),
  );
  const wall = [...studioWall.slice(0, 6), ...caseFlyers.slice(0, 2), ...studioWall.slice(6), ...caseFlyers.slice(2)];

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
                  <PhraseRotator phrases={["brands", "digital products", "platforms", "experiences"]} />
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
                  Explore Our Work
                </ButtonLink>
              </div>
            </div>
            <div className="hidden lg:col-span-6 lg:block xl:col-span-7">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Full-bleed studio marquee: the hero visual on phones, a closing band on desktop. */}
        <div className="hero-line mt-14 pb-10 md:mt-20 md:pb-14" style={v(7)} role="group" aria-label="The studio wall: brand, campaign, web and app design by the studio">
          <div className="container-x">
            <div className="flex items-end justify-between gap-4">
              <p className="text-label text-mist">The studio wall</p>
              <p className="text-label hidden text-mist sm:block">Brand · Campaign · Web · App</p>
            </div>
            <span aria-hidden="true" className="rule-draw hero-rule mt-4 text-ivory/30" style={v(8)} />
          </div>
          <div className="mt-6 grid gap-4 md:mt-8 md:gap-6">
            <Marquee items={marqueeTop} duration={90} />
            <Marquee items={marqueeBottom} duration={105} start={marqueeTop.length} reverse />
          </div>
          <p className="container-x text-label mt-4 flex items-center justify-between gap-4 text-mist">
            <span className="sm:hidden">Brand · Campaign · Web · App</span>
            <span className="hidden sm:inline">Hover a piece to pause the wall</span>
            <Link href="/work#brand" className="link-draw text-ivory">The full wall</Link>
          </p>
        </div>
      </section>

      {/* ── Introduction (white) ─────────────────────────────────── */}
      <section className="section-y" aria-labelledby="intro-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <Label className="text-graphite lg:col-span-3">(01) Who we are</Label>
          <div className="lg:col-span-9">
            <h2 id="intro-title" className="text-display-3 max-w-4xl" data-reveal>
              A creative and technology company from Accra. We design the idea, build the product and give it a brand worth remembering.
            </h2>
            <span aria-hidden="true" className="rule-draw mt-10 text-ink" data-reveal="rule" />
            <div className="mt-8 flex flex-wrap items-center justify-between gap-6" data-reveal>
              <p className="max-w-xl text-graphite">
                Founded by {site.founders[0].name} and {site.founders[1].name}. We work with clients across brand, interface, code and
                motion, and we build products of our own.
              </p>
              <ArrowLink href="/about">About the studio</ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services carousel (black) ────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="services-title">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="(02) Services"
            title={<span id="services-title">Six disciplines. One team that designs and builds.</span>}
            action={<ArrowLink href="/contact">Start a project</ArrowLink>}
          />
          <div className="mt-12">
            <Carousel
              label="Services"
              tone="dark"
              slideClassName="w-[86%] sm:w-[58%] lg:w-[36%]"
              slides={services.map((s) => (
                <article
                  key={s.slug}
                  className="group flex h-full min-h-[22rem] flex-col border border-ivory/25 p-7 transition-colors duration-500 hover:border-ivory hover:bg-ivory hover:text-ink md:p-9"
                >
                  <span className="text-label text-mist transition-colors group-hover:text-graphite">{s.index} / 06</span>
                  <h3 className="text-display-3 mt-8">{s.title}</h3>
                  <p className="mt-5 text-mist transition-colors group-hover:text-graphite">{s.summary}</p>
                  <ul className="mt-auto grid gap-1.5 pt-8 text-sm">
                    {s.deliverables[0].items.map((it) => (
                      <li key={it} className="flex items-center gap-3">
                        <span aria-hidden="true" className="h-px w-4 bg-current" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── Philosophy (white) ───────────────────────────────────── */}
      <section className="section-y" aria-labelledby="philosophy-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <Label className="text-graphite lg:col-span-3">(03) Philosophy</Label>
            <h2 id="philosophy-title" className="text-display-1 lg:col-span-9" data-reveal>
              Black. White.
              <br />
              <em>Ideas in motion.</em>
            </h2>
          </div>
          <ol className="mt-14 md:mt-20">
            {philosophy.map((p, i) => (
              <li key={p.title} className="grid gap-4 py-8 md:grid-cols-12 md:gap-10" data-reveal style={delay(i)}>
                <span aria-hidden="true" className="rule-draw text-ink md:col-span-12" data-reveal="rule" />
                <span className="text-label pt-2 text-graphite md:col-span-3">0{i + 1}</span>
                <h3 className="text-heading md:col-span-4">{p.title}</h3>
                <p className="text-graphite md:col-span-5">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Project showcase (black) ─────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="work-title">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="(04) Selected work"
            title={<span id="work-title">Websites, stores and brands, designed and built.</span>}
            action={<ArrowLink href="/work">All work ({publicProjects.length})</ArrowLink>}
          />
          <div className="mt-12">
            <Carousel
              label="Selected work"
              tone="dark"
              slideClassName="w-[88%] md:w-[70%] lg:w-[58%]"
              slides={showcase.map((p, i) => (
                <Link key={p.slug} href={`/work#${p.slug}`} className="group block">
                  <div className="border border-ivory/20 bg-ink-2 transition-colors duration-500 group-hover:border-ivory/60">
                    <div className="flex items-center gap-2 border-b border-ivory/15 px-4 py-2.5" aria-hidden="true">
                      <span className="size-2 rounded-full bg-ivory/40" />
                      <span className="size-2 rounded-full bg-ivory/25" />
                      <span className="size-2 rounded-full bg-ivory/15" />
                      <span className="text-label ml-3 truncate text-mist">{p.externalUrl?.replace(/^https?:\/\/(www\.)?/, "")}</span>
                    </div>
                    <div className="img-zoom relative aspect-[16/10] overflow-hidden">
                      <Image src={p.coverImage.src} alt={p.coverImage.alt} fill sizes="(min-width: 1024px) 58vw, 88vw" className="object-cover object-top" />
                    </div>
                  </div>
                  <div className="mt-5 flex items-start justify-between gap-6">
                    <span className="font-display text-[2.6rem] leading-none italic text-ivory/90 md:text-[3.25rem]" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <p className="text-label text-mist">{p.category}</p>
                      <h3 className="text-heading mt-2">{p.title}</h3>
                      <p className="mt-2 max-w-xl text-mist">{p.summary}</p>
                    </div>
                    <span className="mt-1 grid size-11 shrink-0 place-items-center border border-ivory/40 transition-colors duration-300 group-hover:bg-ivory group-hover:text-ink">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── BAID X story (white) ─────────────────────────────────── */}
      <section className="section-y" aria-labelledby="baidx-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5" data-reveal>
            <Label className="text-graphite">(05) Original product</Label>
            <div className="mt-6 inline-block bg-ink px-6 py-5">
              <Image src="/assets/brand-baidx-logo.png" alt="BAID X logo" width={881} height={217} className="h-9 w-auto md:h-11" />
            </div>
            <h2 id="baidx-title" className="text-display-3 mt-8">
              {baidx.tagline} <em>An original product by {site.name}.</em>
            </h2>
            <p className="mt-6 text-graphite">{baidx.problem}</p>
            <div className="mt-8 grid gap-6 border-t border-ink pt-6 sm:grid-cols-2">
              <div>
                <p className="text-label flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full bg-ink" /> Live today
                </p>
                <ul className="mt-3 grid gap-1.5 text-graphite">
                  {baidx.live.slice(0, 4).map((f) => (
                    <li key={f.title}>{f.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-label flex items-center gap-2">
                  <span aria-hidden="true" className="size-2 rounded-full border border-ink" /> In development
                </p>
                <ul className="mt-3 grid gap-1.5 text-graphite">
                  {baidx.inDevelopment.map((f) => (
                    <li key={f.title}>{f.title}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              <ButtonLink href="/baid-x">Read the story</ButtonLink>
              <ButtonLink href={baidx.url} variant="secondary">
                Visit baid-x.com
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="frame aspect-[16/10]" data-reveal="mask">
              <Image src={baidx.images.hero.src} alt={baidx.images.hero.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover object-top" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {[baidx.images.roles, { src: "/assets/work/baidx-launch-flyer-1.jpg", alt: "BAID X launch artwork: how the platform works", width: 864, height: 1080 }, baidx.images.app].map((img, i) => (
                <div key={img.src} className="frame aspect-[4/5]" data-reveal="mask" style={delay(i + 1)}>
                  <Image src={img.src} alt={img.alt} fill sizes="(min-width: 1024px) 18vw, 30vw" className="object-cover object-top" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Idea to opportunity comic (black) ────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="comic-title">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="(06) How it happens"
            title={<span id="comic-title">From an idea to an opportunity.</span>}
            intro="Every project we take on follows the same arc. Here it is in four chapters."
          />
          <div className="mt-12">
            <IdeaStory />
          </div>
        </div>
      </section>

      {/* ── Studio wall (white) ──────────────────────────────────── */}
      <section className="section-y" aria-labelledby="wall-title">
        <div className="container-x">
          <SectionHeading
            label="(07) Graphic design"
            title={<span id="wall-title">Identities, campaigns and interfaces.</span>}
            intro="Logos, posters, menus, websites and app screens from the studio, for clients and for our own product."
            action={<ArrowLink href="/work#brand">The full wall</ArrowLink>}
          />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="Graphic design"
              slideClassName="w-[74%] sm:w-[44%] lg:w-[30%] xl:w-[23%]"
              slides={wall.map((w, i) => (
                <ArtFrame key={w.src} piece={w} index={i} reveal={false} matAspect="4 / 5" sizes="(min-width: 1280px) 23vw, (min-width: 1024px) 30vw, (min-width: 640px) 44vw, 74vw" />
              ))}
            />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
