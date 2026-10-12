import Link from "next/link";
import { services } from "@/content/services";
import { ArrowRight } from "./icons";

/** Editorial index of the six capabilities, one row per service. */
export function CapabilityIndex({ headingLevel: H = "h3" }: { headingLevel?: "h2" | "h3" }) {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.slug} className="border-b border-line" data-reveal style={{ "--reveal-delay": i % 3 } as React.CSSProperties}>
          <Link
            href={`/services/${s.slug}`}
            className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 md:grid-cols-[4rem_minmax(0,5fr)_minmax(0,5fr)_auto] md:gap-x-8 md:py-7"
          >
            <span className="text-label text-graphite">{s.index}</span>
            <H className="text-heading transition-[font-style] group-hover:italic">{s.title}</H>
            <p className="col-start-2 row-start-2 text-graphite md:col-start-3 md:row-start-1">{s.summary}</p>
            <span className="col-start-3 row-start-1 grid size-10 place-items-center border border-ink/15 transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-ivory md:col-start-4">
              <ArrowRight />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
