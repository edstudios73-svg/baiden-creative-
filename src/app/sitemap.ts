import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";

/** The site is four pages plus the two legal pages linked from the footer. */
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
    entry("/work", 0.9, "weekly"),
    entry("/about", 0.8),
    entry("/contact", 0.8),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
