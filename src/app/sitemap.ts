import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";
import { baidx } from "@/content/products";
import { caseStudies } from "@/content/projects";
import { studio } from "@/content/studio";

/**
 * The main pages, the BAID X story, plus the two legal pages linked from the footer.
 * Each page lists its key images so they can appear in image search.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly", images: string[] = []) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
    ...(images.length ? { images: [...new Set(images)].map((src) => absoluteUrl(src)) } : {}),
  });
  const baidxStory = caseStudies.find((p) => p.slug === "baid-x");
  const baidxImages = [
    "/assets/brand-baidx-logo.png",
    baidx.logoMark.src,
    baidx.images.hero.src,
    ...baidx.people.map((p) => p.src),
    ...(baidxStory?.gallery.map((g) => g.src) ?? []),
  ];
  const workImages = [...caseStudies.flatMap((p) => [p.coverImage.src, ...p.gallery.map((g) => g.src)]), ...Object.values(studio).map((s) => s.src)];
  const brandImages = [site.logo.square, site.logo.onDark, "/assets/character.png"];
  return [
    entry("/", 1, "weekly", [...brandImages, baidx.images.hero.src]),
    entry("/work", 0.9, "weekly", workImages),
    entry("/baid-x", 0.8, "monthly", baidxImages),
    entry("/about", 0.8, "monthly", [site.logo.square, ...site.founders.flatMap((f) => (f.photo ? [f.photo.src] : []))]),
    entry("/contact", 0.8),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
  ];
}
