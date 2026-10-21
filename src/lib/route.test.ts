import { describe, expect, it } from "vitest";
import { Route, project } from "./route";
import { hrConfig } from "@/skins/hr/config";
import { hrMap } from "@/skins/hr/map";

describe("ruta na karti", () => {
  const route = new Route(hrConfig.stations, hrMap.via);

  it("projekcija odgovara reljefnoj slici", () => {
    const [x, y] = project(15.98, 45.81); // Zagreb
    expect(x).toBeCloseTo(686.1, 0);
    expect(y).toBeCloseTo(329.7, 0);
  });
  it("svaka dionica ima međutočke", () => {
    expect(hrMap.via).toHaveLength(hrConfig.stations.length - 1);
  });
  it("stanice su točno na svojim km", () => {
    for (const s of hrConfig.stations) {
      const p = route.at(s.km), [x, y] = project(s.lon, s.lat);
      expect(Math.hypot(p.x - x, p.y - y)).toBeLessThan(0.5);
    }
  });
  it("km izvan rute se drže krajeva", () => {
    expect(route.at(-50)).toEqual(route.at(0));
    expect(route.at(5000)).toEqual(route.at(hrConfig.maxKm));
  });
  it("path počinje i završava na zadanim km", () => {
    const d = route.path(100, 140);
    const a = route.at(100), b = route.at(140);
    expect(d.startsWith(`M${a.x.toFixed(1)},${a.y.toFixed(1)}`)).toBe(true);
    expect(d.endsWith(`${b.x.toFixed(1)},${b.y.toFixed(1)}`)).toBe(true);
  });
});
