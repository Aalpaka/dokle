const csvCell = (v: unknown) => {
  const s = v instanceof Date ? v.toISOString() : String(v ?? "");
  return /[",\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** CSV za preuzimanje (s BOM-om, da ga Excel otvori u UTF-8). */
export function csvResponse<T extends Record<string, unknown>>(rows: T[], filename: string, empty: string[] = []) {
  const cols = rows.length ? Object.keys(rows[0]) : empty;
  const text = [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n");
  return new Response("﻿" + text, {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${filename}"` },
  });
}
