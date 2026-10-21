import { adminRoute } from "@/server/adminRoute";
import { playersOverview } from "@/server/admin";

export const GET = adminRoute(async (_req, { skin }) => playersOverview(skin));
