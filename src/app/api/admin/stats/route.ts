import { adminRoute } from "@/server/adminRoute";
import { generalStats } from "@/server/admin";

export const GET = adminRoute(async (req, { skin }) => {
  const p = new URL(req.url).searchParams.get("phase");
  return generalStats(skin, p === "test" || p === "live" ? p : undefined);
});
