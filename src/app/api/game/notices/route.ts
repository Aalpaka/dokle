import { NextResponse } from "next/server";
import { dismissNotices, rescoreNotices } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

// odgovori koje je admin naknadno prihvatio, dok ih igrač ne potvrdi
export async function GET() {
  const { playerId } = await resolveIdentity();
  if (!playerId) return NextResponse.json([]);
  return NextResponse.json(await rescoreNotices(await currentSkin(), playerId));
}

export async function POST() {
  const { playerId } = await resolveIdentity();
  if (playerId) await dismissNotices(await currentSkin(), playerId);
  return NextResponse.json({ ok: true });
}
