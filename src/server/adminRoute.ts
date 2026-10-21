import "server-only";
import { NextResponse } from "next/server";
import { requireAdmin } from "./admin";
import { currentSkin } from "./skin";
import type { Skin } from "./game";

type Ctx = { skin: Skin; adminId: string | null };

/** Omotač za admin API: provjera admina, skin, greške kao JSON. */
export function adminRoute<P = unknown>(fn: (req: Request, ctx: Ctx, params: P) => Promise<unknown>) {
  return async (req: Request, route: { params: Promise<P> }) => {
    const admin = await requireAdmin();
    if (!admin) return NextResponse.json({ error: "Samo za admina." }, { status: 403 });
    try {
      const out = await fn(req, { skin: await currentSkin(), adminId: admin.playerId }, await route.params);
      return out instanceof Response ? out : NextResponse.json(out);
    } catch (e) {
      return NextResponse.json({ error: e instanceof Error ? e.message : "Greška" }, { status: 400 });
    }
  };
}

export const body = async <T>(req: Request) => ((await req.json().catch(() => ({}))) ?? {}) as T;
