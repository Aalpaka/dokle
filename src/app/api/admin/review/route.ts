import { adminRoute, body } from "@/server/adminRoute";
import { decide, reviewQueue, type ReviewAction } from "@/server/admin";

export const GET = adminRoute(async (_req, { skin }) => reviewQueue(skin));
export const POST = adminRoute(async (req, { skin, adminId }) => decide(skin, adminId, await body<ReviewAction>(req)));
