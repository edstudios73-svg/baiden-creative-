import type { ReactNode } from "react";

/** The frame for the desktop hero composition: a fixed tilt (see .stage3d in globals.css), with no scroll effects. */
export function HeroStage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
