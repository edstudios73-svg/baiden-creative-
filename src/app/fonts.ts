import localFont from "next/font/local";

// Self-hosted (SIL Open Font License, see src/fonts/OFL-*.txt): no third-party font requests at runtime or build time.
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
  src: "../fonts/Geist-Variable.ttf",
  weight: "100 900",
  variable: "--font-geist",
  display: "swap",
});

export const geistMono = localFont({
  src: "../fonts/GeistMono-Variable.ttf",
  weight: "100 900",
  variable: "--font-geist-mono",
  display: "swap",
  preload: false,
});
