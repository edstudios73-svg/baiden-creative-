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
  const launch = story.gallery.map((g) => ({ ...g, title: "BAID X", kind: g.src.includes("app") ? "App announcement" : "Launch campaign" }));

  return (
    <>
      {/* ── Hero (black) ─────────────────────────────────────────── */}
      <header className="on-dark relative overflow-hidden bg-ink text-ivory">
        <div className="container-x pt-10 pb-14 md:pt-14 md:pb-20">
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
              <p className="text-statement">{baidx.problem}</p>
            </div>
          </div>

          <span aria-hidden="true" className="rule-draw mt-14 block text-line md:mt-20" data-reveal="rule" />
          <Label className="mt-10 text-graphite">How we built it</Label>
          <ol className="mt-6 grid gap-px bg-line md:grid-cols-3">
            {(story.approach ?? []).map((a, i) => (
              <li key={a} className="group bg-paper p-6 transition-colors duration-500 hover:bg-ink hover:text-ivory md:p-8" data-reveal style={delay(i)}>
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
        </div>
      </section>

      {/* ── What's live (black) ──────────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="live-title">
        <div className="container-x">
          <SectionHeading tone="dark" label="(04) Live today" title={<span id="live-title">What&apos;s live, and what&apos;s next.</span>} />
          <ul className="mt-12 grid gap-px border border-ivory/15 bg-ivory/15 sm:grid-cols-2 lg:grid-cols-3">
            {baidx.live.map((f, i) => (
              <li key={f.title} className="bg-ink p-6 transition-colors duration-500 hover:bg-ivory hover:text-ink md:p-8 [&:hover_p]:text-graphite" data-reveal style={delay(i % 3)}>
                <span className="text-label inline-flex items-center gap-2 text-mist">
                  <span className="size-1.5 rounded-full bg-current" aria-hidden="true" /> Live
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
              <div className="md:col-span-4 md:col-start-9">
                <ArtFrame piece={{ ...baidx.images.app, title: "BAID X app", kind: "Coming soon" }} tone="dark" sizes="(min-width: 768px) 28vw, 80vw" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Launch campaign (white) ──────────────────────────────── */}
      <section className="section-y" aria-labelledby="launch-title">
        <div className="container-x">
          <SectionHeading
            label="(05) The launch"
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
