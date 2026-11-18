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
 * published  – featured on /work with its full write-up
 * listed     – in the /work index with a link to the live site
 * draft      – never rendered publicly, never in the sitemap
 */
export type PublicationStatus = "published" | "listed" | "draft";

export type Project = {
  title: string;
  slug: string;
  summary: string;
  category: ProjectCategory;
  services: ServiceSlug[];
  /** A screenshot of the live product. Products without one yet get a typographic poster. */
  coverImage?: Img;
  gallery: Img[];
  clientOrOwner: string;
  /** True when the project belongs to Baiden Creatives itself rather than a client. */
  inHouse?: boolean;
  /** One short line for product lists, e.g. "Ghana's work network". */
  tagline?: string;
  /** Three short points for the products page, a few words each. */
  highlights?: string[];
  /** Shown when there is no live link yet, e.g. "Launching soon". Defaults to "Coming soon". */
  status?: string;
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
