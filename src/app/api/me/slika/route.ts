import { NextResponse } from "next/server";
import { MAX_AVATAR_BYTES } from "@/lib/avatar";
import { deleteAvatar, setAvatar } from "@/server/avatars";
import { resolveIdentity } from "@/server/player";

export const dynamic = "force-dynamic";

/** Nova profilna slika: tijelo zahtjeva su bajtovi već smanjene slike (webp, jpeg ili png, do 64 KB). */
export async function POST(req: Request) {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Nisi prijavljen." }, { status: 401 });
  if (!req.headers.get("content-type")?.startsWith("image/") || Number(req.headers.get("content-length") ?? 0) > MAX_AVATAR_BYTES) {
    return NextResponse.json({ error: "Slika nije prihvaćena." }, { status: 400 });
  }
  const data = Buffer.from(await req.arrayBuffer());
  const url = await setAvatar(playerId, data);
  if (!url) return NextResponse.json({ error: "Slika nije prihvaćena." }, { status: 400 });
  return NextResponse.json({ ok: true, avatar: url });
}

export async function DELETE() {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Nisi prijavljen." }, { status: 401 });
  await deleteAvatar(playerId);
  return NextResponse.json({ ok: true });
}
