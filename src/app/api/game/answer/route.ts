import { NextResponse } from "next/server";
import { submitAnswer } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { raw?: unknown; final?: unknown; keep?: unknown } | null;
  const raw = typeof body?.raw === "string" ? body.raw : "";
  const { playerId } = await resolveIdentity();
  if (!playerId) return NextResponse.json({ status: "no-round" }, { status: 409 });
  const result = await submitAnswer(await currentSkin(), playerId, raw, body?.final === true, body?.keep === true);
  return NextResponse.json(result, { status: result.status === "no-round" ? 409 : 200 });
}
