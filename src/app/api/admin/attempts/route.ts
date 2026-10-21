import { adminRoute } from "@/server/adminRoute";
import { searchAttempts } from "@/server/admin";

const csvCell = (v: unknown) => {
  const s = v instanceof Date ? v.toISOString() : String(v ?? "");
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

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
  if (!csv) return rows;
  const cols = Object.keys(rows[0] ?? { createdAt: 0 }) as (keyof (typeof rows)[number])[];
  const text = [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n");
  return new Response("﻿" + text, {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="dokle-odgovori.csv"` },
  });
});
