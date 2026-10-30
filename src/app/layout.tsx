import type { Metadata, Viewport } from "next";
import { Barlow_Semi_Condensed, Overpass, Overpass_Mono, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { HALLOWEEN_SCRIPT } from "@/lib/halloween";
import Halloween from "@/components/Halloween";

const description = "Dnevna igra: koliko daleko stigneš od Vukovara do Dubrovnika?";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dokle?",
  description,
  openGraph: { type: "website", siteName: "Dokle?", locale: "hr_HR", title: "Dokle?", description },
  twitter: { card: "summary" },
};

// Fontovi se poslužuju s naše domene (next/font ih skine pri buildu), pa preglednik igrača ne zove Google.
const sign = Overpass({ weight: ["400", "600", "800", "900"], subsets: ["latin", "latin-ext"], variable: "--nf-sign" });
const mono = Overpass_Mono({ weight: ["500", "700"], subsets: ["latin", "latin-ext"], variable: "--nf-mono" });
const town = Barlow_Semi_Condensed({ weight: "600", subsets: ["latin", "latin-ext"], variable: "--nf-town" });
// samo za ćirilicu (Barlow je nema), pa se ne učitava unaprijed
const townCyr = Roboto_Condensed({ weight: "600", subsets: ["cyrillic"], preload: false, variable: "--nf-town-cyr" });

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-theme postavlja skripta prije hidracije (Noć vještica), pa React ne smije prigovarati razlici
    <html lang="hr" className={[sign.variable, mono.variable, town.variable, townCyr.variable].join(" ")} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: HALLOWEEN_SCRIPT }} />
      </head>
      <body>
        {children}
        <Halloween />
      </body>
    </html>
  );
}
