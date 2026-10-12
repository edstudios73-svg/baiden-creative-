import localFont from "next/font/local";

// Self-hosted (SIL Open Font License, see src/fonts/OFL-*.txt): no third-party font requests at runtime or build time.
// Geist ships as static WOFF2 files, one per weight, rather than one variable font: WebKit (Safari, and every
// browser on iPhone) has rendered the variable TTF with overlapping glyphs on some devices.
export const instrument = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.ttf", weight: "400", style: "normal" },
    { path: "../fonts/InstrumentSerif-Italic.ttf", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Times New Roman", "Georgia", "serif"],
});

export const geist = localFont({
  src: [
    { path: "../fonts/Geist-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Geist-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Geist-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist",
  display: "swap",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
});

export const geistMono = localFont({
  src: [
    { path: "../fonts/GeistMono-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/GeistMono-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
