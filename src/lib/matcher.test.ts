import { describe, expect, it } from "vitest";
import { buildIndex, match, parseSeedAnswers } from "./matcher";
import { hrCategories } from "@/skins/hr/categories";

function indexFor(slug: string) {
  const c = hrCategories.find((x) => x.slug === slug)!;
  const answers = parseSeedAnswers(c.answers).map((a, i) => ({ id: i, ...a }));
  return buildIndex(answers, c.strip);
}

describe("match", () => {
  const otok = indexFor("otok");
  const rijeka = indexFor("rijeka");
  const jelo = indexFor("jelo");

  it.each([
    ["Krk", "Krk"],
    ["brac", "Brač"],
    ["otok Krk", "Krk"],
    ["Brioni", "Brijuni"],
    ["Korčulu", "Korčula"],
    ["Hvra", null], // kratke riječi bez tipfelera
    ["Lastvo", "Lastovo"], // 1 tipfeler za 6+ slova
    ["Đakovo", null],
  ])("otok: %s -> %s", (input, expected) => {
    expect(match(otok, input)?.canonical ?? null).toBe(expected);
  });

  it("ekavica i dj", () => {
    expect(match(rijeka, "reka Sava")?.canonical).toBe("Sava");
    expect(match(jelo, "cevapcici")?.canonical).toBe("Ćevapi");
    expect(match(jelo, "Štruklji")?.canonical).toBe("Štrukli");
  });

  it("prazan unos", () => {
    expect(match(otok, "   ")).toBeNull();
  });
});
