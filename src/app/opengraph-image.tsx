import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.name}: ${site.statement}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [serif, serifItalic, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/InstrumentSerif-Regular.ttf")),
    readFile(join(process.cwd(), "src/fonts/InstrumentSerif-Italic.ttf")),
    readFile(join(process.cwd(), "public/assets/baiden-creatives-logo-white.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111318",
          color: "#f5f2ec",
          padding: "72px 80px",
          fontFamily: "Instrument Serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={250} height={68} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, lineHeight: 0.95, letterSpacing: -2 }}>
          <span>Built from imagination.</span>
          <span style={{ fontStyle: "italic", color: "#c9ff54" }}>Made for impact.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 30, color: "#a6aab0" }}>
          <span>Design · Technology · Brand</span>
          <span>baidencreatives.org</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif", data: serifItalic, style: "italic", weight: 400 },
      ],
    },
  );
}
