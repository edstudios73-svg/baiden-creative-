import type { Metadata } from "next";
import { site } from "@/config/site";
import { breadcrumbLd, graph, pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd, Label, PageHeader, SmartLink } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Start a Project",
  description:
    "Tell Baiden Creatives about your website, product, brand or campaign. Share your goals, budget and timeline and we'll reply with clear next steps.",
  path: "/contact",
});

const crumbs = [
  { name: "Home", path: "/" },
  { name: "Start a Project", path: "/contact" },
];

const next = [
  { title: "We read it properly", body: "We read every inquiry and reply, usually with a few questions." },
  { title: "We talk it through", body: "A call or written exchange to understand the goals, constraints and timeline." },
  { title: "You get a clear proposal", body: "Scope, schedule and cost in writing before any work begins." },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <>
            Start a <em>project.</em>
          </>
        }
        lead="Tell us what you're working on. The more context you share, the more useful our first reply will be."
      />

      <section className="container-x grid gap-12 pt-10 pb-16 md:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-10" aria-label="Project inquiry">
        <div className="lg:col-span-7 xl:col-span-7">
          <ContactForm />
        </div>

        <aside className="lg:col-span-4 lg:col-start-9" aria-label="Other ways to reach us">
          <div className="lg:sticky lg:top-32">
            <Label className="text-graphite">Prefer to talk directly?</Label>
            <ul className="mt-6 border-t border-line">
              <li className="border-b border-line py-5">
                <p className="text-label text-graphite">Email</p>
                <a className="link-draw mt-1 inline-block text-lg break-all" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
              <li className="border-b border-line py-5">
                <p className="text-label text-graphite">WhatsApp</p>
                <SmartLink className="link-draw mt-1 inline-block text-lg" href={site.contact.whatsapp}>
                  {site.contact.phoneDisplay}
                </SmartLink>
              </li>
              <li className="border-b border-line py-5">
                <p className="text-label text-graphite">Phone</p>
                <a className="link-draw mt-1 inline-block text-lg" href={`tel:${site.contact.phoneIntl}`}>
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="border-b border-line py-5">
                <p className="text-label text-graphite">Based in</p>
                <p className="mt-1 text-lg">{site.base}, working worldwide</p>
              </li>
            </ul>

            <h2 className="text-label mt-10 text-graphite">What happens next</h2>
            <ol className="mt-6 grid gap-6">
              {next.map((n, i) => (
                <li key={n.title} className="grid grid-cols-[2.25rem_1fr]">
                  <span className="text-label pt-1 text-graphite">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{n.title}</h3>
                    <p className="mt-1 text-graphite">{n.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
      <JsonLd data={graph(breadcrumbLd(crumbs), { "@type": "ContactPage", url: `${site.url}/contact`, about: { "@id": `${site.url}/#organization` } })} />
    </>
  );
}
