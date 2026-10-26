import { NextResponse } from "next/server";
import { leagueRace } from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

/** Današnja utrka članova mojih liga, za kružiće na karti. */
export async function GET() {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ leagues: [] });
  return NextResponse.json({ leagues: await leagueRace(await currentSkin(), playerId) });
}
