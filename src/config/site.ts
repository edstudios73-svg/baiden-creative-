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
  description:
    "Baiden Creatives is a creative and technology company from Accra, Ghana. We design and build websites, web apps, digital products and brand identities for ambitious companies, wherever they are.",
  base: "Accra, Ghana",
  founded: null as string | null, // TODO(company): founding year, if it should be published.
  founders: [
    { name: "Baiden David", role: "Co-founder" },
    { name: "Baiden Daniel", role: "Co-founder" },
  ],
  contact: {
    email: "edstudios77@gmail.com",
    phoneDisplay: "+233 55 836 2423",
    phoneIntl: "+233558362423",
    whatsapp: "https://wa.me/233558362423",
  },
  social: [
    { label: "Instagram", handle: "@baidencreatives", url: "https://www.instagram.com/baidencreatives" },
    { label: "TikTok", handle: "@baidencreatives", url: "https://www.tiktok.com/@baidencreatives" },
    { label: "X", handle: "@baidencreatives", url: "https://x.com/baidencreatives" },
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
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
] as const;

export function absoluteUrl(path = "/") {
  return path === "/" ? site.url : `${site.url}${path}`;
}
