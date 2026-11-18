/**
 * How our construction and property products connect, from the first drawing to the sale.
 * Shown on the home page, the products page and the site map, and described to search engines.
 */
export const ecosystem = [
  { step: "Plan", slug: "blueprint", product: "Blueprint", body: "Get the house plan from architects in Ghana." },
  { step: "Supply", slug: "sitemart", product: "SiteMart", body: "Buy the materials and rent the equipment." },
  { step: "Build", slug: "baid-x", product: "BAID X", body: "Hire verified workers and run the project." },
  { step: "Sell", slug: "propertiq", product: "PropertIQ", body: "List and sell the finished property." },
] as const;

export const ecosystemPromise = "From the plan to the sale: verified people, safe payments and everything needed to build, in one place.";
