import type { Metadata } from "next";
import { absoluteUrl, site } from "@/config/site";

type PageMeta = {
  title: string;
  description: string;
  path: string;
  image?: { src: string; alt: string; width: number; height: number };
  noindex?: boolean;
};

const defaultImage = { src: "/opengraph-image", alt: `${site.name}: ${site.statement}`, width: 1200, height: 630 };

/** Per-route metadata with canonical URL and social previews. Titles get the brand suffix from the root layout template. */
export function pageMetadata({ title, description, path, image = defaultImage, noindex }: PageMeta): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image.src, alt: image.alt }],
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}

const orgId = `${site.url}/#organization`;

export function organizationLd() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: absoluteUrl(site.logo.square),
    description: site.description,
    slogan: site.statement,
    email: site.contact.email,
    telephone: site.contact.phoneIntl,
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    founder: site.founders.map((f) => ({ "@type": "Person", name: f.name, jobTitle: f.role })),
    sameAs: site.social.map((s) => s.url),
    knowsAbout: ["Web design", "Web development", "Digital product design", "Branding", "Graphic design", "UI/UX design"],
  };
}

export function websiteLd() {
  return { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, publisher: { "@id": orgId } };
}

export function breadcrumbLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function serviceLd(s: { title: string; summary: string; path: string }) {
  return {
    "@type": "Service",
    name: s.title,
    description: s.summary,
    url: absoluteUrl(s.path),
    provider: { "@id": orgId },
    areaServed: "Worldwide",
  };
}

export function baidxLd(b: { name: string; url: string; overview: string }) {
  return {
    "@type": "WebApplication",
    name: b.name,
    url: b.url,
    description: b.overview,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    creator: { "@id": orgId },
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
