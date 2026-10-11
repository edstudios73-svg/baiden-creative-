"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectCategory } from "@/content/types";
import { ProjectCard } from "./ProjectCard";
import { EmptyState } from "./ui";

type Filter = "All" | ProjectCategory;

export function WorkIndex({ projects, categories }: { projects: Project[]; categories: ProjectCategory[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const counts = useMemo(() => {
    const c = new Map<Filter, number>([["All", projects.length]]);
    for (const p of projects) c.set(p.category, (c.get(p.category) ?? 0) + 1);
    return c;
  }, [projects]);
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);
  const filters: Filter[] = ["All", ...categories];

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-[clamp(1rem,0.4rem+3vw,3rem)] bg-ivory/95 px-[clamp(1rem,0.4rem+3vw,3rem)] py-4 backdrop-blur md:top-20">
        <div role="group" aria-label="Filter projects by category" className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
              className="flex min-h-11 shrink-0 items-center gap-2 border border-ink/20 px-4 text-sm transition-colors hover:border-ink aria-pressed:border-ink aria-pressed:bg-ink aria-pressed:text-ivory"
            >
              {f}
              <span className="font-mono text-xs opacity-60">{counts.get(f) ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"} shown
      </p>
      {visible.length === 0 ? (
        <div className="mt-10">
          <EmptyState title="Nothing here yet">We haven&apos;t published work in this category. Try another filter.</EmptyState>
        </div>
      ) : (
        <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} sizes="(min-width: 768px) 50vw, 100vw" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
