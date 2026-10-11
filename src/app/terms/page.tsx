import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: `Terms for using the ${site.name} website.`,
  path: "/terms",
});

// TODO(company): have these terms reviewed by a qualified adviser, and add the registered legal entity name.
// Project work is governed by each client's own agreement, not by these website terms.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" path="/terms" updated="11 October 2026">
      <section>
        <h2>About these terms</h2>
        <p>
          These terms cover your use of this website, operated by {site.name}. They don&apos;t cover client projects. Each project is
          governed by its own written agreement.
        </p>
      </section>
      <section>
        <h2>Our content and work</h2>
        <p>
          The text, design and code of this website belong to {site.name}. Project images are shown as examples of our work, and remain the
          property of {site.name} or the respective client. Please don&apos;t reuse them without permission.
        </p>
      </section>
      <section>
        <h2>Third-party sites</h2>
        <p>
          We link to live client websites and to BAID X. Those sites are run under their own terms and privacy policies, which apply when you
          use them.
        </p>
      </section>
      <section>
        <h2>Accuracy</h2>
        <p>
          We work to keep this website accurate. Descriptions of services and products are general information, not an offer; the scope and
          price of any work are set in a written proposal.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about these terms? Email <a className="link-draw text-ink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>{" "}
          or use our <Link className="link-draw text-ink" href="/contact">project form</Link>.
        </p>
      </section>
    </LegalPage>
  );
}
