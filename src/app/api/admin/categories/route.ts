import { adminRoute, body } from "@/server/adminRoute";
import { createCategory, listCategories } from "@/server/admin";

export const GET = adminRoute(async (_req, { skin }) => listCategories(skin));
export const POST = adminRoute(async (req, { skin }) =>
  createCategory(skin, await body<{ title: string; group: string; hint?: string; strip?: string[]; answers: string }>(req)),
);
