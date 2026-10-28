import { NextResponse } from "next/server";
import { CODE_RE } from "@/lib/league";
import { LeagueError, leagueByCode, memberDuel } from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { getSkin } from "@/server/game";

export const dynamic = "force-dynamic";

// GET /api/lige/KOD/dvoboj?clan=12 — međusobni omjer prijavljenog igrača i jednog člana lige
export async function GET(req: Request, ctx: { params: Promise<{ code: string }> }) {
  const code = (await ctx.params).code.toUpperCase();
  const league = CODE_RE.test(code) ? await leagueByCode(code) : null;
  if (!league) return NextResponse.json({ error: "Ta liga ne postoji (ili je obrisana)." }, { status: 404 });
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Za lige se treba prijaviti." }, { status: 401 });
  const memberId = Number(new URL(req.url).searchParams.get("clan"));
  if (!Number.isInteger(memberId)) return NextResponse.json({ error: "Neispravan upit." }, { status: 400 });
  try {
    return NextResponse.json(await memberDuel(await getSkin(league.skinId), league, playerId, memberId));
  } catch (e) {
    if (e instanceof LeagueError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
