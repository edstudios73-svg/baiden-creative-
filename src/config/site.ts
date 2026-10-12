/**
 * Central company configuration. Every value here is verified against the
 * previous live site (baidencreatives.org) or the company's own repositories.
 * Do not add contact details, profiles or URLs that have not been confirmed.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "");

export const site = {
  name: "Baiden Creatives",
  legalName: null as string | null, // TODO(company): registered legal name, if different, for terms and privacy.
  url: envUrl || "https://www.baidencreatives.org",
  statement: "Built from imagination. Made for impact.",
  summary:
    "We design and build brands, digital products and experiences that help ambitious businesses move forward.",
  // Used as the home page's search description: who the founders are, what the studio does, and BAID X.
  description:
    "Baiden Creatives is a creative and technology company in Accra, Ghana, founded by Baiden David and Baiden Daniel. We design and build websites, apps and brands, and created BAID X, Ghana's work network.",
  base: "Accra, Ghana",
  founded: null as string | null, // TODO(company): founding year, if it should be published.
  // Approved founder photos. Which founder is in the single portrait is not confirmed yet, so it names neither.
  foundersPhotos: [
    {
      src: "/assets/founders/baiden-creatives-founders.jpg",
      width: 720,
      height: 956,
      alt: "Baiden David and Baiden Daniel, the founders of Baiden Creatives",
      caption: "Baiden David & Baiden Daniel",
    },
    {
      src: "/assets/founders/baiden-creatives-co-founder.jpg",
      width: 720,
      height: 956,
      alt: "A co-founder of Baiden Creatives",
      caption: "Co-founder",
    },
  ],
  // photo: add an approved portrait (file in public/assets/founders/) and it appears on /about and in search data.
  founders: [
    { name: "Baiden David", role: "Co-founder", photo: null as { src: string; width: number; height: number } | null },
    { name: "Baiden Daniel", role: "Co-founder", photo: null as { src: string; width: number; height: number } | null },
  ],
  contact: {
    email: "edstudios77@gmail.com",
    phoneDisplay: "+233 55 836 2423",
    phoneIntl: "+233558362423",
    whatsapp: "https://wa.me/233558362423",
  },
  handle: "@baidencreatives",
  social: [
    { label: "TikTok", handle: "@baidencreatives", url: "https://www.tiktok.com/@baidencreatives" },
    { label: "Instagram", handle: "@baidencreatives", url: "https://www.instagram.com/baidencreatives" },
    { label: "X", handle: "@baidencreatives", url: "https://x.com/baidencreatives" },
    // LinkedIn company page, using the handle supplied by the company (12 Oct 2026).
    { label: "LinkedIn", handle: "@baidencreatives", url: "https://www.linkedin.com/company/baidencreatives" },
  ],
  logo: {
    onLight: "/assets/baiden-creatives-logo-black.png",
    onDark: "/assets/baiden-creatives-logo-white.png",
    square: "/assets/baiden-creatives-logo-square.png",
    width: 1000,
    height: 272,
  },
  baidx: {
    name: "BAID X",
    url: "https://www.baid-x.com",
  },
  analytics: {
    // TODO(company): add an analytics provider (e.g. Vercel Web Analytics) once chosen. Nothing is loaded today.
    provider: null as string | null,
  },
} as const;

export const mainNav = [
  { label: "Work", href: "/work" },
  { label: "BAID X", href: "/baid-x" },
  { label: "About", href: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  return path === "/" ? site.url : `${site.url}${path}`;
}
