import { NextResponse } from "next/server";
import { dayCompare } from "@/server/game";
import { resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

// gdje su danas stali ostali igrači; samo za igrača koji je završio današnju partiju
export async function GET() {
  const { playerId } = await resolveIdentity();
  if (!playerId) return NextResponse.json(null, { status: 404 });
  const c = await dayCompare(await currentSkin(), playerId);
  return NextResponse.json(c, { status: c ? 200 : 404 });
}
