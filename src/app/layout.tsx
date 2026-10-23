import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const description = "Dnevna igra: koliko daleko stigneš od Vukovara do Dubrovnika?";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Dokle?",
  description,
  openGraph: { type: "website", siteName: "Dokle?", locale: "hr_HR", title: "Dokle?", description },
  twitter: { card: "summary" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="hr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Barlow+Semi+Condensed:wght@600&family=Roboto+Condensed:wght@600&family=Overpass:wght@400;600;800;900&family=Overpass+Mono:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
