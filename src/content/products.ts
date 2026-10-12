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
  caseStudy: "/work#baid-x",
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
