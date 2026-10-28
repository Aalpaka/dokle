import { describe, expect, it } from "vitest";
import { localRedirect } from "./site";

const ORIGIN = "https://dokle.eu";
const go = (next: string | null) => localRedirect(next, ORIGIN).href;

describe("localRedirect", () => {
  it("vraća na stranicu naše adrese", () => {
    expect(go(null)).toBe("https://dokle.eu/");
    expect(go("/profil")).toBe("https://dokle.eu/profil");
    expect(go("/ba/liga/ABC234?x=1")).toBe("https://dokle.eu/ba/liga/ABC234?x=1");
  });

  it("tuđa adresa ili nešto što preglednik čita kao tuđu vodi na naslovnicu", () => {
    for (const evil of ["https://evil.com", "//evil.com", "/\\evil.com", "/\\/evil.com", "/\t/evil.com", "http://["])
      expect(go(evil)).toBe("https://dokle.eu/");
  });
});
