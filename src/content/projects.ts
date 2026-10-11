import type { Img, Project, ProjectCategory } from "./types";

/*
 * Portfolio content.
 *
 * Sources: the previous baidencreatives.org portfolio, the live client sites and the
 * project repositories in the edstudios73-svg GitHub account. Nothing here is estimated:
 * no metrics, testimonials or outcomes have been supplied, so `outcomes` is empty on
 * every project and the case study template hides that section. Fill it only with
 * figures the client has approved for publication.
 */

const site = (key: string, alt: string): Img => ({
  src: `/assets/work/sites/${key}.jpg`,
  alt,
  width: 1280,
  height: 800,
  kind: "screen",
});

const flyer = (file: string, alt: string, width = 864, height = 1080): Img => ({
  src: `/assets/work/${file}.jpg`,
  alt,
  width,
  height,
  kind: "print",
});

const phone = (file: string, alt: string): Img => ({
  src: `/assets/work/vault/${file}.jpg`,
  alt,
  width: 585,
  height: 1266,
  kind: "phone",
});

export const projects: Project[] = [
  {
    title: "BAID X",
    slug: "baid-x",
    summary:
      "Ghana's work network: verified professionals, companies, project managers, suppliers and clients in one place, with job payments held in escrow until the work is approved.",
    category: "Platforms & products",
    services: ["web-design-development", "ui-ux-dashboards", "mobile-apps-digital-products", "branding-identity", "graphic-design"],
    coverImage: site("baidx", "BAID X homepage: “Hire verified people. Pay only when the work is done.” over an architectural floor-plan drawing"),
    gallery: [
      flyer("baidx-launch-flyer-1", "BAID X launch flyer explaining how the platform works"),
      flyer("baidx-launch-flyer-2", "BAID X launch flyer for buyers and suppliers"),
      flyer("baidx-launch-flyer-3", "BAID X launch flyer showing the five account roles and the four steps from sign-up to payment"),
      flyer("baidx-app-coming-soon", "BAID X mobile app coming-soon announcement", 540, 960),
    ],
    clientOrOwner: "Baiden Creatives (original product)",
    inHouse: true,
    projectRole: ["Product concept", "Product and interface design", "Web platform engineering", "Launch campaign"],
    challenge:
      "Hiring tradespeople in Ghana usually runs on word of mouth and cash paid up front. Clients have little way to check who they are hiring, and workers have little protection once a job is done.",
    approach: [
      "Build trust into the product itself: badges are only awarded after a person at BAID X checks a profile, a Ghana Card, trade proof or background. A paid plan never buys a badge.",
      "Hold the money, not just the conversation. Jobs are funded into escrow and released when the client approves, or automatically three days after the worker marks the job done.",
      "Design for every side of a build: workers, companies, project managers, suppliers and homeowners each get an account type shaped around their own tasks.",
    ],
    solution: [
      "Five account types covering 50 trades across all 16 regions of Ghana.",
      "A public badge checker so anyone can confirm a person has been verified before paying them.",
      "Wallet top-ups through Paystack and payouts to mobile money, with disputes freezing funds while BAID X reviews them.",
      "A price guide built from the daily rates professionals set, shown only once enough rates exist for a trade.",
      "Private messaging between members and an in-product assistant for common questions.",
    ],
    outcomes: [],
    technologies: ["Supabase", "Paystack", "Flutter (mobile app, in development)"],
    externalUrl: "https://www.baid-x.com",
    publicationStatus: "published",
    featured: true,
    todo: [
      "Add product-interface screenshots (dashboards, badge checker, escrow flow) when approved for publication.",
      "Confirm the full web stack before listing more technologies.",
    ],
  },
  {
    title: "Blackboy's Vault",
    slug: "blackboys-vault",
    summary:
      "A mobile-first menswear store with WhatsApp checkout and a full store admin, plus a cinematic promotional film built from the live product.",
    category: "E-commerce",
    services: ["web-design-development", "ui-ux-dashboards", "creative-technology"],
    coverImage: site("vault", "Blackboy's Vault storefront homepage with category filters and a featured slides promotion"),
    gallery: [
      phone("01-home", "Blackboy's Vault mobile home screen"),
      phone("03-shop", "Shop screen with search, filters and product grid"),
      phone("04-product", "Product page with photos, colours and sizes"),
      phone("07-cart", "Cart screen"),
      phone("08-checkout", "Checkout screen that sends the order on WhatsApp"),
      {
        src: "/assets/work/vault/promo-ad-poster.jpg",
        alt: "Poster frame from the Blackboy's Vault promotional film",
        width: 1080,
        height: 1920,
        kind: "print",
      },
    ],
    clientOrOwner: "Blackboy's Vault, Accra",
    projectRole: ["Storefront design and development", "Store admin", "Promotional film"],
    challenge:
      "Blackboy's Vault sells Gen Z menswear in Accra and takes its orders on WhatsApp. It needed a storefront that feels at home on a phone and an admin the owner can run without a developer.",
    approach: [
      "Keep checkout where the customers already are: the cart composes a complete order and hands it to WhatsApp.",
      "Start from the phone. Search, category chips, a wishlist and order history sit within thumb reach.",
      "Make the store resilient. If the database is unreachable, the shop falls back to its last cached catalogue instead of going blank.",
    ],
    solution: [
      "Storefront with home, shop (search, filters and sorting), product, wishlist, cart and profile with order history.",
      "Store admin with dashboard, products, photo uploads, colours, sizes, stock, promos and discounts, orders, analytics and settings.",
      "Row Level Security so only approved admin accounts can change data, while the browser only ever holds a publishable key.",
      "A 40-second promotional film and an admin tutorial video, composed in code from the live store's screens.",
    ],
    outcomes: [],
    technologies: ["HTML, CSS and JavaScript", "Supabase", "Vercel", "WhatsApp ordering"],
    externalUrl: "https://blackboys-vault-store.vercel.app",
    publicationStatus: "published",
    featured: true,
  },
  {
    title: "Christian Service Church",
    slug: "christian-service-church",
    summary:
      "A church website with sermons, events, giving and prayer requests, managed from its own admin dashboard, with launch and event flyers to match.",
    category: "Websites",
    services: ["web-design-development", "ui-ux-dashboards", "graphic-design"],
    coverImage: site("csc", "Christian Service Church homepage with the pastors and a “Plan your visit” call to action"),
    gallery: [
      flyer("csc-website-now-live", "“Now live” flyer announcing the church website launch"),
      flyer("csc-sunday-service-flyer", "Sunday service invitation flyer"),
      flyer("csc-the-word-online", "The Word Online flyer for sermons and daily devotions"),
      flyer("csc-21-days-fasting-prayer", "21 Days of Fasting and Prayer event flyer", 907, 1080),
    ],
    clientOrOwner: "Christian Service Church, East Legon",
    projectRole: ["Website design and development", "Content admin", "Search setup", "Launch graphics"],
    challenge:
      "The church needed one dependable place for service times, sermons and events, one that its own team could keep current week to week.",
    approach: [
      "Treat accuracy as a feature: service times were checked against the church signboard before launch, and the handover lists every place they appear.",
      "Give the church team its own admin instead of routing every update through a developer.",
    ],
    solution: [
      "Pages for ministries, sermons, events, announcements, testimonies, gallery, giving, prayer and the pastor.",
      "An admin dashboard for updates, sermons, gallery, testimonies, events and prayer requests, with photos resized in the browser before upload.",
      "Structured data, a sitemap and an llms.txt summary so search engines and AI assistants describe the church correctly.",
      "A launch flyer and a set of service and event flyers in the same visual language.",
    ],
    outcomes: [],
    technologies: ["HTML, CSS and JavaScript", "Supabase", "Google Analytics"],
    externalUrl: "https://www.christianservicechurch.org",
    publicationStatus: "published",
    featured: true,
  },
  {
    title: "Eslyn Local Kitchen & Pub",
    slug: "eslyn-local-kitchen",
    summary: "Identity, menu design, social content and a website for a neighbourhood kitchen and pub in Adjiringanor.",
    category: "Brand & graphics",
    services: ["branding-identity", "graphic-design", "web-design-development"],
    coverImage: site("eslyn", "Eslyn Local Kitchen & Pub website: a frosted panel with the logo over a plate of jollof"),
    gallery: [
      flyer("eslyn-logo", "Eslyn Local Kitchen and Pub logo", 1080, 663),
      flyer("eslyn-kitchen-menu-flyer", "Eslyn Kitchen menu flyer", 736, 812),
      flyer("eslyn-satisfy-your-cravings-menu", "“Satisfy your cravings” menu flyer", 736, 946),
      flyer("eslyn-banku-tilapia-promo", "Banku and tilapia social media post", 736, 737),
      flyer("eslyn-special-meal-friday", "Special meal Friday social media post", 736, 736),
    ],
    clientOrOwner: "Eslyn Local Kitchen & Pub, Adjiringanor",
    projectRole: ["Logo", "Menu design", "Social media graphics", "Website"],
    challenge:
      "A neighbourhood kitchen and pub serving Ghanaian food (jollof, banku, soups, grills and cold drinks) needed a look it could carry from the menu to Instagram to the web.",
    approach: [
      "One identity, many surfaces: the same logo, type and food-first photography carry through menus, weekly promotions and the website.",
      "Make ordering obvious. The website leads with the menu and a WhatsApp order button.",
    ],
    solution: [
      "Logo and visual identity.",
      "Printed and digital menu flyers.",
      "Recurring social posts for weekly specials.",
      "A website with the menu and WhatsApp ordering.",
    ],
    outcomes: [],
    technologies: [],
    externalUrl: "https://eslyn.vercel.app",
    publicationStatus: "published",
    featured: false,
    todo: ["Confirm the website stack before listing technologies."],
  },
  {
    title: "TheNobles Gift & Surprise Hub",
    slug: "thenobles-gift-hub",
    summary:
      "An online gift shop for hampers, bouquets and surprises in Accra, with WhatsApp ordering, order tracking and an admin for products and prices.",
    category: "E-commerce",
    services: ["web-design-development", "ui-ux-dashboards"],
    coverImage: site("nobles", "TheNobles gift shop homepage: “Say it with a gift.” beside a photo of a rose bouquet"),
    gallery: [],
    clientOrOwner: "TheNobles Gift & Surprise Hub, Accra",
    projectRole: ["Storefront design and development", "Store admin"],
    challenge:
      "TheNobles makes gift boxes, balloon hampers, rose bouquets and personalised pieces to order and sells them on WhatsApp. The shop needed a catalogue customers could browse before they message.",
    approach: [
      "Let the catalogue do the browsing and keep WhatsApp for the conversation: the cart turns a selection into a ready-to-send message.",
      "Show prices honestly. Items without a fixed price say “Price on request” or point to the price list, rather than showing a guess.",
    ],
    solution: [
      "Home, shop, categories, price list, how-it-works and contact pages, with a shared cart and checkout.",
      "Order tracking for customers.",
      "An admin for products, photos, orders, reviews and messages, restricted to approved admin accounts.",
    ],
    outcomes: [],
    technologies: ["HTML, CSS and JavaScript", "Supabase", "Vercel"],
    externalUrl: "https://nobles-gift-hub-accra.vercel.app",
    publicationStatus: "published",
    featured: false,
  },
  {
    title: "Bold Restaurant Ghana",
    slug: "bold-restaurant",
    summary: "A website for a rooftop restaurant in Accra, built around the atmosphere, the favourites and the reservation.",
    category: "Websites",
    services: ["web-design-development"],
    coverImage: site("bold", "Bold Restaurant homepage: “Eat bold. Feel at home.” over a night-time photo of the rooftop"),
    gallery: [],
    clientOrOwner: "Bold Restaurant Ghana, Accra",
    projectRole: ["Website design and development"],
    challenge: "A rooftop restaurant sells an evening as much as a menu. The site had to carry that atmosphere and still answer the practical questions fast.",
    approach: [
      "Lead with the room: a full-screen photo slideshow sets the mood before anything else.",
      "Then get practical: favourites, the full menu, a gallery, FAQs and directions, each one tap away.",
    ],
    solution: [
      "Home page with hero slideshow, favourites, gallery, FAQ and a find-us section.",
      "A standalone menu page.",
      "Link previews, a sitemap and an llms.txt summary for search and AI discovery.",
    ],
    outcomes: [],
    technologies: ["HTML and CSS", "Vercel"],
    externalUrl: "https://bold-restaurant-ghana.vercel.app",
    publicationStatus: "published",
    featured: false,
  },

  // Listed: live work without a written case study yet.
  {
    title: "BOOMiiS Restaurant",
    slug: "boomiis",
    summary: "Restaurant website for Nigerian favourites in East Legon, with reservations and a scannable menu.",
    category: "Websites",
    services: ["web-design-development"],
    coverImage: site("boomiis", "BOOMiiS restaurant homepage: “West Africa, in the heart of Accra.” with a QR code to scan for the menu"),
    gallery: [],
    clientOrOwner: "BOOMiiS Restaurant, East Legon",
    projectRole: ["Website design and development"],
    outcomes: [],
    technologies: [],
    externalUrl: "https://boomiisgh.com",
    publicationStatus: "listed",
    featured: false,
    todo: ["Write the case study: brief, approach, what was built and stack."],
  },
  {
    title: "Resilience Estate",
    slug: "resilience-estate",
    summary: "Website for a real estate and home services company in Ghana.",
    category: "Websites",
    services: ["web-design-development"],
    coverImage: site("resilience", "Resilience real estate homepage with a modern house at dusk"),
    gallery: [],
    clientOrOwner: "Resilience Estate, Accra",
    projectRole: ["Website design and development"],
    outcomes: [],
    technologies: [],
    externalUrl: "https://www.resilienceghana.com",
    publicationStatus: "listed",
    featured: false,
    todo: ["Write the case study: brief, approach, what was built and stack."],
  },
  {
    title: "EatConnect Ghana",
    slug: "eatconnect",
    summary: "A food discovery platform for finding restaurants, cafés and food spots.",
    category: "Platforms & products",
    services: ["web-design-development", "ui-ux-dashboards"],
    coverImage: site("eat", "EatConnect discovery page listing food spots with search and filters"),
    gallery: [],
    clientOrOwner: "EatConnect Ghana",
    projectRole: ["Product design and development"],
    outcomes: [],
    technologies: [],
    externalUrl: "https://eatconnect.vercel.app/#/discover",
    publicationStatus: "listed",
    featured: false,
    todo: ["Confirm whether EatConnect is a client project or a concept, and whether its listings are live data, before writing a case study."],
  },
  {
    title: "Ompad Media",
    slug: "ompad-media",
    summary: "Website for a student media studio.",
    category: "Websites",
    services: ["web-design-development"],
    coverImage: site("ompad", "Ompad Media landing page with a crest and an “Enter studio” button"),
    gallery: [],
    clientOrOwner: "Ompad Media",
    projectRole: ["Website design and development"],
    outcomes: [],
    technologies: [],
    externalUrl: "https://ompadmedia.netlify.app",
    publicationStatus: "listed",
    featured: false,
    todo: ["Confirm the client description and write the case study."],
  },
];

export const projectCategories: ProjectCategory[] = ["Platforms & products", "E-commerce", "Websites", "Brand & graphics"];

/** Everything the public site may show. Drafts are excluded here and nowhere else. */
export const publicProjects = projects.filter((p) => p.publicationStatus !== "draft");
export const caseStudies = projects.filter((p) => p.publicationStatus === "published");
export const featuredProjects = caseStudies.filter((p) => p.featured);

export function getCaseStudy(slug: string) {
  return caseStudies.find((p) => p.slug === slug);
}

export function projectHref(p: Project) {
  return p.publicationStatus === "published" ? `/work/${p.slug}` : p.externalUrl;
}
