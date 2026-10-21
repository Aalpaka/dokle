import { adminRoute, body } from "@/server/adminRoute";
import { addAnswer } from "@/server/admin";

export const POST = adminRoute<{ id: string }>(async (req, _ctx, { id }) => {
  const b = await body<{ canonical?: string; variants?: string[]; priorShare?: number; rare?: boolean }>(req);
  if (!b.canonical?.trim()) throw new Error("Upiši odgovor");
  return addAnswer(Number(id), { canonical: b.canonical, variants: b.variants ?? [], priorShare: Number(b.priorShare ?? 0.1), rare: !!b.rare });
});
