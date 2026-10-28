import { avatarByKey } from "@/server/avatars";

export const dynamic = "force-dynamic";

/**
 * Profilna slika po nasumičnom ključu. Svaki upload ima novi ključ, pa se odgovor kešira godinu dana (i na
 * Vercelovom CDN-u, pa baza vidi samo prvi dohvat). Vrsta slike je provjerena pri spremanju; CSP sandbox (next.config.ts) i
 * nosniff dodatno brane da se išta otvori kao stranica.
 */
export async function GET(_req: Request, ctx: { params: Promise<{ key: string }> }) {
  const a = await avatarByKey((await ctx.params).key);
  if (!a) return new Response("Nema slike", { status: 404, headers: { "cache-control": "public, max-age=300" } });
  return new Response(new Uint8Array(a.data), {
    headers: {
      "content-type": a.mime,
      "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "x-content-type-options": "nosniff",
    },
  });
}
