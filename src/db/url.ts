// Supabaseov connection string nema sslmode, a postgres.js bez njega spaja bez enkripcije: upiti i podaci igrača
// (emailovi) išli bi otvoreno od Vercela do baze. Za sve osim lokalne baze zato se traži TLS (kao sslmode=require).
// sslmode upisan u adresu ima prednost, npr. ?sslmode=disable ako bi ikad trebalo bez TLS-a.
const LOCAL = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function databaseUrl(raw = process.env.DATABASE_URL ?? ""): string {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return raw;
  }
  if (LOCAL.has(url.hostname) || url.searchParams.has("sslmode") || url.searchParams.has("ssl")) return raw;
  return raw + (raw.includes("?") ? "&" : "?") + "sslmode=require";
}
