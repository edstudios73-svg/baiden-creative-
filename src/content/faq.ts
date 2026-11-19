import { site } from "@/config/site";
import { ecosystem } from "./ecosystem";

/**
 * Plain answers about the company, shown on /about and given to search engines as an FAQ.
 * Every answer comes from verified site content; nothing here is new information.
 */
export const faq = [
  {
    q: `What is ${site.name}?`,
    a: `${site.name} is a creative and technology company in ${site.base}. We design, build and run five products of our own: Blueprint, SiteMart, BAID X, PropertIQ and Skin Lab.`,
  },
  {
    q: `Who founded ${site.name}?`,
    a: `${site.name} was founded in ${site.base} by ${site.founders[0].name} and ${site.founders[1].name}, its co-founders.`,
  },
  {
    q: `What products does ${site.name} make?`,
    a: "Blueprint, for house plans from architects in Ghana. SiteMart, for building materials and equipment to rent or buy. BAID X, Ghana's work network for hiring verified workers with payments held in escrow. PropertIQ, for homes, apartments, offices and stores in Accra. Skin Lab, a laptop sticker and skin shop in Accra.",
  },
  {
    q: "How do Blueprint, SiteMart, BAID X and PropertIQ work together?",
    a: `They cover a building project from start to finish. ${ecosystem.map((e) => `${e.step}: ${e.product}, ${e.body.charAt(0).toLowerCase()}${e.body.slice(1)}`).join(" ")}`,
  },
  {
    q: `Where is ${site.name} based?`,
    a: `In ${site.base}.`,
  },
  {
    q: `How do I contact ${site.name}?`,
    a: `Email ${site.contact.email}, or call or WhatsApp ${site.contact.phoneDisplay}. We are ${site.handle} on ${site.social.map((s) => s.label).join(", ").replace(/, ([^,]*)$/, " and $1")}.`,
  },
];
