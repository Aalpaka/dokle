import { NextResponse } from "next/server";
import { flagAttempt, reportRound } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

// prijava odgovora iz današnje runde: count = "želim da se ovaj računa" (jedan po rundi; bez raw konačni upis),
// bez count samo "fali na popisu" za odbijeni pokušaj raw
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { position?: unknown; raw?: unknown; count?: unknown } | null;
  const position = Number(body?.position);
  const raw = typeof body?.raw === "string" ? body.raw.slice(0, 200) : undefined;
  const { playerId } = await resolveIdentity();
  if (!playerId || !Number.isInteger(position) || position < 0) return NextResponse.json(null, { status: 404 });
  const skin = await currentSkin();
  const state = body?.count === false && raw ? await flagAttempt(skin, playerId, position, raw) : await reportRound(skin, playerId, position, raw);
  return NextResponse.json(state, { status: state ? 200 : 404 });
}
