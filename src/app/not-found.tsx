import type { Metadata } from "next";
import { ButtonLink, Label } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[70vh] flex-col justify-center py-16">
      <Label className="text-graphite">Error 404</Label>
      <h1 className="text-display-1 mt-6">
        Nothing <em>here.</em>
      </h1>
      <p className="text-lead mt-8 max-w-lg text-graphite">This page doesn&apos;t exist or has moved. Here are a few places to go instead.</p>
      <div className="mt-10 grid max-w-xl gap-3 sm:grid-cols-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/work" variant="secondary">
          Work
        </ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact
        </ButtonLink>
      </div>
    </section>
  );
}
