import { adminRoute, body } from "@/server/adminRoute";
import { updateAnswer } from "@/server/admin";

type P = { id: string; answerId: string };
export const PATCH = adminRoute<P>(async (req, _ctx, { id, answerId }) => {
  const b = await body<{ canonical?: string; priorShare?: number; rare?: boolean; keepOld?: boolean; addAliases?: string[]; removeAliases?: string[] }>(req);
  return updateAnswer(Number(id), Number(answerId), {
    canonical: b.canonical,
    priorShare: b.priorShare === undefined ? undefined : Number(b.priorShare),
    rare: b.rare,
    keepOld: b.keepOld,
    addAliases: b.addAliases,
    removeAliases: b.removeAliases,
  });
});
