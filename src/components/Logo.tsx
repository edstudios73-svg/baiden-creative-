import Image from "next/image";
import { site } from "@/config/site";

/** The existing Baiden Creatives logo. Proportions are fixed by the source artwork; only the height is set. */
export function Logo({ tone = "dark", className = "h-8 w-auto", priority = false }: { tone?: "dark" | "light"; className?: string; priority?: boolean }) {
  return (
    <Image
      src={tone === "dark" ? site.logo.onLight : site.logo.onDark}
      alt={site.name}
      width={site.logo.width}
      height={site.logo.height}
      className={className}
      priority={priority}
      sizes="160px"
    />
  );
}
