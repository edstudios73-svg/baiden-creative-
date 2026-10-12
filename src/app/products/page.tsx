import type { Metadata } from "next";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { BaidxFeature } from "@/components/BaidxFeature";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd, Label, PageHeader } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Products",
  description:
    "Original products conceived, designed and built by Baiden Creatives, starting with BAID X, Ghana's work network.",
  path: "/products",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const reasons = [
  {
    title: "We feel the whole problem",
    body: "Owning a product means living with every decision after launch: support, payments, trust and change. That experience goes into client work.",
  },
  {
    title: "We prove it in public",
    body: "BAID X is live and anyone can use it. That's a stronger case for our work than anything we could write here.",
  },
  {
    title: "We keep identities distinct",
    body: "A product gets its own name, brand and audience. Baiden Creatives stays the studio behind it.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Products we build <em>for ourselves.</em>
          </>
        }
        lead="Alongside client work, we conceive, design and build original products. They're where we test ideas at full scale, and where we show what we can deliver."
      />

      <section className="on-dark section-y bg-ink text-ivory" aria-label="BAID X">
        <div className="container-x">
          <BaidxFeature />
        </div>
      </section>

      <section className="section-y" aria-labelledby="why-title">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <Label className="text-graphite">Why we build products</Label>
            <h2 id="why-title" className="text-display-3 mt-4">
              A studio that ships its own work.
            </h2>
          </div>
          <ul className="grid gap-10 md:grid-cols-3 lg:col-span-8">
            {reasons.map((r) => (
              <li key={r.title} className="border-t border-ink/80 pt-5" data-reveal>
                <h3 className="text-heading">{r.title}</h3>
                <p className="mt-3 text-graphite">{r.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand
        title={
          <>
            Building a product of <em>your own?</em>
          </>
        }
        body="We bring the same product thinking, design and engineering to founders and companies building platforms of their own."
      />
      <JsonLd data={graph(breadcrumbLd(crumbs))} />
    </>
  );
}
