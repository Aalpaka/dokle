import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dokle?",
  description: "Dnevna igra: koliko daleko stigneš od Vukovara do Dubrovnika?",
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
          href="https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;800;900&family=Overpass+Mono:wght@500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
