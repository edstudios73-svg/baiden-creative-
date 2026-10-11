"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import {
  budgetRanges,
  inquiryServices,
  labelFor,
  limits,
  normaliseInquiry,
  timelines,
  validateInquiry,
  type Inquiry,
  type InquiryErrors,
  type InquiryField,
} from "@/lib/inquiry";
import { ArrowRight } from "./icons";

type Status =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; code: "not_configured" | "rate_limited" | "network" | "server" };

const empty: Inquiry = { name: "", email: "", company: "", services: [], description: "", budget: "", timeline: "", reference: "" };
const order: InquiryField[] = ["name", "email", "company", "services", "description", "budget", "timeline", "reference"];

/** Plain-text version of the inquiry, used to prefill email and WhatsApp when the form can't send. */
function summaryText(d: Inquiry) {
  const details = [
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    d.company && `Company / project: ${d.company}`,
    d.services.length > 0 && `Services: ${d.services.map((s) => labelFor(inquiryServices, s)).join(", ")}`,
    d.budget && `Budget: ${labelFor(budgetRanges, d.budget)}`,
    d.timeline && `Timeline: ${labelFor(timelines, d.timeline)}`,
    d.reference && `Reference: ${d.reference}`,
  ].filter(Boolean);
  return [`Hello ${site.name},`, d.description, details.join("\n")].join("\n\n");
}

export function ContactForm() {
  const [values, setValues] = useState<Inquiry>(empty);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") resultRef.current?.focus();
  }, [status.kind]);

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    // After the first submit attempt, keep errors in sync as the user corrects them.
    if (attempted) setErrors(validateInquiry(normaliseInquiry(next)));
  };

  const toggleService = (v: string) =>
    set("services", values.services.includes(v) ? values.services.filter((s) => s !== v) : [...values.services, v]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "submitting") return;
    setAttempted(true);
    const data = normaliseInquiry(values);
    const found = validateInquiry(data);
    setErrors(found);
    const first = order.find((f) => found[f]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(first === "services" ? "[name=services]" : `[name=${first}]`);
      el?.focus();
      return;
    }

    setStatus({ kind: "submitting" });
    const honeypot = (formRef.current?.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot, startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; code?: string; errors?: InquiryErrors };
      if (res.ok && json.ok) return setStatus({ kind: "success" });
      if (res.status === 422 && json.errors) {
        setErrors(json.errors);
        return setStatus({ kind: "idle" });
      }
      if (res.status === 503) return setStatus({ kind: "error", code: "not_configured" });
      if (res.status === 429) return setStatus({ kind: "error", code: "rate_limited" });
      return setStatus({ kind: "error", code: "server" });
    } catch {
      setStatus({ kind: "error", code: "network" });
    }
  }

  if (status.kind === "success") {
    return (
      <div ref={resultRef} tabIndex={-1} role="status" className="border-t-2 border-ink bg-paper p-8 outline-none md:p-12">
        <p className="text-label text-graphite">Inquiry sent</p>
        <h2 className="text-display-3 mt-4">Thank you, {values.name.split(" ")[0] || "we've got it"}.</h2>
        <p className="mt-5 max-w-lg text-graphite">
          Your project details reached us. We&apos;ll reply to <strong className="text-ink">{values.email}</strong>. If it&apos;s
          urgent, you can also reach us on{" "}
          <a className="link-draw text-ink" href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    );
  }

  const field = "mt-2 block w-full border border-ink/25 bg-paper px-4 py-3 text-base transition-colors placeholder:text-graphite/70 hover:border-ink/50 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-error";
  const labelCls = "block font-medium";
  const err = (f: InquiryField) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 flex gap-2 text-sm text-error">
        <span aria-hidden="true">!</span>
        {errors[f]}
      </p>
    ) : null;
  const a11y = (f: InquiryField, hint?: string) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": [errors[f] ? `${f}-error` : null, hint].filter(Boolean).join(" ") || undefined,
  });
  const errorCount = Object.keys(errors).length;
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Project inquiry: ${values.company || values.name}`)}&body=${encodeURIComponent(summaryText(normaliseInquiry(values)))}`;
  const whatsapp = `${site.contact.whatsapp}?text=${encodeURIComponent(summaryText(normaliseInquiry(values)))}`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby="form-note" className="grid gap-7">
      <p id="form-note" className="text-sm text-graphite">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      {attempted && errorCount > 0 && (
        <div role="alert" className="border-l-2 border-error bg-paper p-4 text-sm">
          Please check {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
        </div>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>
            Full name <span aria-hidden="true">*</span>
          </label>
          <input id="name" name="name" autoComplete="name" required maxLength={limits.name} value={values.name} onChange={(e) => set("name", e.target.value)} className={field} {...a11y("name")} />
          {err("name")}
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Work email <span aria-hidden="true">*</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" required maxLength={limits.email} value={values.email} onChange={(e) => set("email", e.target.value)} className={field} {...a11y("email")} />
          {err("email")}
        </div>
      </div>

      <div>
        <label htmlFor="company" className={labelCls}>
          Company or project name
        </label>
        <input id="company" name="company" autoComplete="organization" maxLength={limits.company} value={values.company} onChange={(e) => set("company", e.target.value)} className={field} {...a11y("company")} />
        {err("company")}
      </div>

      <fieldset aria-describedby={errors.services ? "services-error" : undefined}>
        <legend className={labelCls}>
          Services required <span aria-hidden="true">*</span> <span className="font-normal text-graphite">(choose any)</span>
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {inquiryServices.map((s) => {
            const checked = values.services.includes(s.value);
            return (
              <label
                key={s.value}
                className={`flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-2.5 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
                  checked ? "border-ink bg-ink text-ivory" : "border-ink/25 bg-paper hover:border-ink/50"
                }`}
              >
                <input type="checkbox" name="services" value={s.value} checked={checked} onChange={() => toggleService(s.value)} className="size-4 accent-lime" />
                <span>{s.label}</span>
              </label>
            );
          })}
        </div>
        {err("services")}
      </fieldset>

      <div>
        <label htmlFor="description" className={labelCls}>
          About your project <span aria-hidden="true">*</span>
        </label>
        <p id="description-hint" className="mt-1 text-sm text-graphite">
          What are you building, who is it for, and what does success look like?
        </p>
        <textarea id="description" name="description" rows={7} required maxLength={limits.descriptionMax} value={values.description} onChange={(e) => set("description", e.target.value)} className={`${field} resize-y`} {...a11y("description", "description-hint")} />
        {err("description")}
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="budget" className={labelCls}>
            Approximate budget <span aria-hidden="true">*</span>
          </label>
          <select id="budget" name="budget" required value={values.budget} onChange={(e) => set("budget", e.target.value)} className={`${field} appearance-auto`} {...a11y("budget")}>
            <option value="" disabled>
              Choose a range
            </option>
            {budgetRanges.map((b) => (
              <option key={b.value} value={b.value}>
                {b.label}
              </option>
            ))}
          </select>
          {err("budget")}
        </div>
        <div>
          <label htmlFor="timeline" className={labelCls}>
            Preferred timeline <span aria-hidden="true">*</span>
          </label>
          <select id="timeline" name="timeline" required value={values.timeline} onChange={(e) => set("timeline", e.target.value)} className={`${field} appearance-auto`} {...a11y("timeline")}>
            <option value="" disabled>
              Choose a timeline
            </option>
            {timelines.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
          {err("timeline")}
        </div>
      </div>

      <div>
        <label htmlFor="reference" className={labelCls}>
          Website or reference link <span className="font-normal text-graphite">(optional)</span>
        </label>
        <input id="reference" name="reference" type="url" inputMode="url" placeholder="https://" maxLength={limits.reference} value={values.reference} onChange={(e) => set("reference", e.target.value)} className={field} {...a11y("reference")} />
        {err("reference")}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status.kind === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-l-2 border-error bg-paper p-5 outline-none">
          <p className="font-medium">
            {status.code === "not_configured"
              ? "Our online form isn't accepting messages right now."
              : status.code === "rate_limited"
                ? "You've sent several messages in a short time."
                : "Your message couldn't be sent."}
          </p>
          <p className="mt-2 text-sm text-graphite">
            {status.code === "rate_limited"
              ? "Please wait a few minutes and try again, or send it directly below. Your details are still here."
              : "Nothing was lost: your details are still in the form. You can try again, or send the same message directly:"}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
            <a className="link-draw" href={mailto}>
              Send by email
            </a>
            <a className="link-draw" href={whatsapp} target="_blank" rel="noopener noreferrer">
              Send on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-sm text-graphite">
          We only use these details to reply about your project. See our{" "}
          <Link href="/privacy" className="link-draw text-ink">
            privacy notice
          </Link>
          .
        </p>
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          aria-disabled={status.kind === "submitting"}
          className="group inline-flex min-h-12 items-center justify-between gap-8 bg-ink px-6 font-medium text-ivory transition-colors hover:bg-ink-2 disabled:cursor-progress disabled:opacity-70"
        >
          {status.kind === "submitting" ? "Sending…" : status.kind === "error" ? "Try again" : "Send inquiry"}
          {status.kind === "submitting" ? (
            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-ivory/30 border-t-ivory" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your inquiry" : ""}
      </p>
    </form>
  );
}
