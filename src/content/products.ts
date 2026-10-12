/*
 * Original products by Baiden Creatives.
 * BAID X facts are taken from the live product at https://www.baid-x.com (checked 11 Oct 2026).
 * Keep "live" and "inDevelopment" strictly separate. Never move an item to "live" before it ships.
 */

export const baidx = {
  name: "BAID X",
  slug: "baid-x",
  tagline: "Ghana's work network.",
  category: "Workforce & construction technology",
  url: "https://www.baid-x.com",
  caseStudy: "/baid-x",
  overview:
    "BAID X connects workers, companies, project managers, suppliers and clients across Ghana. People are verified by a person at BAID X, and the money for a job stays in escrow until the client approves the work.",
  problem:
    "Finding reliable tradespeople usually depends on word of mouth, and paying them often means handing over cash before the work is done. Clients can't easily check who they are hiring, and workers have little protection once a job is finished. BAID X makes trust something you can check rather than something you have to assume.",
  users: [
    { title: "Workers", body: "Get verified, find jobs near them, join projects and get paid to mobile money." },
    { title: "Companies", body: "Create projects, hire crews and approve every payment." },
    { title: "Project managers", body: "Run site delivery: crews, tasks, reports and requests." },
    { title: "Suppliers", body: "List materials and equipment to sell or rent, and answer inquiries." },
    { title: "Clients", body: "Hire a trusted professional for work on their home and pay through escrow." },
  ],
  live: [
    { title: "Human-checked badges", body: "Profile review, Ghana Card check, trade proof and background checks, each done by a person. A paid plan never buys a badge." },
    { title: "Escrow payments", body: "Jobs are funded from a wallet topped up through Paystack, held while the work happens and released on approval, or automatically three days after the worker marks it done." },
    { title: "Badge checker", body: "Anyone can search a name to see whether BAID X has verified that person before paying them." },
    { title: "Price guide", body: "Daily rates set by professionals, shown per trade once enough rates exist that no single rate sets the guide." },
    { title: "Private messaging", body: "Members message verified professionals, companies and suppliers privately." },
    { title: "Nationwide coverage", body: "50 trades across all 16 regions of Ghana, with amounts in cedis and payouts to mobile money." },
  ],
  inDevelopment: [
    { title: "BAID X mobile app", body: "A Flutter app for Android and iOS, announced as coming soon. It is not yet available in app stores." },
  ],
  // BAID X's own imagery of the people it serves (from the BAID X repository, public/entry). Captions use the
  // product's account types only where the picture plainly fits; these are illustrations, not named users.
  people: [
    { src: "/assets/baidx/baidx-worker-tool-belt.png", width: 492, height: 1050, role: "Workers", alt: "BAID X: tradesman wearing a tool belt and work suspenders" },
    { src: "/assets/baidx/baidx-worker-hard-hat.png", width: 489, height: 965, role: "Workers", alt: "BAID X: smiling tradesman in a yellow hard hat with a drill and tool apron" },
    { src: "/assets/baidx/baidx-worker-timber.png", width: 500, height: 840, role: "Workers", alt: "BAID X: worker in overalls carrying timber and a tool bag" },
    { src: "/assets/baidx/baidx-site-engineer.png", width: 703, height: 979, role: "Project managers", alt: "BAID X: site engineer in an orange hard hat and safety glasses holding building plans" },
    { src: "/assets/baidx/baidx-project-manager.png", width: 591, height: 839, role: "Project managers", alt: "BAID X: project manager in a hi-vis vest with a phone and rolled drawings" },
    { src: "/assets/baidx/baidx-company-lead.png", width: 736, height: 832, role: "Companies", alt: "BAID X: business owner in a suit and tie" },
  ],
  logoMark: { src: "/assets/baidx/baidx-logo-mark.png", width: 1000, height: 476, alt: "BAID X logo mark: Powering Africa's workforce" },
  images: {
    hero: {
      src: "/assets/work/sites/baidx.jpg",
      alt: "BAID X homepage: “Hire verified people. Pay only when the work is done.” with account-type, trade and region counts",
      width: 1280,
      height: 800,
    },
    roles: {
      src: "/assets/work/baidx-launch-flyer-3.jpg",
      alt: "BAID X launch artwork showing a project manager, a company representative and a professional, with the four steps from sign-up to payment",
      width: 864,
      height: 1080,
    },
    app: {
      src: "/assets/work/baidx-app-coming-soon.jpg",
      alt: "BAID X mobile app coming-soon announcement",
      width: 540,
      height: 960,
    },
  },
} as const;

export const products = [baidx] as const;
