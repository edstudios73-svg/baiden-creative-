import { processSteps } from "@/content/company";
import { Label } from "./ui";

/** The six-step approach. Sticky heading on large screens, steps in a two-column list. */
export function ProcessList({ title, intro }: { title: React.ReactNode; intro: React.ReactNode }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32" data-reveal>
          <Label className="text-graphite">Our approach</Label>
          <h2 className="text-display-3 mt-4">{title}</h2>
          <div className="mt-6 max-w-sm text-graphite">{intro}</div>
        </div>
      </div>
      <ol className="grid gap-x-10 sm:grid-cols-2 lg:col-span-8">
        {processSteps.map((s, i) => (
          <li key={s.n} className="border-t border-ink/80 pt-5 pb-12" data-reveal style={{ "--reveal-delay": i % 2 } as React.CSSProperties}>
            <span className="text-label text-graphite">{s.n}</span>
            <h3 className="text-display-3 mt-3">{s.title}</h3>
            <p className="mt-3 max-w-sm text-graphite">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
