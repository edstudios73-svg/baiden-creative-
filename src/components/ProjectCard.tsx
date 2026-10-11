import Image from "next/image";
import { projectHref } from "@/content/projects";
import type { Project } from "@/content/types";
import { ArrowRight, ArrowUpRight } from "./icons";
import { SmartLink } from "./ui";

const aspect = {
  wide: "aspect-[16/9]",
  standard: "aspect-[16/10]",
  tall: "aspect-[4/5]",
} as const;

/**
 * Editorial project preview. The whole card is clickable through the title link's stretched hit area,
 * so screen readers hear one link per project.
 */
export function ProjectCard({
  project,
  variant = "standard",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  headingLevel: H = "h3",
}: {
  project: Project;
  variant?: keyof typeof aspect;
  sizes?: string;
  priority?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const href = projectHref(project);
  const external = project.publicationStatus !== "published";
  const Icon = external ? ArrowUpRight : ArrowRight;

  return (
    <article className="group relative" data-reveal>
      <div className={`frame img-zoom ${aspect[variant]}`}>
        <Image
          src={project.coverImage.src}
          alt={project.coverImage.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
      <div className="mt-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-2">
        <p className="text-label text-graphite">
          {project.category}
          {project.inHouse && <span className="ml-3 bg-lime px-1.5 py-0.5 text-ink">Original product</span>}
        </p>
        <Icon className="row-span-2 mt-1 size-5 transition-transform duration-300 group-hover:translate-x-1" />
        <H className="text-heading">
          {href ? (
            <SmartLink href={href} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.title}
            </SmartLink>
          ) : (
            project.title
          )}
        </H>
        <p className="col-span-2 max-w-xl text-graphite">{project.summary}</p>
        {external && project.externalUrl && (
          <p className="text-label col-span-2 text-graphite">Visit the live site</p>
        )}
      </div>
    </article>
  );
}
