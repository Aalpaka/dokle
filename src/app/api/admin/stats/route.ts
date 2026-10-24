import { adminRoute } from "@/server/adminRoute";
import { generalStats } from "@/server/admin";

export const GET = adminRoute(async (_req, { skin }) => generalStats(skin));
