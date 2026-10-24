import { adminRoute } from "@/server/adminRoute";
import { playerDetail } from "@/server/admin";

export const GET = adminRoute<{ id: string }>(async (_req, { skin }, { id }) => playerDetail(skin, id));
