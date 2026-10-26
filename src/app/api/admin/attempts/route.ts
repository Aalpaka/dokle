import { adminRoute } from "@/server/adminRoute";
import { attemptsSummary, searchAttempts, type AttemptStatus } from "@/server/admin";
import { csvResponse } from "@/server/csv";
import { localDate } from "@/lib/day";

const STATUSES: AttemptStatus[] = ["ok", "rejected", "late"];

export const GET = adminRoute(async (req, { skin }) => {
  const sp = new URL(req.url).searchParams;
  const csv = sp.get("format") === "csv";
  const status = STATUSES.find((s) => s === sp.get("status")) ?? (sp.get("rejected") === "1" ? "rejected" : undefined);
  const date = sp.get("date") || undefined;
  const rows = await searchAttempts(skin, {
    date,
    categoryId: sp.get("categoryId") ? Number(sp.get("categoryId")) : undefined,
    q: sp.get("q") || undefined,
    status,
    limit: csv ? 50000 : 500,
  });
  if (csv) return csvResponse(rows, "dokle-odgovori.csv", ["createdAt"]);
  return { rows, summary: await attemptsSummary(skin, date ?? localDate(skin.timezone)) };
});
