import { NextResponse } from "next/server";
import { previewAnswer } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  const { playerId } = await resolveIdentity();
  if (!playerId || !q.trim()) return NextResponse.json({ canonical: null });
  return NextResponse.json(await previewAnswer(await currentSkin(), playerId, q));
}
