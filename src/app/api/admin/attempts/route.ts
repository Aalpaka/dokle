import { adminRoute } from "@/server/adminRoute";
import { searchAttempts } from "@/server/admin";
import { csvResponse } from "@/server/csv";

export const GET = adminRoute(async (req, { skin }) => {
  const sp = new URL(req.url).searchParams;
  const csv = sp.get("format") === "csv";
  const rows = await searchAttempts(skin, {
    date: sp.get("date") || undefined,
    categoryId: sp.get("categoryId") ? Number(sp.get("categoryId")) : undefined,
    q: sp.get("q") || undefined,
    onlyRejected: sp.get("rejected") === "1",
    limit: csv ? 50000 : 500,
  });
  return csv ? csvResponse(rows, "dokle-odgovori.csv", ["createdAt"]) : rows;
});
