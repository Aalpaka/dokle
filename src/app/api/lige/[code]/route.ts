import { NextResponse } from "next/server";
import { CODE_RE, PERIODS, cleanLeagueName, type Period } from "@/lib/league";
import {
  LeagueError,
  deleteLeague,
  joinLeague,
  leagueByCode,
  leagueView,
  leaveLeague,
  removeMember,
  renameLeague,
} from "@/server/leagues";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ code: string }> };

async function find(ctx: Ctx) {
  const code = (await ctx.params).code.toUpperCase();
  return CODE_RE.test(code) ? leagueByCode(code) : null;
}

const notFound = () => NextResponse.json({ error: "Ta liga ne postoji (ili je obrisana)." }, { status: 404 });

export async function GET(req: Request, ctx: Ctx) {
  const league = await find(ctx);
  if (!league) return notFound();
  const { playerId, user } = await resolveIdentity();
  const p = new URL(req.url).searchParams.get("period");
  const period: Period = PERIODS.includes(p as Period) ? (p as Period) : "week";
  return NextResponse.json(await leagueView(await currentSkin(), league, user ? playerId : null, period));
}

type Action = { action?: string; name?: unknown; memberId?: unknown };

export async function POST(req: Request, ctx: Ctx) {
  const league = await find(ctx);
  if (!league) return notFound();
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Za lige se treba prijaviti." }, { status: 401 });
  const body = ((await req.json().catch(() => null)) ?? {}) as Action;
  try {
    switch (body.action) {
      case "join":
        await joinLeague(league, playerId);
        break;
      case "leave":
        await leaveLeague(league, playerId);
        break;
      case "rename": {
        const name = cleanLeagueName(body.name);
        if (!name) throw new LeagueError("Ime lige: 2 do 40 slova, brojki ili razmaka.");
        await renameLeague(league, playerId, name);
        break;
      }
      case "kick":
        await removeMember(league, playerId, Number(body.memberId));
        break;
      case "delete":
        await deleteLeague(league, playerId);
        break;
      default:
        throw new LeagueError("Nepoznata radnja.");
    }
  } catch (e) {
    if (e instanceof LeagueError) return NextResponse.json({ error: e.message }, { status: 400 });
    throw e;
  }
  return NextResponse.json({ ok: true });
}
