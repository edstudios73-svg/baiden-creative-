/** A figure shown at its final value, zero-padded (e.g. 05). */
export function CountUp({ to, pad = 2 }: { to: number; pad?: number; duration?: number }) {
  return <span className="tabular-nums">{String(to).padStart(pad, "0")}</span>;
}
