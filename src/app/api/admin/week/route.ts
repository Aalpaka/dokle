import { adminRoute } from "@/server/adminRoute";
import { weekAverages } from "@/server/admin";
import { localDate } from "@/lib/day";
import { periodStart } from "@/lib/league";

// ?date=YYYY-MM-DD bilo koji dan tjedna; bez njega tekući tjedan
export const GET = adminRoute(async (req, { skin }) => {
  const raw = new URL(req.url).searchParams.get("date");
  const date = raw && /^\d{4}-\d{2}-\d{2}$/.test(raw) ? raw : localDate(skin.timezone);
  return weekAverages(skin, periodStart("week", date, date));
});
