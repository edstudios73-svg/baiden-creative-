import type { Metadata } from "next";
import { site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Notice",
  description: `How ${site.name} handles the information you share through this website.`,
  path: "/privacy",
});

// TODO(company): have this notice reviewed by a qualified adviser before relying on it, and add the
// registered legal entity name and address once confirmed.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Notice" path="/privacy" updated="11 October 2026">
      <section>
        <h2>Who we are</h2>
        <p>
          This website is operated by {site.name}, based in {site.base}. If you have questions about this notice or your information,
          email <a className="link-draw text-ink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </section>
      <section>
        <h2>What we collect</h2>
        <p>We only collect what you choose to send us through the project inquiry form:</p>
        <ul>
          <li>your name and email address</li>
          <li>your company or project name, if you provide it</li>
          <li>the services you&apos;re interested in, your project description, budget range and timeline</li>
          <li>a website or reference link, if you provide one</li>
        </ul>
        <p>
          Like most websites, our hosting provider processes technical information such as IP addresses to deliver pages and protect the
          site from abuse. This website does not set advertising or analytics cookies.
        </p>
      </section>
      <section>
        <h2>How we use it</h2>
        <p>
          We use inquiry details only to reply to you and to discuss your project. We don&apos;t sell your information or use it for
          unrelated marketing.
        </p>
      </section>
      <section>
        <h2>Who processes it</h2>
        <p>
          Inquiries are delivered to our inbox through an email delivery provider, and the website is hosted by a cloud hosting provider.
          They process data on our behalf to provide those services.
        </p>
      </section>
      <section>
        <h2>How long we keep it</h2>
        <p>We keep inquiry emails for as long as needed to respond and, if we work together, for the duration of the project and our records.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the information you sent by emailing{" "}
          <a className="link-draw text-ink" href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
        </p>
      </section>
    </LegalPage>
  );
}
