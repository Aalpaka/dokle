import { adminRoute } from "@/server/adminRoute";
import { dayOverview } from "@/server/admin";
import { localDate } from "@/lib/day";

export const GET = adminRoute(async (req, { skin }) => {
  const date = new URL(req.url).searchParams.get("date") ?? localDate(skin.timezone);
  return dayOverview(skin, date);
});
