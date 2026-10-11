import { budgetRanges, inquiryServices, labelFor, timelines, type Inquiry } from "./inquiry";

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" };

export function deliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.INQUIRY_TO_EMAIL && process.env.INQUIRY_FROM_EMAIL);
}

/** Sends the inquiry as a plain-text email through Resend. Plain text means user input is never rendered as HTML. */
export async function deliverInquiry(d: Inquiry): Promise<DeliveryResult> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL;
  if (!key || !to || !from) return { ok: false, reason: "not_configured" };

  const text = [
    `New project inquiry from ${d.name}`,
    "",
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Company / project: ${d.company || "—"}`,
    `Services: ${d.services.map((s) => labelFor(inquiryServices, s)).join(", ")}`,
    `Budget: ${labelFor(budgetRanges, d.budget)}`,
    `Timeline: ${labelFor(timelines, d.timeline)}`,
    `Reference: ${d.reference || "—"}`,
    "",
    "Project description:",
    d.description,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()).filter(Boolean),
        reply_to: d.email,
        subject: `Project inquiry: ${d.company || d.name}`.slice(0, 150),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      // Log the status only. Never log the submission itself.
      console.error(`[inquiry] delivery failed with status ${res.status}`);
      return { ok: false, reason: "provider_error" };
    }
    return { ok: true };
  } catch (err) {
    console.error(`[inquiry] delivery error: ${err instanceof Error ? err.name : "unknown"}`);
    return { ok: false, reason: "provider_error" };
  }
}
