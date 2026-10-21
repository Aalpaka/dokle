import { NextResponse } from "next/server";
import { getState } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

export async function GET() {
  const skin = await currentSkin();
  return NextResponse.json(await getState(skin, (await resolveIdentity()).playerId));
}
