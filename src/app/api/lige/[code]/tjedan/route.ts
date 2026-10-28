import { NextResponse } from "next/server";
import { CODE_RE } from "@/lib/league";
import { LeagueError, leagueByCode, pastWeek } from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { getSkin } from "@/server/game";

export const dynamic = "force-dynamic";

// GET /api/lige/KOD/tjedan?od=2026-10-19 — tablica i graf prosjeka jednog završenog tjedna (bez pitanja i odgovora)
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const code = (await ctx.params).code.toUpperCase();
  const league = CODE_RE.test(code) ? await leagueByCode(code) : null;
  if (!league) return NextResponse.json({ error: "Ta liga ne postoji (ili je obrisana)." }, { status: 404 });
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Za lige se treba prijaviti." }, { status: 401 });
  const from = new URL(req.url).searchParams.get("od") ?? "";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(from)) return NextResponse.json({ error: "Neispravan upit." }, { status: 400 });
  try {
    return NextResponse.json(await pastWeek(await getSkin(league.skinId), league, playerId, from));
  } catch (e) {
    if (e instanceof LeagueError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
