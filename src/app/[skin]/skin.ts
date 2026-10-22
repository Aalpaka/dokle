import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PREFIXED, SKIN_META, type SkinId } from "@/skins/meta";
import { codeConfigs } from "@/skins/maps";

// stranice zemalja s prefiksom (/ba, /rs); Hrvatska je na korijenu
export type SkinParams = { params: Promise<{ skin: string }> };

export const skinParams = () => PREFIXED.map((skin) => ({ skin }));

export async function skinOf(params: SkinParams["params"]): Promise<SkinId> {
  const { skin } = await params;
  if (!PREFIXED.includes(skin as SkinId)) notFound();
  return skin as SkinId;
}

export async function skinMetadata(params: SkinParams["params"], page?: string): Promise<Metadata> {
  const id = await skinOf(params);
  const cfg = codeConfigs[id];
  const first = cfg.stations[0].genitive ?? cfg.stations[0].name;
  const last = cfg.stations[cfg.stations.length - 1];
  return {
    title: page ? `${page} · ${cfg.title}` : cfg.title,
    description: `Dnevna igra: koliko daleko stigneš od ${first} do ${last.genitive ?? last.name}? ${SKIN_META[id].flag}`,
  };
}
