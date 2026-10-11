import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "./icons";

type Tone = "light" | "dark";

const isExternal = (href: string) => /^(https?:|mailto:|tel:)/.test(href);
const opensNewTab = (href: string) => /^https?:/.test(href);

/** Link that handles internal routes and external destinations (new tab, safe rel, announced to screen readers). */
export function SmartLink({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  if (isExternal(href)) {
    const newTab = opensNewTab(href);
    return (
      <a href={href} {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {children}
        {newTab && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

/** Primary and secondary call-to-action buttons. Square-cornered by design. */
export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  tone?: Tone;
  className?: string;
}) {
  const base =
    "group inline-flex min-h-12 items-center justify-between gap-6 px-5 py-3 text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300";
  const styles = {
    primary: {
      light: "bg-ink text-ivory hover:bg-ink-2",
      dark: "bg-lime text-ink hover:bg-ivory",
    },
    secondary: {
      light: "border border-ink/25 text-ink hover:border-ink",
      dark: "border border-ivory/30 text-ivory hover:border-ivory",
    },
  }[variant][tone];
  const Icon = opensNewTab(href) ? ArrowUpRight : ArrowRight;
  return (
    <SmartLink href={href} className={`${base} ${styles} ${className}`}>
      <span>{children}</span>
      <Icon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5" />
    </SmartLink>
  );
}

/** Understated text link with arrow, used for "see more" style navigation. */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  const Icon = opensNewTab(href) ? ArrowUpRight : ArrowRight;
  return (
    <SmartLink href={href} className={`group inline-flex items-center gap-2 font-medium ${className}`}>
      <span className="link-draw pb-0.5">{children}</span>
      <Icon className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
    </SmartLink>
  );
}

export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-label ${className}`}>{children}</p>;
}

/** Section heading: mono label, display title and optional aside link, aligned on the grid. */
export function SectionHeading({
  label,
  title,
  intro,
  action,
  tone = "light",
  as: As = "h2",
}: {
  label: string;
  title: ReactNode;
  intro?: ReactNode;
  action?: ReactNode;
  tone?: Tone;
  as?: "h1" | "h2";
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end" data-reveal>
      <div className="md:col-span-8">
        <Label className={tone === "dark" ? "text-mist" : "text-graphite"}>{label}</Label>
        <As className="text-display-3 mt-4">{title}</As>
        {intro && <div className={`text-lead mt-5 max-w-2xl ${tone === "dark" ? "text-mist" : "text-graphite"}`}>{intro}</div>}
      </div>
      {action && <div className="md:col-span-4 md:justify-self-end">{action}</div>}
    </div>
  );
}

export function Breadcrumbs({ items, tone = "light" }: { items: { name: string; path: string }[]; tone?: Tone }) {
  return (
    <nav aria-label="Breadcrumb" className={`text-label ${tone === "dark" ? "text-mist" : "text-graphite"}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {items.map((it, i) => (
          <li key={it.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {i === items.length - 1 ? (
              <span aria-current="page">{it.name}</span>
            ) : (
              <Link href={it.path} className="link-draw">
                {it.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Page header used by every inner page: breadcrumb, large title and lead. */
export function PageHeader({
  crumbs,
  title,
  lead,
  children,
}: {
  crumbs: { name: string; path: string }[];
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="container-x pt-10 pb-14 md:pt-16 md:pb-20">
      <Breadcrumbs items={crumbs} />
      <h1 className="text-display-2 mt-8 max-w-[14ch] md:mt-12">{title}</h1>
      {lead && <div className="text-lead mt-8 max-w-2xl text-graphite">{lead}</div>}
      {children}
    </header>
  );
}

export function JsonLd({ data }: { data: object }) {
  // JSON.stringify output with "<" escaped cannot break out of the script element.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function EmptyState({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-ink/25 px-6 py-14 text-center" role="status">
      <p className="text-heading">{title}</p>
      {children && <div className="mx-auto mt-3 max-w-md text-graphite">{children}</div>}
    </div>
  );
}

export function Faq({ items, tone = "light" }: { items: readonly { q: string; a: string }[]; tone?: Tone }) {
  const line = tone === "dark" ? "border-line-dark" : "border-line";
  return (
    <div className={`border-t ${line}`}>
      {items.map((f) => (
        <details key={f.q} className={`group border-b ${line}`}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
            <span>{f.q}</span>
            <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center text-xl leading-none transition-transform duration-300 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className={`max-w-3xl pb-7 ${tone === "dark" ? "text-mist" : "text-graphite"}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
