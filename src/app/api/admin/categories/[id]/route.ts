import { adminRoute, body } from "@/server/adminRoute";
import { categoryDetail, updateCategory } from "@/server/admin";

type P = { id: string };
export const GET = adminRoute<P>(async (_req, _ctx, { id }) => categoryDetail(Number(id)));
export const PATCH = adminRoute<P>(async (req, _ctx, { id }) => {
  await updateCategory(Number(id), await body<{ active?: boolean; title?: string; hint?: string | null }>(req));
  return categoryDetail(Number(id));
});
