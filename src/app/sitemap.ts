import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { caseStudies } from "@/content/projects";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    entry("/", 1, "weekly"),
    entry("/services", 0.9),
    ...services.map((s) => entry(`/services/${s.slug}`, 0.8)),
    entry("/work", 0.9, "weekly"),
    // Only published case studies; listed and draft projects have no page.
    ...caseStudies.map((p) => entry(`/work/${p.slug}`, 0.8)),
    entry("/products", 0.8),
    entry("/products/baid-x", 0.8),
    entry("/about", 0.7),
    entry("/contact", 0.8),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
