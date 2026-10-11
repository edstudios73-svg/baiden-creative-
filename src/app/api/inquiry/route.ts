import { NextResponse, type NextRequest } from "next/server";
import { MIN_FILL_MS, normaliseInquiry, validateInquiry } from "@/lib/inquiry";
import { createRateLimiter } from "@/lib/rate-limit";
import { deliverInquiry } from "@/lib/deliver-inquiry";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 20_000;
const rateLimit = createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 });

function clientKey(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: NextRequest) {
  if (!req.headers.get("content-type")?.includes("application/json")) {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 415 });
  }

  const limited = rateLimit(clientKey(req));
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, code: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(limited.retryAfterSec) } },
    );
  }

  const raw = await req.text();
  if (raw.length > MAX_BODY_BYTES) {
    return NextResponse.json({ ok: false, code: "too_large" }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false, code: "bad_request" }, { status: 400 });
  }

  // Spam checks: a hidden honeypot field and a minimum time on the form.
  // Bots get a normal-looking response so they have nothing to adapt to; nothing is sent.
  const startedAt = Number(body.startedAt);
  const tooFast = !Number.isFinite(startedAt) || Date.now() - startedAt < MIN_FILL_MS;
  if ((typeof body.website === "string" && body.website.length > 0) || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const inquiry = normaliseInquiry(body);
  const errors = validateInquiry(inquiry);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, code: "invalid", errors }, { status: 422 });
  }

  const result = await deliverInquiry(inquiry);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, code: result.reason },
      { status: result.reason === "not_configured" ? 503 : 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
