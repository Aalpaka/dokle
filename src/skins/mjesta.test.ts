import { describe, expect, it } from "vitest";
import { nearestStation, placeAt } from "./mjesta";
import { hrConfig } from "./hr/config";
import { baConfig } from "./ba/config";
import { rsConfig } from "./rs/config";
import { mjesta as hr } from "./hr/mjesta";

describe("placeAt", () => {
  it("postaje rute su same sebi najbliže mjesto", () => {
    for (const [id, cfg] of [["hr", hrConfig], ["ba", baConfig], ["rs", rsConfig]] as const)
      for (const s of cfg.stations) expect(placeAt(id, cfg, s.km), `${id} ${s.name}`).toBe(s.name);
  });
  it("pred Zadrom nije Gospić", () => {
    expect(placeAt("hr", hrConfig, 705)).toBe("Zadar");
    expect(placeAt("hr", hrConfig, 690)).not.toBe("Gospić");
  });
  it("tablica pokriva cijelu rutu, od starta", () => {
    expect(hr[0][0]).toBe(0);
    expect(hr.at(-1)![0]).toBeLessThanOrEqual(hrConfig.maxKm);
  });
  it("iza cilja cilj, preko overKm Budva", () => {
    expect(placeAt("hr", hrConfig, 1300)).toBe("Dubrovnik");
    expect(placeAt("hr", hrConfig, 1401)).toBe("Budva");
  });
  it("nepoznat skin pada na postaje", () => {
    expect(placeAt("xx", hrConfig, 705)).toBe("Gospić");
  });
});

describe("nearestStation", () => {
  it("bliža postaja po km, ispred ili iza", () => {
    expect(nearestStation(hrConfig, 705).name).toBe("Zadar");
    expect(nearestStation(hrConfig, 630).name).toBe("Gospić");
    expect(nearestStation(hrConfig, 1450).name).toBe("Budva");
  });
});
