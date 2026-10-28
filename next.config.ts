import type { NextConfig } from "next";

// Sigurnosna zaglavlja za sve stranice. Bez punog CSP-a za skripte (Googleov gumb i Supabase ga kompliciraju);
// frame-ancestors brani da nas tuđa stranica ugradi u iframe i navede igrača na klik (npr. "Obriši račun").
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'self'" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000" },
];

const nextConfig: NextConfig = {
  serverExternalPackages: ["postgres"],
  // next/image se ne koristi, pa ni /_next/image (optimizator slika, u 2026. izvor više ozbiljnih ranjivosti Next.js-a)
  images: { unoptimized: true },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // profilne slike: i kad bi se netko uspio podmetnuti kao slika, ne smije se izvršiti kao stranica
      { source: "/api/slika/:key", headers: [{ key: "Content-Security-Policy", value: "default-src 'none'; sandbox; frame-ancestors 'none'" }] },
    ];
  },
};

export default nextConfig;
