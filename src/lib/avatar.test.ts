import { describe, expect, it } from "vitest";
import { sniffImage } from "./avatar";

const bytes = (...xs: (number | string)[]) =>
  new Uint8Array(xs.flatMap((x) => (typeof x === "string" ? [...x].map((c) => c.charCodeAt(0)) : [x])));

describe("sniffImage", () => {
  it("prepoznaje webp, jpeg i png po prvim bajtovima", () => {
    expect(sniffImage(bytes("RIFF", 1, 2, 3, 4, "WEBPVP8 "))).toBe("image/webp");
    expect(sniffImage(bytes(0xff, 0xd8, 0xff, 0xe0, 0))).toBe("image/jpeg");
    expect(sniffImage(bytes(0x89, "PNG", 0x0d, 0x0a, 0x1a, 0x0a, 0))).toBe("image/png");
  });
  it("odbija sve ostalo (svg, html, gif, prazno)", () => {
    expect(sniffImage(bytes('<svg xmlns="http://www.w3.org/2000/svg">'))).toBeNull();
    expect(sniffImage(bytes("<html><script>"))).toBeNull();
    expect(sniffImage(bytes("GIF89a"))).toBeNull();
    expect(sniffImage(bytes("RIFF", 0, 0, 0, 0, "WAVE"))).toBeNull();
    expect(sniffImage(new Uint8Array())).toBeNull();
  });
});
