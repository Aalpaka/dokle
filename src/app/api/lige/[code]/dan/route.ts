import { NextResponse } from "next/server";
import { CODE_RE } from "@/lib/league";
import { LeagueError, leagueByCode, memberDay } from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

// GET /api/lige/KOD/dan?clan=12&datum=2026-10-21 — pitanja i odgovori jednog člana za jedan dan
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const code = (await ctx.params).code.toUpperCase();
  const league = CODE_RE.test(code) ? await leagueByCode(code) : null;
  if (!league) return NextResponse.json({ error: "Ta liga ne postoji (ili je obrisana)." }, { status: 404 });
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Za lige se treba prijaviti." }, { status: 401 });
  const q = new URL(req.url).searchParams;
  const memberId = Number(q.get("clan"));
  const date = q.get("datum") ?? "";
  if (!Number.isInteger(memberId) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "Neispravan upit." }, { status: 400 });
  try {
    return NextResponse.json(await memberDay(await currentSkin(), league, playerId, memberId, date));
  } catch (e) {
    if (e instanceof LeagueError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
