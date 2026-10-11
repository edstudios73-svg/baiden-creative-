import type { Metadata, Viewport } from "next";
import { site } from "@/config/site";
import { graph, organizationLd, websiteLd } from "@/lib/seo";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RevealObserver } from "@/components/RevealObserver";
import { JsonLd } from "@/components/ui";
import { geist, geistMono, instrument } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: ${site.statement}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  openGraph: { siteName: site.name, type: "website", locale: "en_GB" },
  twitter: { card: "summary_large_image", site: "@baidencreatives" },
  icons: {
    icon: [
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#f5f2ec",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${instrument.variable} ${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables reveal animations only when JavaScript runs; without it, all content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
        <JsonLd data={graph(organizationLd(), websiteLd())} />
      </body>
    </html>
  );
}
