import { NextResponse } from "next/server";
import { answerList } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

// svi odgovori kategorije; samo za igrača koji je završio današnju partiju
export async function GET(req: Request) {
  const position = Number(new URL(req.url).searchParams.get("position"));
  const { playerId } = await resolveIdentity();
  if (!playerId || !Number.isInteger(position) || position < 0) return NextResponse.json(null, { status: 404 });
  const list = await answerList(await currentSkin(), playerId, position);
  return NextResponse.json(list, { status: list ? 200 : 404 });
}
