import type { ServiceSlug } from "./types";

export type Service = {
  slug: ServiceSlug;
  index: string;
  title: string;
  shortTitle: string;
  /** One line for lists and cards. */
  summary: string;
  /** Value proposition shown as the page lead. */
  lead: string;
  problems: string[];
  audience: string[];
  deliverables: { title: string; items: string[] }[];
  /** Service-specific notes on how the general process applies. */
  processNotes: string[];
  faqs: { q: string; a: string }[];
  related: ServiceSlug[];
  /** Plain statement of where this practice stands today, shown on the page. */
  practiceNote?: string;
  seoTitle: string;
  seoDescription: string;
};

export const services: Service[] = [
  {
    slug: "web-design-development",
    index: "01",
    title: "Web design & development",
    shortTitle: "Web design & development",
    summary: "Websites, online stores and web platforms that load fast, read clearly and are easy to run.",
    lead:
      "We design and engineer websites and web platforms as one piece of work, so what is designed is what ships, on every screen size.",
    problems: [
      "A site that looks fine on a laptop but falls apart on the phones your customers actually use.",
      "Pages that are slow to load, hard to find on search engines or impossible to update without a developer.",
      "An online store or booking flow that loses people between “interested” and “ordered”.",
    ],
    audience: [
      "Companies replacing a dated or underperforming website",
      "Founders launching a new product or business",
      "Retailers moving their catalogue and orders online",
      "Organisations that need content their own team can manage",
    ],
    deliverables: [
      { title: "Websites", items: ["Company and product websites", "Landing pages and campaign sites", "Redesigns and migrations"] },
      { title: "Commerce", items: ["Product catalogues, cart and checkout", "WhatsApp, mobile money and card ordering flows", "Store admin, stock and promotions"] },
      { title: "Web platforms", items: ["Accounts, roles and dashboards", "Databases, APIs and integrations", "Content management for your team"] },
      { title: "Launch", items: ["Domain, hosting and SSL", "Search setup: metadata, sitemaps, structured data", "Analytics and handover"] },
    ],
    processNotes: [
      "We design mobile first, because that is where most visitors arrive.",
      "Content and search structure are planned before visual design, not patched in afterwards.",
      "Every site launches with structured data, a sitemap and the analytics you agree on.",
    ],
    faqs: [
      {
        q: "Can my team update the site after launch?",
        a: "Yes. Where content changes often (products, sermons, events, menus) we build an admin so your team can edit it directly. Simpler sites can be updated by us on request.",
      },
      {
        q: "Do you work with clients outside Ghana?",
        a: "Yes. We work remotely, with written briefs, scheduled reviews and shared staging links, so location doesn't decide who we can work with.",
      },
      {
        q: "Who owns the website when it's finished?",
        a: "Ownership of the code, content and accounts is set out in the project agreement before work starts.",
      },
    ],
    related: ["ui-ux-dashboards", "branding-identity", "mobile-apps-digital-products"],
    seoTitle: "Web Design & Development",
    seoDescription:
      "Websites, online stores and web platforms designed and engineered by Baiden Creatives: fast, mobile-first, search-ready and easy to manage.",
  },
  {
    slug: "mobile-apps-digital-products",
    index: "02",
    title: "Mobile apps & digital products",
    shortTitle: "Mobile apps & products",
    summary: "Product thinking, interface design and engineering for platforms people use every day.",
    lead:
      "We build digital products the way we build our own: start from the problem, design the smallest product that solves it, then grow it with real use.",
    problems: [
      "An idea for a platform or app with no clear first version.",
      "A product that works for one type of user but not the others it depends on.",
      "Payments, verification or messaging that need to be trustworthy from day one.",
    ],
    audience: [
      "Founders taking a product from idea to first release",
      "Companies turning an internal process into a product",
      "Teams that need design and engineering under one roof",
    ],
    deliverables: [
      { title: "Product definition", items: ["Problem and user mapping", "First-release scope", "Roles, permissions and key flows"] },
      { title: "Design", items: ["Interface design for web and mobile", "Clickable prototypes", "Design systems for growing products"] },
      { title: "Engineering", items: ["Web platforms and progressive web apps", "Cross-platform mobile apps with Flutter", "Payments, wallets and integrations"] },
    ],
    processNotes: [
      "We map every type of user before designing screens, because platforms only work when each side gets value.",
      "Trust features (verification, escrow, permissions) are designed in, not bolted on.",
    ],
    faqs: [
      {
        q: "Have you shipped a mobile app?",
        a: "Our own product, BAID X, runs on the web today, and its Flutter mobile app is in development. We say so plainly, and we're happy to talk through what that work involves.",
      },
      {
        q: "Can you work with our existing developers?",
        a: "Yes. We can take on design, product definition or a specific part of the build alongside an in-house team.",
      },
    ],
    related: ["ui-ux-dashboards", "web-design-development", "creative-technology"],
    practiceNote:
      "Our product work is proven on the web through BAID X. Mobile apps are an active practice: the BAID X Flutter app is in development and has not been released yet.",
    seoTitle: "Mobile Apps & Digital Products",
    seoDescription:
      "Product definition, interface design and engineering for web platforms and mobile apps, from the team that built BAID X.",
  },
  {
    slug: "branding-identity",
    index: "03",
    title: "Branding & visual identity",
    shortTitle: "Branding & identity",
    summary: "Logos and identity systems that stay consistent from a menu board to a mobile screen.",
    lead:
      "A brand is the set of decisions that make everything you publish look and sound like you. We make those decisions with you and document them so they last.",
    problems: [
      "A logo that exists, but no system for using it, so every flyer looks different.",
      "A brand that works on print but breaks down on social media or the web.",
      "A new product or business that needs an identity before it launches.",
    ],
    audience: [
      "New businesses and products preparing to launch",
      "Established businesses refreshing an inconsistent look",
      "Hospitality, retail and community organisations with lots of everyday content",
    ],
    deliverables: [
      { title: "Identity", items: ["Logo and logo variations", "Colour palette and typography", "Visual direction for photography and graphics"] },
      { title: "Application", items: ["Menus, signage and print", "Social media templates", "Website and product interface styling"] },
      { title: "Guidelines", items: ["Usage rules your team can follow", "Source files and exports"] },
    ],
    processNotes: [
      "We test the identity on the real things you publish (menus, posts, screens) before it's signed off.",
    ],
    faqs: [
      {
        q: "Can you refresh our brand without starting over?",
        a: "Yes. Often the right answer is to keep what people already recognise and build a clearer system around it.",
      },
    ],
    related: ["graphic-design", "web-design-development", "creative-technology"],
    seoTitle: "Branding & Visual Identity",
    seoDescription:
      "Logos and visual identity systems by Baiden Creatives, designed to stay consistent across print, social media, websites and products.",
  },
  {
    slug: "graphic-design",
    index: "04",
    title: "Graphic design & creative campaigns",
    shortTitle: "Graphic design & campaigns",
    summary: "Launch campaigns, flyers, menus and social content with one consistent visual voice.",
    lead:
      "From a product launch to a weekly special, we design the graphics that tell people what is happening and why they should care, in a style that builds your brand over time.",
    problems: [
      "Every post and flyer designed from scratch, with no consistent look.",
      "A launch or event that needs a full set of materials, fast.",
      "Graphics that look good but don't say clearly what to do next.",
    ],
    audience: [
      "Businesses with a regular rhythm of promotions",
      "Products and organisations planning a launch",
      "Churches, schools and community organisations with recurring events",
    ],
    deliverables: [
      { title: "Campaigns", items: ["Launch campaigns across print and social", "Event and announcement series"] },
      { title: "Everyday design", items: ["Flyers and posters", "Menus and price lists", "Social media posts and templates"] },
    ],
    processNotes: ["Campaign pieces are designed as a set, so each piece reinforces the others."],
    faqs: [
      {
        q: "Can you design graphics on a regular basis?",
        a: "Yes. Recurring design can be agreed as ongoing support, with templates that keep turnaround quick.",
      },
    ],
    related: ["branding-identity", "creative-technology", "web-design-development"],
    seoTitle: "Graphic Design & Creative Campaigns",
    seoDescription:
      "Launch campaigns, flyers, menus and social media design by Baiden Creatives, with one consistent visual voice.",
  },
  {
    slug: "ui-ux-dashboards",
    index: "05",
    title: "UI/UX & dashboards",
    shortTitle: "UI/UX & dashboards",
    summary: "Interfaces and admin dashboards that make complex work feel straightforward.",
    lead:
      "The screens your team uses every day deserve the same care as the ones your customers see. We design interfaces and dashboards around the real tasks people need to get done.",
    problems: [
      "Updating products, events or content means messaging a developer.",
      "An internal tool that works but nobody wants to use.",
      "A product flow where users drop off and you can't see why.",
    ],
    audience: [
      "Businesses that need to manage their own catalogue, content or orders",
      "Product teams improving an existing interface",
      "Platforms with several user roles",
    ],
    deliverables: [
      { title: "Research & structure", items: ["Task and flow mapping", "Information architecture", "Wireframes"] },
      { title: "Interface design", items: ["High-fidelity UI for web and mobile", "Prototypes for review", "Component libraries and design systems"] },
      { title: "Dashboards", items: ["Admin panels for products, stock, orders and content", "Role-based access", "Analytics views"] },
    ],
    processNotes: ["We design dashboards around the most frequent tasks first, and make the rare ones findable."],
    faqs: [
      {
        q: "Can you redesign an interface we already have?",
        a: "Yes. We start by understanding how it's used today, then improve the parts that matter most rather than changing everything at once.",
      },
    ],
    related: ["web-design-development", "mobile-apps-digital-products", "branding-identity"],
    seoTitle: "UI/UX Design & Dashboards",
    seoDescription:
      "Interface design and admin dashboards by Baiden Creatives, built around the real tasks your customers and team need to get done.",
  },
  {
    slug: "creative-technology",
    index: "06",
    title: "Creative technology",
    shortTitle: "Creative technology",
    summary: "Motion, code-driven video and interactive work where design and engineering meet.",
    lead:
      "Some ideas are best told with movement and interaction. We use code as a creative tool: motion films composed from real product screens, and interactive web experiences.",
    problems: [
      "A product that is hard to explain in a static image.",
      "A launch that needs a short film without a full production crew.",
      "Tutorials and walkthroughs that go out of date as soon as the product changes.",
    ],
    audience: [
      "Products and stores that want promotional or explainer video",
      "Teams that need tutorial videos for their own tools",
      "Brands that want a more expressive web presence",
    ],
    deliverables: [
      { title: "Motion", items: ["Promotional films built from your live product", "Tutorial and walkthrough videos", "Animated social content"] },
      { title: "Interactive", items: ["Motion and interaction design for websites", "Interactive product demos"] },
    ],
    processNotes: [
      "Because our films are composed in code from real screens, they can be re-rendered when the product changes.",
    ],
    faqs: [
      {
        q: "Do you do 3D or AI-driven work?",
        a: "Not as a published service yet. If your project needs it, tell us in your brief and we'll be straightforward about what we can deliver.",
      },
    ],
    related: ["graphic-design", "branding-identity", "mobile-apps-digital-products"],
    practiceNote:
      "Our published creative-technology work is motion: a 40-second promotional film and a tutorial video for Blackboy's Vault, both composed in code. 3D and AI-driven experiences are not yet part of our published portfolio.",
    seoTitle: "Creative Technology & Motion",
    seoDescription:
      "Code-driven promotional films, tutorial videos and interactive web work by Baiden Creatives, where design and engineering meet.",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
