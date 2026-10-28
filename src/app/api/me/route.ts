import { NextResponse } from "next/server";
import { authEnabled } from "@/lib/supabase/config";
import { deleteAuthUser, supabaseServer } from "@/lib/supabase/server";
import { avatarUrls, deleteAvatar } from "@/server/avatars";
import { anonymize, getPlayer, isAdminEmail, profileFor, setNickname } from "@/server/accounts";
import { leaveAllLeagues } from "@/server/leagues";
import { clearPlayerCookie, resolveIdentity } from "@/server/player";
import { currentSkin } from "@/server/skin";

export const dynamic = "force-dynamic";

export async function GET() {
  const skin = await currentSkin();
  const { playerId, user } = await resolveIdentity();
  const player = playerId ? await getPlayer(playerId) : null;
  const profile = playerId ? await profileFor(skin, playerId) : { stats: null, history: [] };
  const avatar = user && playerId ? ((await avatarUrls([playerId])).get(playerId) ?? null) : null;
  return NextResponse.json({
    authEnabled,
    user: user && player ? { nickname: player.nickname, email: user.email, avatar, isAdmin: isAdminEmail(user.email) } : null,
    ...profile,
  });
}

const NICK = /^[\p{L}\p{N} _.-]{2,24}$/u;

export async function PATCH(req: Request) {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Nisi prijavljen." }, { status: 401 });
  const body = (await req.json().catch(() => null)) as { nickname?: unknown } | null;
  const nickname = typeof body?.nickname === "string" ? body.nickname.trim() : "";
  if (!NICK.test(nickname)) return NextResponse.json({ error: "Nadimak: 2 do 24 slova, brojke ili razmaci." }, { status: 400 });
  await setNickname(playerId, nickname);
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const { playerId, user } = await resolveIdentity();
  if (!user || !playerId) return NextResponse.json({ error: "Nisi prijavljen." }, { status: 401 });
  await leaveAllLeagues(playerId);
  await deleteAvatar(playerId);
  await anonymize(playerId);
  await (await supabaseServer()).auth.signOut();
  await deleteAuthUser(user.id);
  await clearPlayerCookie();
  return NextResponse.json({ ok: true });
}
