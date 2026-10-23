// Javna adresa stranice za metadata, sitemap i robots.
// Vercel sam postavlja VERCEL_PROJECT_PRODUCTION_URL na glavnu (Production) domenu projekta,
// pa nakon dodavanja prave domene ništa ne treba mijenjati. NEXT_PUBLIC_SITE_URL je ručna iznimka.
const host = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || (host ? `https://${host}` : "http://localhost:3000")
).replace(/\/$/, "");
