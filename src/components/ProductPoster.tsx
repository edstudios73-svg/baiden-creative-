import type { Project } from "@/content/types";

/**
 * The cover for a product that has no screenshot yet: its name set large, as a poster.
 * Fills its parent, so the caller sets the aspect ratio.
 */
export function ProductPoster({ project, tone = "dark" }: { project: Project; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div
      className={`absolute inset-0 flex flex-col justify-between overflow-hidden p-6 md:p-10 ${dark ? "bg-ink-2 text-ivory" : "bg-paper text-ink"}`}
      role="img"
      aria-label={`${project.title}${project.family ? ` by ${project.family}` : ""}: ${project.tagline ?? project.summary}`}
    >
      {/* Construction grid, like a sheet of drawing paper */}
      <svg aria-hidden="true" className={`absolute inset-0 h-full w-full ${dark ? "text-ivory/10" : "text-ink/10"}`} preserveAspectRatio="none">
        <defs>
          <pattern id={`grid-${project.slug}`} width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#grid-${project.slug})`} />
      </svg>
      <p className={`text-label relative flex justify-between gap-4 ${dark ? "text-mist" : "text-graphite"}`}>
        <span>{project.family ? `A ${project.family} product` : project.category}</span>
        <span>{project.externalUrl ? "Live" : (project.status ?? "Coming soon")}</span>
      </p>
      <div className="relative">
        <p className="font-display text-[clamp(3rem,1.5rem+6vw,7.5rem)] leading-[0.9]">{project.title}</p>
        {project.family && <p className={`mt-2 font-display text-[clamp(1.4rem,1rem+1.6vw,2.5rem)] italic ${dark ? "text-mist" : "text-graphite"}`}>by {project.family}</p>}
        {project.tagline && <p className={`mt-6 max-w-md ${dark ? "text-mist" : "text-graphite"}`}>{project.tagline}</p>}
      </div>
    </div>
  );
}
