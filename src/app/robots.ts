import type { MetadataRoute } from "next";
import { absoluteUrl, site } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  // Only the production domain is indexable. Preview deployments (VERCEL_ENV=preview) are kept out of search.
  const isProduction = process.env.VERCEL_ENV ? process.env.VERCEL_ENV === "production" : true;
  return {
    rules: isProduction ? [{ userAgent: "*", allow: "/", disallow: ["/api/"] }] : [{ userAgent: "*", disallow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: site.url,
  };
}
