import { NextResponse } from "next/server";
import { cleanLeagueName } from "@/lib/league";
import { LeagueError, createLeague, myLeagues } from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

export async function GET() {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ leagues: [] });
  return NextResponse.json({ leagues: await myLeagues(await currentSkin(), playerId) });
}

export async function POST(req: Request) {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Za lige se treba prijaviti." }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { name?: unknown } | null;
  const name = cleanLeagueName(body?.name);
  if (!name) return NextResponse.json({ error: "Ime lige: 2 do 40 slova, brojki ili razmaka." }, { status: 400 });
  try {
    const league = await createLeague(await currentSkin(), playerId, name);
    return NextResponse.json({ code: league.code });
  } catch (e) {
    if (e instanceof LeagueError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
}
