import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { site } from "@/config/site";
import { baidx } from "@/content/products";
import { getCaseStudy } from "@/content/projects";
import { baidxLd, breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { ArtFrame } from "@/components/ArtFrame";
import { Carousel } from "@/components/Carousel";
import { CountUp } from "@/components/CountUp";
import { CtaBand } from "@/components/CtaBand";
import { Breadcrumbs, ButtonLink, JsonLd, Label, SectionHeading } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "BAID X: the story",
  description: `The story of ${baidx.name}, Ghana's work network: human-checked badges and escrow payments for workers, companies and clients. An original product by ${site.name}.`,
  path: "/baid-x",
  image: baidx.images.hero,
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "BAID X", path: "/baid-x" },
];

const v = (n: number) => ({ "--i": n }) as React.CSSProperties;
// Phones: a swipeable row of cards. Larger screens: a grid.
const swipe =
  "relative -mx-[clamp(1rem,0.4rem+3vw,3rem)] flex snap-x snap-mandatory scroll-px-[clamp(1rem,0.4rem+3vw,3rem)] gap-3 overflow-x-auto px-[clamp(1rem,0.4rem+3vw,3rem)] pb-2 [scrollbar-width:none] md:mx-0 md:grid md:gap-px md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden";
const swipeItem = "w-[82%] shrink-0 snap-start sm:w-[60%] md:w-auto";
// What BAID X does, as a running band under the hero.
const ticker = ["Human-checked badges", "Escrow payments", "50 trades", "16 regions", "Payouts to mobile money", "Badge checker", "Price guide"];
const delay = (n: number) => ({ "--reveal-delay": n }) as React.CSSProperties;

// Verified on baid-x.com: five account types, 50 trades, all 16 regions, automatic release three days after "done".
const figures = [
  { n: 5, label: "Account types" },
  { n: 50, label: "Trades" },
  { n: 16, label: "Regions of Ghana" },
  { n: 3, label: "Days to auto-release" },
];

// How a job's money moves, as described by the live product.
const flow = [
  { title: "Top up", body: "The client tops up a BAID X wallet through Paystack." },
  { title: "Fund the job", body: "The job is funded from the wallet and the money is held in escrow." },
  { title: "Do the work", body: "The worker does the job and marks it done." },
  { title: "Get paid", body: "Money is released when the client approves, or automatically three days later. Payouts go to mobile money." },
];

export default function BaidxPage() {
  const story = getCaseStudy("baid-x");
  if (!story) notFound();
  // The problem text ends on its one-line thesis; that line becomes the pull quote.
  const split = baidx.problem.indexOf("BAID X makes");
  const problemBody = split > 0 ? baidx.problem.slice(0, split).trim() : baidx.problem;
  const problemQuote = split > 0 ? baidx.problem.slice(split).trim() : "";
  const launch = [
    { ...baidx.logoMark, title: "BAID X", kind: "Logo mark" },
    ...story.gallery.map((g) => ({ ...g, title: "BAID X", kind: g.src.includes("app") ? "App announcement" : "Launch campaign" })),
  ];

  return (
    <>
      {/* ── Hero (black) ─────────────────────────────────────────── */}
      <header className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="container-x relative z-10 pt-10 pb-14 md:pt-14 md:pb-20">
          <Breadcrumbs items={crumbs} tone="dark" />
          <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-16">
            <span className="hero-line inline-block" style={v(0)}>
              <Image src="/assets/brand-baidx-logo.png" alt="BAID X logo" width={881} height={217} priority className="h-10 w-auto md:h-14" />
            </span>
            <p className="text-label hero-line text-mist" style={v(1)}>
              An original product by {site.name}
            </p>
          </div>
          <h1 className="text-display-1 mt-10 md:mt-12">
            <span className="line-mask">
              <span style={v(2)}>Hire verified people.</span>
            </span>
            <span className="line-mask md:pl-[10%]">
              <span className="italic" style={v(3)}>
                Pay when it&apos;s done.
              </span>
            </span>
          </h1>
          <span aria-hidden="true" className="rule-draw hero-rule mt-12 text-ivory/30" style={v(4)} />
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="text-lead hero-line max-w-2xl text-ivory/90 md:col-span-7" style={v(5)}>
              {baidx.overview}
            </p>
            <div className="hero-line grid gap-3 sm:grid-cols-2 md:col-span-5 md:grid-cols-1 lg:grid-cols-2" style={v(6)}>
              <ButtonLink href={baidx.url} tone="dark">
                Visit baid-x.com
              </ButtonLink>
              <ButtonLink href="/work#baid-x" tone="dark" variant="secondary">
                See it in our work
              </ButtonLink>
            </div>
          </div>

          {/* Live product, framed as a browser window */}
          <figure className="hero-unmask mt-14 md:mt-20" style={v(7)}>
            <div className="border border-ivory/25 bg-ink-2 shadow-[0_40px_80px_-40px_rgb(255_255_255/0.25)]">
              <div className="flex items-center gap-2 border-b border-ivory/15 px-4 py-3">
                <span className="size-2.5 rounded-full bg-ivory/40" />
                <span className="size-2.5 rounded-full bg-ivory/25" />
                <span className="size-2.5 rounded-full bg-ivory/15" />
                <span className="text-label ml-3 truncate text-mist">baid-x.com</span>
              </div>
              <div className="relative aspect-[16/10]">
                <Image src={baidx.images.hero.src} alt={baidx.images.hero.alt} fill sizes="(min-width: 1440px) 1340px, 94vw" className="object-cover object-top" priority />
              </div>
            </div>
          </figure>

          <dl className="mt-14 grid grid-cols-2 border-t border-ivory/15 md:grid-cols-4">
            {figures.map((f, i) => (
              <div key={f.label} className={`border-b border-ivory/15 py-6 md:border-b-0 md:px-6 md:first:pl-0 ${i % 2 === 1 ? "pl-5 border-l border-l-ivory/15 md:pl-6" : "md:border-l md:border-l-ivory/15 md:first:border-l-0"}`} data-reveal style={delay(i)}>
                <dt className="text-label text-mist">{f.label}</dt>
                <dd className="text-display-2 mt-3 leading-none">
                  <CountUp to={f.n} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-1/3 hidden w-px bg-ivory/10 md:block" />
        <span aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2/3 hidden w-px bg-ivory/10 md:block" />
      </header>

      {/* ── Running band (white) ─────────────────────────────────── */}
      <div className="group overflow-hidden border-b border-ink py-5 md:py-7" aria-hidden="true">
        <div className="marquee-track flex w-max group-hover:[animation-play-state:paused]" style={{ "--marquee-duration": "48s" } as React.CSSProperties}>
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center">
              {ticker.map((t) => (
                <li key={t} className="flex items-center gap-6 pr-6 font-display text-[clamp(1.6rem,1.2rem+2vw,3rem)] leading-none whitespace-nowrap italic md:gap-10 md:pr-10">
                  {t}
                  <svg viewBox="0 0 20 20" className="size-4 md:size-5" aria-hidden="true">
                    <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill="currentColor" />
                  </svg>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>

      {/* ── The problem and how we built it (white) ─────────────── */}
      <section className="section-y" aria-labelledby="problem-title">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4" data-reveal>
              <Label className="text-graphite">(01) The problem</Label>
              <h2 id="problem-title" className="text-display-3 mt-4">
                Trust you can <em>check.</em>
              </h2>
            </div>
            <div className="lg:col-span-8" data-reveal style={delay(1)}>
              <p className="text-lead text-graphite">{problemBody}</p>
              <blockquote className="relative mt-10 border-l-2 border-ink pl-6 md:mt-12 md:pl-10">
                <span aria-hidden="true" className="absolute -top-6 left-4 font-display text-[5rem] leading-none md:left-8 md:text-[7rem]">
                  &ldquo;
                </span>
                <p className="text-display-3 pt-8 italic md:pt-12">{problemQuote}</p>
              </blockquote>
            </div>
          </div>

          <span aria-hidden="true" className="rule-draw mt-14 block text-line md:mt-20" data-reveal="rule" />
          <div className="mt-10 flex items-baseline justify-between gap-4">
            <Label className="text-graphite">How we built it</Label>
            <span className="text-label text-graphite md:hidden">Swipe &rarr;</span>
          </div>
          <ol className={`mt-6 md:grid-cols-3 md:bg-line ${swipe}`}>
            {(story.approach ?? []).map((a, i) => (
              <li key={a} className={`group border border-ink bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-ivory md:border-0 md:p-8 ${swipeItem}`}>
                <span className="font-display text-[3.5rem] leading-none italic">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-6 text-[1.02rem] leading-relaxed">{a}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── How money moves (black) ──────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="flow-title">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="(02) How money moves"
            title={
              <span id="flow-title">
                Held safe until <em>the work is done.</em>
              </span>
            }
            intro="Escrow, in four steps. If something goes wrong, a dispute freezes the money while BAID X reviews it."
          />
          <ol className="flow relative mt-14 grid gap-10 pl-10 md:grid-cols-4 md:gap-6 md:pl-0 md:pt-12">
            <span aria-hidden="true" className="flow-line absolute top-0 bottom-0 left-[0.6rem] w-px bg-ivory/20 md:top-[0.6rem] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto" />
            <span aria-hidden="true" className="flow-dot absolute top-0 left-[0.6rem] size-3 -translate-x-1/2 rounded-full bg-ivory md:top-[0.6rem] md:left-0 md:-translate-y-1/2" />
            {flow.map((s, i) => (
              <li key={s.title} className="relative" data-reveal style={delay(i)}>
                <span aria-hidden="true" className="absolute top-1 -left-10 grid size-5 place-items-center border border-ivory bg-ink md:-top-12 md:left-0" />
                <span className="text-label text-mist">Step {String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-heading mt-3">{s.title}</h3>
                <p className="mt-3 max-w-xs text-mist">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Who it's for (white) ─────────────────────────────────── */}
      <section className="section-y" aria-labelledby="users-title">
        <div className="container-x">
          <SectionHeading label="(03) Who it's for" title={<span id="users-title">Every side of the build.</span>} intro="Five account types, each shaped around its own work." />
          <ol className="mt-12 border-t border-ink">
            {baidx.users.map((u, i) => (
              <li
                key={u.title}
                className="group grid grid-cols-[2.5rem_1fr] gap-x-4 gap-y-2 border-b border-ink px-2 py-6 transition-colors duration-500 hover:bg-ink hover:text-ivory md:grid-cols-[4rem_1fr_1.3fr] md:items-baseline md:px-4 md:py-8"
                data-reveal
                style={delay(i % 3)}
              >
                <span className="text-label text-graphite group-hover:text-mist">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-display-3 leading-none">{u.title}</h3>
                <p className="col-start-2 text-graphite group-hover:text-mist md:col-start-3">{u.body}</p>
              </li>
            ))}
          </ol>

          {/* The people on the platform, as BAID X pictures them */}
          <div className="mt-14 md:mt-20">
            <Carousel
              label="The people BAID X is built for"
              slideClassName="w-[64%] sm:w-[40%] lg:w-[24%]"
              slides={baidx.people.map((p, i) => (
                <figure key={p.src} className="group">
                  <div className="relative aspect-[3/4] overflow-hidden border border-ink bg-cloud">
                    <span aria-hidden="true" className="absolute top-3 left-3 z-10 font-display text-[1.6rem] leading-none italic">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 40vw, 64vw"
                      className="object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                  <figcaption className="mt-3 flex items-baseline justify-between gap-3 border-t border-ink pt-2">
                    <span className="font-display text-[1.15rem]">{p.role}</span>
                    <span className="text-label text-graphite">BAID X</span>
                  </figcaption>
                </figure>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── What's live (black) ──────────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="live-title">
        <div className="container-x">
          <SectionHeading tone="dark" label="(04) Live today" title={<span id="live-title">What&apos;s live, and what&apos;s next.</span>} />
          <p className="text-label mt-10 text-mist md:hidden">Swipe &rarr;</p>
          <ul className={`mt-4 md:mt-12 md:grid-cols-2 md:border md:border-ivory/15 md:bg-ivory/15 lg:grid-cols-3 ${swipe}`}>
            {baidx.live.map((f, i) => (
              <li key={f.title} className={`border border-ivory/20 bg-ink p-6 transition-colors duration-500 hover:bg-ivory hover:text-ink md:border-0 md:p-8 [&:hover_p]:text-graphite ${swipeItem}`}>
                <span className="flex items-center justify-between gap-4">
                  <span className="text-label inline-flex items-center gap-2 text-mist">
                    <span className="size-1.5 rounded-full bg-current" aria-hidden="true" /> Live
                  </span>
                  <span className="font-display text-[1.6rem] leading-none italic">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <h3 className="text-heading mt-4">{f.title}</h3>
                <p className="mt-3 text-mist">{f.body}</p>
              </li>
            ))}
          </ul>
          {baidx.inDevelopment.map((f) => (
            <div key={f.title} className="mt-12 grid items-center gap-10 border border-ivory/15 p-6 md:grid-cols-12 md:p-10" data-reveal>
              <div className="md:col-span-7">
                <span className="text-label inline-flex items-center gap-2 border border-ivory/30 px-2 py-1 text-ivory">In development</span>
                <h3 className="text-display-3 mt-6">{f.title}</h3>
                <p className="mt-4 max-w-lg text-mist">{f.body}</p>
              </div>
              <div className="mx-auto w-full max-w-[16rem] md:col-span-4 md:col-start-9 md:max-w-[18rem]">
                <ArtFrame piece={{ ...baidx.images.app, title: "BAID X app", kind: "Coming soon" }} tone="dark" sizes="(min-width: 768px) 28vw, 80vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── In the product (white) ───────────────────────────────── */}
      <section className="section-y" aria-labelledby="screens-title">
        <div className="container-x">
          <SectionHeading
            label="(05) In the product"
            title={
              <span id="screens-title">
                From sign-up to <em>verified.</em>
              </span>
            }
            intro="The real BAID X flow on a phone, screen by screen. The account shown is a demo."
          />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="BAID X app screens"
              slideClassName="w-[62%] sm:w-[36%] lg:w-[22%]"
              slides={baidx.screens.map((s, i) => (
                <figure key={s.src} className="group">
                  <div className="rounded-[1.75rem] border border-ink bg-ink p-2 shadow-[0_30px_50px_-30px_rgb(0_0_0/0.55)] transition-transform duration-500 group-hover:-translate-y-1">
                    <div className="overflow-hidden rounded-[1.35rem]">
                      <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 36vw, 62vw" className="block h-auto w-full" />
                    </div>
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="text-label text-graphite">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-display text-[1.15rem]">{s.title}</span>
                  </figcaption>
                </figure>
              ))}
            />
          </div>
        </div>
      </section>

      {/* ── Launch campaign (light grey) ─────────────────────────── */}
      <section className="section-y bg-cloud" aria-labelledby="launch-title">
        <div className="container-x">
          <SectionHeading
            label="(06) The launch"
            title={<span id="launch-title">Brand and launch campaign.</span>}
            intro={`Designed in-house alongside the product. Our role: ${story.projectRole.join(", ").toLowerCase()}.`}
          />
          <div className="mt-10 md:mt-12">
            <Carousel
              label="BAID X launch artwork"
              slideClassName="w-[78%] sm:w-[46%] lg:w-[30%]"
              slides={launch.map((w, i) => (
                <ArtFrame key={w.src} piece={w} index={i} reveal={false} matAspect="4 / 5" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 78vw" />
              ))}
            />
          </div>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Got the next <em>big idea?</em>
          </>
        }
        body="We built BAID X from a problem we saw every day. Tell us yours, and we'll help you build the product that solves it."
      />

      <JsonLd data={graph(baidxLd(baidx), breadcrumbLd(crumbs))} />
    </>
  );
}
