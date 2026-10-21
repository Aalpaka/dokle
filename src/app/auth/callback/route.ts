import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";
import { authEnabled } from "@/lib/supabase/config";
import { resolveIdentity } from "@/server/player";

// Google -> Supabase -> ovdje s ?code=...; razmjena koda za sesiju, pa spajanje s igračem iz kolačića.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/";
  const safeNext = next.startsWith("/") && !next.startsWith("//") ? next : "/";
  if (authEnabled && code) {
    const { error } = await (await supabaseServer()).auth.exchangeCodeForSession(code);
    if (!error) {
      await resolveIdentity();
      return NextResponse.redirect(new URL(safeNext, url.origin));
    }
  }
  return NextResponse.redirect(new URL("/?prijava=greska", url.origin));
}
