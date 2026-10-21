import { NextResponse } from "next/server";
import { startNext } from "@/server/game";
import { playerIdOrCreate } from "@/server/player";
import { currentSkin } from "@/server/skin";

export async function POST() {
  const skin = await currentSkin();
  return NextResponse.json(await startNext(skin, await playerIdOrCreate()));
}
