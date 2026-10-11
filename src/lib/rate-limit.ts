/**
 * Fixed-window, in-memory rate limiter.
 *
 * On serverless hosting each warm instance keeps its own counters, so this limits bursts
 * from one client rather than enforcing a global quota. For a hard global limit, move the
 * counters to a shared store (for example Upstash Redis) behind the same interface.
 */
export function createRateLimiter({ limit, windowMs }: { limit: number; windowMs: number }) {
  const hits = new Map<string, { count: number; resetAt: number }>();

  return function check(key: string, now = Date.now()) {
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.resetAt <= now) hits.delete(k);
    }
    const entry = hits.get(key);
    if (!entry || entry.resetAt <= now) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, retryAfterSec: 0 };
    }
    entry.count += 1;
    if (entry.count > limit) {
      return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
    }
    return { ok: true, retryAfterSec: 0 };
  };
}
