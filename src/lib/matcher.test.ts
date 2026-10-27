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
    ["Hvra", "Hvar"], // 4–5 slova: samo zamjena susjednih
    ["Hvat", null], // 4–5 slova: ostali tipfeleri ne
    ["Kr", null],
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

  it("ćirilica", () => {
    expect(match(jelo, "Ћевапи")?.canonical).toBe("Ćevapi");
    expect(match(rijeka, "Сава")?.canonical).toBe("Sava");
    expect(match(jelo, "Сарма")?.canonical).toBe("Sarma");
  });

  it("tipfeleri: zamjena susjednih slova, strani pravopis, redoslijed riječi", () => {
    const idx = buildIndex(
      [
        "Washington", "Mississippi", "Vatroslav Lisinski", "Mali Lošinj", "Veli Lošinj", "Gornja Stubica",
        "Michael Jordan", "Luj XIV", "Peugeot 208", "Capri", "Branka", "Ranka", "SDS", "Zagreb",
      ].map((canonical, id) => ({ id, canonical, variants: [] })),
    );
    const m = (s: string) => match(idx, s)?.canonical ?? null;
    expect(m("Wahsington")).toBe("Washington");
    expect(m("Vašington")).toBe("Washington");
    expect(m("Misisipi")).toBe("Mississippi");
    expect(m("Lisinski Vatroslav")).toBe("Vatroslav Lisinski");
    expect(m("Vatroslav Lisniski")).toBe("Vatroslav Lisinski");
    expect(m("Vatrsolav Lisniski")).toBe("Vatroslav Lisinski"); // po jedan tipfeler u svakoj riječi
    expect(m("Malilošinj")).toBe("Mali Lošinj");
    expect(m("Zgareb")).toBe("Zagreb");
    expect(m("Cpari")).toBe("Capri");
    expect(m("Acpri")).toBeNull(); // 4–5 slova: prvo slovo mora stajati
    expect(m("Carpi")).toBe("Capri");
    expect(m("Donja Stubica")).toBeNull(); // svaka riječ za sebe, Donja/Gornja su dvije greške
    expect(m("Michael Norman")).toBeNull();
    expect(m("Luj XVI")).toBeNull(); // rimski brojevi moraju biti točni
    expect(m("Peugeot 2008")).toBeNull(); // brojevi moraju biti točni
    expect(m("Franka")).toBeNull(); // blizu i Branki i Ranki, ne pogađamo
    expect(m("SDSS")).toBeNull();
  });

  it("odgovor bez opće riječi: Dubravsko = Dubravsko jezero", () => {
    const jezero = indexFor("jezero");
    expect(match(jezero, "Dubravsko")?.canonical).toBe("Dubravsko jezero");
    expect(match(jezero, "Plitvička")?.canonical).toBe("Plitvička jezera");
    expect(match(jezero, "jezera Plitvička")?.canonical).toBe("Plitvička jezera"); // i padež/množina opće riječi u upisu
    expect(match(jezero, "Jarun")?.canonical).toBe("Jarun");
    const more = indexFor("more-ocean");
    expect(match(more, "Jadransko")?.canonical).toBe("Jadransko more");
    expect(match(more, "Hudsonov")).toBeNull(); // zaljev i tjesnac: ne pogađamo
    // skraćeni oblik samo kako je upisan, ne preko druge opće riječi
    const idx = buildIndex([{ id: 1, canonical: "Hudsonov zaljev", variants: [] }], ["zaljev", "tjesnac"]);
    expect(match(idx, "Hudsonov")?.canonical).toBe("Hudsonov zaljev");
    expect(match(idx, "Hudsonov tjesnac")).toBeNull();
  });

  it("prazan unos", () => {
    expect(match(otok, "   ")).toBeNull();
  });
});
