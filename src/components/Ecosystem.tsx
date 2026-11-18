import Link from "next/link";
import { ecosystem } from "@/content/ecosystem";
import { ArrowRight } from "./icons";

/**
 * Plan → Supply → Build → Sell: how Blueprint, SiteMart, BAID X and PropertIQ connect.
 * `hrefFor` decides where each product links (an anchor on /work, or a page).
 */
export function Ecosystem({ tone = "light", hrefFor = (slug: string) => `#${slug}` }: { tone?: "light" | "dark"; hrefFor?: (slug: string) => string }) {
  const dark = tone === "dark";
  const line = dark ? "border-ivory/25" : "border-ink";
  const muted = dark ? "text-mist" : "text-graphite";
  return (
    <ol className={`mt-10 grid border-t md:mt-14 sm:grid-cols-2 lg:grid-cols-4 ${line}`}>
      {ecosystem.map((e, i) => (
        <li key={e.step} className={`border-b ${line} sm:[&:nth-child(even)]:border-l lg:border-b-0 lg:[&:not(:first-child)]:border-l`}>
          <Link
            href={hrefFor(e.slug)}
            className={`group relative flex h-full flex-col gap-5 py-8 transition-colors duration-500 sm:px-6 lg:px-7 lg:py-10 ${
              dark ? "hover:bg-ivory hover:text-ink" : "hover:bg-ink hover:text-ivory"
            }`}
          >
            <span className={`text-label flex items-center justify-between ${muted} ${dark ? "group-hover:text-graphite" : "group-hover:text-mist"}`}>
              <span>
                {String(i + 1).padStart(2, "0")} · {e.step}
              </span>
              {i < ecosystem.length - 1 && <ArrowRight className="size-4" />}
            </span>
            <span className="text-display-3 leading-none">{e.product}</span>
            <span className={`text-sm ${muted} ${dark ? "group-hover:text-graphite" : "group-hover:text-mist"}`}>{e.body}</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
