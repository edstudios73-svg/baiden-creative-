import { test } from "node:test";
import assert from "node:assert/strict";
import { normaliseInquiry, validateInquiry } from "../src/lib/inquiry.ts";
import { createRateLimiter } from "../src/lib/rate-limit.ts";

const valid = {
  name: "Ama Mensah",
  email: "Ama@Example.com ",
  company: "Mensah Studio",
  services: ["web", "brand", "web"],
  description: "We need a new website and a refreshed identity for our launch.",
  budget: "5k-15k",
  timeline: "1-3m",
  reference: "https://example.com",
};

test("a complete inquiry passes and is normalised", () => {
  const d = normaliseInquiry(valid);
  assert.equal(d.email, "ama@example.com");
  assert.deepEqual(d.services, ["web", "brand"]);
  assert.deepEqual(validateInquiry(d), {});
});

test("missing required fields are reported", () => {
  const e = validateInquiry(normaliseInquiry({}));
  assert.deepEqual(Object.keys(e).sort(), ["budget", "description", "email", "name", "services", "timeline"]);
});

test("invalid email, unknown service, short description and bad link are rejected", () => {
  const e = validateInquiry(
    normaliseInquiry({ ...valid, email: "not-an-email", services: ["hacking"], description: "short", reference: "javascript:alert(1)" }),
  );
  assert.ok(e.email && e.services && e.description && e.reference);
});

test("non-string and unexpected input is ignored safely", () => {
  const d = normaliseInquiry({ ...valid, name: { $ne: 1 }, services: "web", extra: "x" });
  assert.equal(d.name, "");
  assert.deepEqual(d.services, []);
  assert.equal("extra" in d, false);
  assert.deepEqual(normaliseInquiry(null).services, []);
});

test("optional fields may be empty", () => {
  assert.deepEqual(validateInquiry(normaliseInquiry({ ...valid, company: "", reference: "" })), {});
});

test("rate limiter blocks after the limit and resets after the window", () => {
  const check = createRateLimiter({ limit: 2, windowMs: 1000 });
  assert.equal(check("ip", 0).ok, true);
  assert.equal(check("ip", 10).ok, true);
  const blocked = check("ip", 20);
  assert.equal(blocked.ok, false);
  assert.equal(blocked.retryAfterSec, 1);
  assert.equal(check("other", 20).ok, true);
  assert.equal(check("ip", 1001).ok, true);
});
