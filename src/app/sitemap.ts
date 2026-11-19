import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";
import { baidx } from "@/content/products";
import { caseStudies, getCaseStudy } from "@/content/projects";

/**
 * sitemap.xml: every public page, most important first, each with the images that actually
 * appear on it so they can show in Google Images.
 *
 * lastModified is the date the page's content last changed, not the build time, so Google
 * can trust it. Update UPDATED (or a page's own date) when you change that page.
 */
const UPDATED = "2026-11-19";

type Page = {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  images?: string[];
  lastModified?: string;
};

export default function sitemap(): MetadataRoute.Sitemap {
  const products = caseStudies.filter((p) => p.inHouse);
  const covers = products.flatMap((p) => (p.coverImage ? [p.coverImage.src] : []));
  const baidxGallery = getCaseStudy("baid-x")?.gallery.map((g) => g.src) ?? [];

  const pages: Page[] = [
    // Home: the logo and the product screens in the hero.
    { path: "/", priority: 1, changeFrequency: "weekly", images: [site.logo.square, ...covers] },
    // Products: each product's cover.
    { path: "/work", priority: 0.9, changeFrequency: "weekly", images: covers },
    // About: the founders' portrait.
    { path: "/about", priority: 0.9, changeFrequency: "monthly", images: [site.foundersPortrait.src, site.logo.square] },
    // BAID X: its logo, the product screen and the launch artwork.
    {
      path: "/baid-x",
      priority: 0.8,
      changeFrequency: "monthly",
      images: ["/assets/brand-baidx-logo.png", baidx.images.hero.src, baidx.logoMark.src, ...baidxGallery],
    },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];

  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: new Date(p.lastModified ?? UPDATED),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    ...(p.images?.length ? { images: [...new Set(p.images)].map((src) => absoluteUrl(src)) } : {}),
  }));
}
