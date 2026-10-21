import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/config";
import { clearPlayerCookie } from "@/server/player";

export async function POST() {
  if (authEnabled) await (await supabaseServer()).auth.signOut();
  await clearPlayerCookie();
  return NextResponse.json({ ok: true });
}
