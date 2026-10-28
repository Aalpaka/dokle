// Upis igrača koji počinje s = + - @ Excel i Google Sheets pri otvaranju izvrše kao formulu (npr. =HYPERLINK ili
// =IMPORTXML koji podatke iz tablice šalje na tuđu adresu); apostrof ispred ga ostavlja običnim tekstom.
const FORMULA = /^[=+\-@\t\r]/;

const csvCell = (v: unknown) => {
  let s = v instanceof Date ? v.toISOString() : String(v ?? "");
  if (typeof v === "string" && FORMULA.test(s)) s = "'" + s;
  return /[",\r\n;]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** CSV za preuzimanje (s BOM-om, da ga Excel otvori u UTF-8). */
export function csvResponse<T extends Record<string, unknown>>(rows: T[], filename: string, empty: string[] = []) {
  const cols = rows.length ? Object.keys(rows[0]) : empty;
  const text = [cols.join(","), ...rows.map((r) => cols.map((c) => csvCell(r[c])).join(","))].join("\n");
  return new Response("﻿" + text, {
    headers: { "content-type": "text/csv; charset=utf-8", "content-disposition": `attachment; filename="${filename}"` },
  });
}
