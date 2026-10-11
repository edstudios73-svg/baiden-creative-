/**
 * Project inquiry schema and validation, shared by the form (client) and the API route (server).
 * Kept dependency-free so it can run in the browser, on the server and under `node --test`.
 */

export const inquiryServices = [
  { value: "web", label: "Web design & development" },
  { value: "product", label: "Mobile app or digital product" },
  { value: "brand", label: "Branding & identity" },
  { value: "graphic", label: "Graphic design & campaigns" },
  { value: "uiux", label: "UI/UX & dashboards" },
  { value: "creative-tech", label: "Creative technology & motion" },
  { value: "unsure", label: "Not sure yet" },
] as const;

// TODO(company): confirm budget bands and currency before launch.
export const budgetRanges = [
  { value: "lt-1k", label: "Under US$1,000" },
  { value: "1k-5k", label: "US$1,000 – 5,000" },
  { value: "5k-15k", label: "US$5,000 – 15,000" },
  { value: "15k-plus", label: "US$15,000 and above" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const timelines = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3m", label: "In the next 1–3 months" },
  { value: "3-6m", label: "In 3–6 months" },
  { value: "flexible", label: "Flexible" },
] as const;

export type InquiryField = "name" | "email" | "company" | "services" | "description" | "budget" | "timeline" | "reference";

export type Inquiry = {
  name: string;
  email: string;
  company: string;
  services: string[];
  description: string;
  budget: string;
  timeline: string;
  reference: string;
};

export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const limits = {
  name: 100,
  email: 200,
  company: 150,
  descriptionMin: 20,
  descriptionMax: 5000,
  reference: 500,
} as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/** Normalises untrusted input into an Inquiry shape. Unknown keys are dropped. */
export function normaliseInquiry(raw: unknown): Inquiry {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const services = Array.isArray(r.services) ? r.services.filter((s): s is string => typeof s === "string") : [];
  return {
    name: str(r.name),
    email: str(r.email).toLowerCase(),
    company: str(r.company),
    services: [...new Set(services)],
    description: str(r.description),
    budget: str(r.budget),
    timeline: str(r.timeline),
    reference: str(r.reference),
  };
}

const allowed = (list: readonly { value: string }[], v: string) => list.some((o) => o.value === v);

export function validateInquiry(d: Inquiry): InquiryErrors {
  const e: InquiryErrors = {};

  if (!d.name) e.name = "Please enter your name.";
  else if (d.name.length > limits.name) e.name = `Please keep your name under ${limits.name} characters.`;

  if (!d.email) e.email = "Please enter your email address.";
  else if (d.email.length > limits.email || !EMAIL.test(d.email)) e.email = "Please enter a valid email address, like name@company.com.";

  if (d.company.length > limits.company) e.company = `Please keep this under ${limits.company} characters.`;

  if (d.services.length === 0) e.services = "Please choose at least one service.";
  else if (!d.services.every((s) => allowed(inquiryServices, s))) e.services = "Please choose services from the list.";

  if (!d.description) e.description = "Please tell us about your project.";
  else if (d.description.length < limits.descriptionMin)
    e.description = `A little more detail helps us reply properly (at least ${limits.descriptionMin} characters).`;
  else if (d.description.length > limits.descriptionMax) e.description = `Please keep this under ${limits.descriptionMax} characters.`;

  if (!allowed(budgetRanges, d.budget)) e.budget = "Please choose a budget range.";
  if (!allowed(timelines, d.timeline)) e.timeline = "Please choose a timeline.";

  if (d.reference) {
    if (d.reference.length > limits.reference) e.reference = "This link is too long.";
    else if (!isHttpUrl(d.reference)) e.reference = "Please enter a full link starting with https://.";
  }

  return e;
}

export function isHttpUrl(v: string) {
  try {
    const u = new URL(v);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export function labelFor(list: readonly { value: string; label: string }[], value: string) {
  return list.find((o) => o.value === value)?.label ?? value;
}

/** Minimum time a human plausibly needs to fill in the form. Faster submissions are treated as bots. */
export const MIN_FILL_MS = 3000;
