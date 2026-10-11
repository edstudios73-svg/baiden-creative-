export type Img = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "screen" = desktop screenshot, "phone" = mobile screenshot, "print" = flyer/poster/social artwork */
  kind?: "screen" | "phone" | "print";
};

export type ServiceSlug =
  | "web-design-development"
  | "mobile-apps-digital-products"
  | "branding-identity"
  | "graphic-design"
  | "ui-ux-dashboards"
  | "creative-technology";

export type ProjectCategory = "Platforms & products" | "E-commerce" | "Websites" | "Brand & graphics";

/**
 * published  – has a full case study page at /work/[slug]
 * listed     – shown in the work index with a link to the live site, no case study yet
 * draft      – never rendered publicly, never in the sitemap
 */
export type PublicationStatus = "published" | "listed" | "draft";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  services: ServiceSlug[];
  coverImage: Img;
  gallery: Img[];
  clientOrOwner: string;
  /** True when the project belongs to Baiden Creatives itself rather than a client. */
  inHouse?: boolean;
  projectRole: string[];
  challenge?: string;
  approach?: string[];
  solution?: string[];
  /** Only verified, attributable outcomes. Leave empty rather than estimate. */
  outcomes: string[];
  technologies: string[];
  externalUrl?: string;
  publicationStatus: PublicationStatus;
  featured: boolean;
  /** Internal notes for the team. Never rendered. */
  todo?: string[];
};
