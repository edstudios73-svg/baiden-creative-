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

const steps: { title: string; fields: InquiryField[] }[] = [
  { title: "About you", fields: ["name", "email", "company"] },
  { title: "Your project", fields: ["services", "description", "reference"] },
  { title: "Budget & timing", fields: ["budget", "timeline"] },
  { title: "Review & send", fields: [] },
];

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
  const [step, setStep] = useState(0);
  const [attempted, setAttempted] = useState<Set<number>>(new Set());
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  useEffect(() => {
    if (status.kind === "success" || status.kind === "error") resultRef.current?.focus();
  }, [status.kind]);

  const stepErrors = (all: InquiryErrors, s: number) =>
    Object.fromEntries(Object.entries(all).filter(([f]) => steps[s].fields.includes(f as InquiryField))) as InquiryErrors;

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (attempted.has(step)) setErrors(stepErrors(validateInquiry(normaliseInquiry(next)), step));
  };

  const toggleService = (v: string) =>
    set("services", values.services.includes(v) ? values.services.filter((s) => s !== v) : [...values.services, v]);

  /** Validates the current step; returns true when it can advance. */
  function checkStep(s: number) {
    setAttempted((a) => new Set(a).add(s));
    const found = stepErrors(validateInquiry(normaliseInquiry(values)), s);
    setErrors(found);
    const first = steps[s].fields.find((f) => found[f]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name=${first}]`)?.focus();
      return false;
    }
    return true;
  }

  function next() {
    if (checkStep(step)) setStep((s) => Math.min(steps.length - 1, s + 1));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step < steps.length - 1) return next();
    if (status.kind === "submitting") return;

    const data = normaliseInquiry(values);
    const all = validateInquiry(data);
    const badStep = steps.findIndex((s) => s.fields.some((f) => all[f]));
    if (badStep >= 0) {
      setStep(badStep);
      setAttempted((a) => new Set(a).add(badStep));
      setErrors(stepErrors(all, badStep));
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
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; errors?: InquiryErrors };
      if (res.ok && json.ok) return setStatus({ kind: "success" });
      if (res.status === 422 && json.errors) {
        const s = Math.max(0, steps.findIndex((st) => st.fields.some((f) => json.errors?.[f])));
        setStep(s);
        setErrors(stepErrors(json.errors, s));
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
      <div ref={resultRef} tabIndex={-1} role="status" className="border border-ink p-8 outline-none md:p-12">
        <svg className="draw-now size-16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="1.5" pathLength={1} />
          <path d="M19 33 L28 42 L46 23" stroke="currentColor" strokeWidth="2" strokeLinecap="square" pathLength={1} style={{ animationDelay: "500ms" }} />
        </svg>
        <p className="text-label mt-8 text-graphite">Inquiry sent</p>
        <h2 className="text-display-3 mt-3">Thank you, {values.name.split(" ")[0] || "we've got it"}.</h2>
        <p className="mt-5 max-w-lg text-graphite">
          Your project details reached us. We&apos;ll reply to <strong className="text-ink">{values.email}</strong>. If it&apos;s urgent,
          you can also reach us on{" "}
          <a className="link-draw text-ink" href={site.contact.whatsapp} target="_blank" rel="noopener noreferrer">
            WhatsApp<span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      </div>
    );
  }

  const field =
    "mt-2 block w-full border border-ink/25 bg-ivory px-4 py-3.5 text-base transition-colors placeholder:text-graphite/70 hover:border-ink/60 focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 aria-[invalid=true]:border-ink aria-[invalid=true]:shadow-[inset_0_0_0_1px_#000]";
  const labelCls = "block font-medium";
  const err = (f: InquiryField) =>
    errors[f] ? (
      <p id={`${f}-error`} className="mt-2 flex items-start gap-2 text-sm font-medium">
        <span aria-hidden="true" className="mt-0.5 grid size-4 shrink-0 place-items-center bg-ink text-[0.65rem] text-ivory">
          !
        </span>
        {errors[f]}
      </p>
    ) : null;
  const a11y = (f: InquiryField, hint?: string) => ({
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": [errors[f] ? `${f}-error` : null, hint].filter(Boolean).join(" ") || undefined,
  });
  const summary = summaryText(normaliseInquiry(values));
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Project inquiry: ${values.company || values.name}`)}&body=${encodeURIComponent(summary)}`;
  const whatsapp = `${site.contact.whatsapp}?text=${encodeURIComponent(summary)}`;
  const last = step === steps.length - 1;
  const choice = (checked: boolean) =>
    `flex min-h-12 cursor-pointer items-center gap-3 border px-4 py-2.5 transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink ${
      checked ? "border-ink bg-ink text-ivory" : "border-ink/25 hover:border-ink"
    }`;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-8">
      {/* Step indicator */}
      <ol className="grid grid-cols-4 gap-2" aria-label="Form progress">
        {steps.map((s, i) => (
          <li key={s.title} aria-current={i === step ? "step" : undefined}>
            <button
              type="button"
              disabled={i > step}
              onClick={() => setStep(i)}
              className="w-full text-left disabled:cursor-default"
              aria-label={`Step ${i + 1}: ${s.title}${i < step ? ", completed. Go back to this step" : ""}`}
            >
              <span className={`block h-0.5 transition-colors duration-500 ${i <= step ? "bg-ink" : "bg-cloud"}`} />
              <span className={`text-label mt-3 flex items-center gap-2 ${i <= step ? "text-ink" : "text-graphite"}`}>
                <span className={`grid size-5 shrink-0 place-items-center border text-[0.65rem] ${i < step ? "border-ink bg-ink text-ivory" : i === step ? "border-ink" : "border-cloud"}`}>
                  {i < step ? "✓" : i + 1}
                </span>
                <span className="hidden sm:inline">{s.title}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>

      <div key={step} className="step-in grid gap-7">
        <h2 ref={headingRef} tabIndex={-1} className="text-display-3 outline-none">
          <span className="text-label mb-3 block text-graphite">
            Step {step + 1} of {steps.length}
          </span>
          {steps[step].title}
        </h2>

        {step === 0 && (
          <>
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
                Company or project name <span className="font-normal text-graphite">(optional)</span>
              </label>
              <input id="company" name="company" autoComplete="organization" maxLength={limits.company} value={values.company} onChange={(e) => set("company", e.target.value)} className={field} {...a11y("company")} />
              {err("company")}
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <fieldset aria-describedby={errors.services ? "services-error" : undefined}>
              <legend className={labelCls}>
                Services required <span aria-hidden="true">*</span> <span className="font-normal text-graphite">(choose any)</span>
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {inquiryServices.map((s) => {
                  const checked = values.services.includes(s.value);
                  return (
                    <label key={s.value} className={choice(checked)}>
                      <input type="checkbox" name="services" value={s.value} checked={checked} onChange={() => toggleService(s.value)} className="sr-only" />
                      <span aria-hidden="true" className={`grid size-4 shrink-0 place-items-center border text-[0.6rem] ${checked ? "border-ivory" : "border-ink/50"}`}>
                        {checked ? "✓" : ""}
                      </span>
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
              <textarea id="description" name="description" rows={6} required maxLength={limits.descriptionMax} value={values.description} onChange={(e) => set("description", e.target.value)} className={`${field} resize-y`} {...a11y("description", "description-hint")} />
              {err("description")}
            </div>
            <div>
              <label htmlFor="reference" className={labelCls}>
                Website or reference link <span className="font-normal text-graphite">(optional)</span>
              </label>
              <input id="reference" name="reference" type="url" inputMode="url" placeholder="https://" maxLength={limits.reference} value={values.reference} onChange={(e) => set("reference", e.target.value)} className={field} {...a11y("reference")} />
              {err("reference")}
            </div>
          </>
        )}

        {step === 2 && (
          <div className="grid gap-7">
            {(
              [
                ["budget", "Approximate budget", budgetRanges],
                ["timeline", "Preferred timeline", timelines],
              ] as const
            ).map(([name, label, options]) => (
              <fieldset key={name} aria-describedby={errors[name] ? `${name}-error` : undefined}>
                <legend className={labelCls}>
                  {label} <span aria-hidden="true">*</span>
                </legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {options.map((o) => {
                    const checked = values[name] === o.value;
                    return (
                      <label key={o.value} className={choice(checked)}>
                        <input type="radio" name={name} value={o.value} checked={checked} onChange={() => set(name, o.value)} className="sr-only" />
                        <span aria-hidden="true" className={`size-3 shrink-0 rounded-full border ${checked ? "border-ivory bg-ivory" : "border-ink/50"}`} />
                        <span>{o.label}</span>
                      </label>
                    );
                  })}
                </div>
                {err(name)}
              </fieldset>
            ))}
          </div>
        )}

        {step === 3 && (
          <dl className="border-t border-ink">
            {[
              ["Name", values.name],
              ["Email", values.email],
              ["Company", values.company || "—"],
              ["Services", values.services.map((s) => labelFor(inquiryServices, s)).join(", ")],
              ["Project", values.description],
              ["Budget", labelFor(budgetRanges, values.budget)],
              ["Timeline", labelFor(timelines, values.timeline)],
              ["Reference", values.reference || "—"],
            ].map(([k, val]) => (
              <div key={k} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="text-label pt-0.5 text-graphite">{k}</dt>
                <dd className="whitespace-pre-line break-words">{val}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Honeypot: invisible to people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      {status.kind === "error" && (
        <div ref={resultRef} tabIndex={-1} role="alert" className="border-2 border-ink p-5 outline-none">
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

      <div className="flex flex-col-reverse gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="group inline-flex min-h-12 items-center gap-3 font-medium">
            <ArrowRight className="size-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            <span className="link-draw">Back</span>
          </button>
        ) : (
          <p className="max-w-sm text-sm text-graphite">
            We only use these details to reply about your project. See our{" "}
            <Link href="/privacy" className="link-draw text-ink">
              privacy notice
            </Link>
            .
          </p>
        )}
        <button
          type="submit"
          disabled={status.kind === "submitting"}
          className="group inline-flex min-h-12 items-center justify-between gap-8 border border-ink bg-ink px-6 font-medium text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink disabled:cursor-progress disabled:opacity-70"
        >
          {!last ? "Continue" : status.kind === "submitting" ? "Sending…" : status.kind === "error" ? "Try again" : "Send inquiry"}
          {status.kind === "submitting" ? (
            <span aria-hidden="true" className="size-4 animate-spin rounded-full border-2 border-current/30 border-t-current" />
          ) : (
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          )}
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {status.kind === "submitting" ? "Sending your inquiry" : ""}
      </p>
    </form>
  );
}
