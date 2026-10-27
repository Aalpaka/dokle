import { NextResponse } from "next/server";
import { reportRound } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

// prijava da točan odgovor iz današnje runde fali na popisu; raw = jedan od odbijenih pokušaja, bez njega konačni upis
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { position?: unknown; raw?: unknown } | null;
  const position = Number(body?.position);
  const raw = typeof body?.raw === "string" ? body.raw.slice(0, 200) : undefined;
  const { playerId } = await resolveIdentity();
  if (!playerId || !Number.isInteger(position) || position < 0) return NextResponse.json(null, { status: 404 });
  const state = await reportRound(await currentSkin(), playerId, position, raw);
  return NextResponse.json(state, { status: state ? 200 : 404 });
}
