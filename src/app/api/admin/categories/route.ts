import { adminRoute, body } from "@/server/adminRoute";
import { createCategory, listCategories, unpaired } from "@/server/admin";

export const GET = adminRoute(async (req, { skin }) => (new URL(req.url).searchParams.has("unpaired") ? unpaired(skin) : listCategories(skin)));
export const POST = adminRoute(async (req, { skin }) =>
  createCategory(skin, await body<{ title: string; group: string; hint?: string; strip?: string[]; answers: string; pairOf?: string }>(req)),
);
