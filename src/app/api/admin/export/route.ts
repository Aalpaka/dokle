import { adminRoute } from "@/server/adminRoute";
import { exportRounds } from "@/server/admin";
import { csvResponse } from "@/server/csv";

export const GET = adminRoute(async (_req, { skin }) => csvResponse(await exportRounds(skin), `dokle-runde-${skin.id}.csv`, ["date"]));
