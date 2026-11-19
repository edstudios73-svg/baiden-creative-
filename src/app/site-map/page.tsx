import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { ecosystemPromise } from "@/content/ecosystem";
import { faq } from "@/content/faq";
import { publicProjects } from "@/content/projects";
import { services } from "@/content/services";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { Ecosystem } from "@/components/Ecosystem";
import { ArrowUpRight } from "@/components/icons";
import { JsonLd, Label, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Site Map",
  description: `Every page on ${site.name}: who we are, what we do, our five products (Blueprint, SiteMart, BAID X, PropertIQ and Skin Lab) and how they connect.`,
  path: "/site-map",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Site map", path: "/site-map" },
];

// Every public page, with what it is for.
const pages = [
  { name: "Home", path: "/", body: "Who we are, our five products, what we do and how the products connect." },
  { name: "Products", path: "/work", body: "Blueprint, SiteMart, BAID X, PropertIQ and Skin Lab, each with its status and highlights." },
  { name: "BAID X", path: "/baid-x", body: "The story of BAID X: verified workers, escrow payments and how money moves on a job." },
  { name: "About", path: "/about", body: "Our founders, Baiden David and Baiden Daniel, our mission and our vision." },
  { name: "Contact", path: "/contact", body: "Start a project, or reach us by email, phone or WhatsApp." },
  { name: "Privacy Policy", path: "/privacy", body: "How we handle the information you send us." },
  { name: "Terms", path: "/terms", body: "The terms for using this website." },
];

export default function SiteMapPage() {
  const products = publicProjects.filter((p) => p.inHouse);
  const productHref = (slug: string) => (slug === "baid-x" ? "/baid-x" : `/work#${slug}`);

  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title="Site map"
        lead={`${site.name} is a creative and technology company in Accra, Ghana, founded by ${site.founders[0].name} and ${site.founders[1].name}. We design, build and run five products of our own.`}
      />

      {/* ── Pages (white) ────────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="pages-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label className="text-graphite">01 · Pages</Label>
            <h2 id="pages-title" className="text-display-3 mt-4">
              Every page.
            </h2>
          </div>
          <ul className="border-t border-ink lg:col-span-8">
            {pages.map((p) => (
              <li key={p.path} className="border-b border-ink/15">
                <Link href={p.path} className="group grid gap-1 py-5 transition-colors duration-300 hover:bg-ink hover:text-ivory md:grid-cols-[12rem_1fr] md:gap-6 md:px-3">
                  <span className="text-heading">{p.name}</span>
                  <span className="text-graphite group-hover:text-mist">{p.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Products (black) ─────────────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="products-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label className="text-mist">02 · Products</Label>
            <h2 id="products-title" className="text-display-3 mt-4">
              Five products.
            </h2>
          </div>
          <ul className="border-t border-ivory/25 lg:col-span-8">
            {products.map((p) => (
              <li key={p.slug} className="grid gap-2 border-b border-ivory/25 py-6 md:grid-cols-[12rem_1fr] md:gap-6">
                <div>
                  <Link href={productHref(p.slug)} className="text-heading link-draw">
                    {p.title}
                  </Link>
                  <p className="text-label mt-2 text-mist">{p.externalUrl ? "Live" : (p.status ?? "Coming soon")}</p>
                </div>
                <div>
                  <p className="text-mist">{p.summary}</p>
                  {p.externalUrl && (
                    <a href={p.externalUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm link-draw">
                      {p.externalUrl.replace(/^https?:\/\/(www\.)?/, "")}
                      <ArrowUpRight className="size-3.5" />
                    </a>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How they connect (white) ─────────────────────────────── */}
      <section className="section-y" aria-labelledby="connect-title">
        <div className="container-x">
          <Label className="text-graphite">03 · How they connect</Label>
          <h2 id="connect-title" className="text-display-3 mt-4">
            Plan. Supply. Build. <em>Sell.</em>
          </h2>
          <p className="text-lead mt-5 max-w-2xl text-graphite">{ecosystemPromise}</p>
          <Ecosystem hrefFor={productHref} />
          <p className="mt-8 max-w-2xl text-graphite">
            Skin Lab stands on its own: our laptop sticker and skin shop, printed in Accra.
          </p>
        </div>
      </section>

      {/* ── What we do (black) ───────────────────────────────────── */}
      <section className="on-dark section-y bg-ink text-ivory" aria-labelledby="services-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label className="text-mist">04 · What we do</Label>
            <h2 id="services-title" className="text-display-3 mt-4">
              Six disciplines.
            </h2>
          </div>
          <ul className="border-t border-ivory/25 lg:col-span-8">
            {services.map((s) => (
              <li key={s.slug} className="grid gap-1 border-b border-ivory/25 py-5 md:grid-cols-[16rem_1fr] md:gap-6">
                <span className="text-heading">{s.title}</span>
                <span className="text-mist">{s.summary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Questions (white) ────────────────────────────────────── */}
      <section className="section-y" aria-labelledby="faq-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Label className="text-graphite">05 · Questions</Label>
            <h2 id="faq-title" className="text-display-3 mt-4">
              In short.
            </h2>
          </div>
          <div className="border-t border-ink lg:col-span-8">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-ink/15">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-heading [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-xl leading-none transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 text-graphite">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <JsonLd
        data={graph(
          breadcrumbLd(crumbs),
          { "@type": "WebPage", url: `${site.url}/site-map`, name: "Site map", about: { "@id": `${site.url}/#organization` } },
          {
            "@type": "FAQPage",
            "@id": `${site.url}/site-map#faq`,
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        )}
      />
    </>
  );
}
