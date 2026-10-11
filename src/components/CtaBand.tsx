import { site } from "@/config/site";
import { ButtonLink } from "./ui";

export function CtaBand({
  title = (
    <>
      Have an idea <em className="text-lime">worth building?</em>
    </>
  ),
  body = "Tell us what you're working on. We'll reply with honest next steps, whether that's a proposal, a few questions or a referral.",
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="on-dark bg-ink text-ivory" aria-labelledby="cta-title">
      <div className="container-x section-y grid gap-10 lg:grid-cols-12 lg:items-end">
        <h2 id="cta-title" className="text-display-2 lg:col-span-8" data-reveal>
          {title}
        </h2>
        <div className="lg:col-span-4" data-reveal style={{ "--reveal-delay": 1 } as React.CSSProperties}>
          <p className="text-lg text-mist">{body}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            <ButtonLink href="/contact" tone="dark">
              Start a Project
            </ButtonLink>
            <ButtonLink href={site.contact.whatsapp} tone="dark" variant="secondary">
              WhatsApp us
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
