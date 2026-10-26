import "server-only";
import { headers } from "next/headers";
import { isSkinId } from "@/skins/meta";
import { getSkin } from "./game";

/**
 * Skin za ovaj zahtjev: stranica ga šalje u zaglavlju x-skin (skinFetch), obična poveznica (preuzimanje CSV-a) kao
 * ?skin=, inače je Hrvatska.
 */
export async function currentSkin(fromQuery?: string | null) {
  const h = (await headers()).get("x-skin") ?? fromQuery ?? null;
  return getSkin(isSkinId(h) ? h : (process.env.DEFAULT_SKIN ?? "hr"));
}
