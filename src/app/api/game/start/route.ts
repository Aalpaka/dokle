import { NextResponse } from "next/server";
import { startNext } from "@/server/game";
import { requestOrigin } from "@/server/origin";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export async function POST(req: Request) {
  const skin = await currentSkin();
  const body = await req.json().catch(() => ({}));
  const origin = requestOrigin(req.headers, body?.ref);
  return NextResponse.json(await startNext(skin, (await resolveIdentity(true)).playerId!, undefined, origin));
}
