import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 2048],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // Any *.vercel.app address (previews included) stays out of search; only the real domain is indexed.
      {
        source: "/:path*",
        has: [{ type: "host", value: ".*\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/assets/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" }],
      },
    ];
  },
  async redirects() {
    // URLs from the previous static site, kept alive for search engines and shared links.
    return [
      // The production vercel.app aliases send visitors and search engines to the real domain.
      {
        source: "/:path*",
        has: [{ type: "host", value: "baiden-creatives(-mcdan|-git-main-mcdan)?\\.vercel\\.app" }],
        destination: "https://www.baidencreatives.org/:path*",
        permanent: true,
      },
      { source: "/start-a-project", destination: "/contact", permanent: true },
      { source: "/pricing", destination: "/contact", permanent: true },
      { source: "/organisations", destination: "/about", permanent: true },
      // The site is now four pages: home, work, about and contact.
      { source: "/services", destination: "/work", permanent: true },
      { source: "/services/:path*", destination: "/work", permanent: true },
      { source: "/products", destination: "/about", permanent: true },
      { source: "/products/baid-x", destination: "/baid-x", permanent: true },
      { source: "/products/:path*", destination: "/about", permanent: true },
      { source: "/work/:slug", destination: "/work", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/:page(about|work|pricing|organisations|start-a-project).html", destination: "/:page", permanent: true },
    ];
  },
};

export default nextConfig;
