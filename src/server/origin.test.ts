import { describe, expect, it } from "vitest";
import { deviceOf, referrerHost, requestOrigin } from "./origin";

describe("porijeklo igrača", () => {
  it("čita Vercelova geo zaglavlja bez IP-a", () => {
    const h = new Headers({
      "x-vercel-ip-country": "hr",
      "x-vercel-ip-city": "Slavonski%20Brod",
      "x-forwarded-for": "203.0.113.7",
      "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148",
      host: "dokle.eu",
    });
    const o = requestOrigin(h, "https://www.google.hr/");
    expect(o).toEqual({ country: "HR", city: "Slavonski Brod", device: "mobitel", referrer: "google" });
    expect(JSON.stringify(o)).not.toContain("203.0.113.7");
  });

  it("uređaj iz user-agenta", () => {
    expect(deviceOf("Mozilla/5.0 (Linux; Android 14; SM-S911B) Mobile Safari/537.36")).toBe("mobitel");
    expect(deviceOf("Mozilla/5.0 (Linux; Android 13; SM-X200) Safari/537.36")).toBe("tablet");
    expect(deviceOf("Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/130.0")).toBe("računalo");
    expect(deviceOf("")).toBeNull();
  });

  it("izvor dolaska: samo tuđa domena, bez putanje", () => {
    expect(referrerHost("https://l.facebook.com/l.php?u=https%3A%2F%2Fdokle.eu", "dokle.eu")).toBe("l.facebook.com");
    expect(referrerHost("https://dokle.eu/liga/ABC", "dokle.eu")).toBeNull();
    expect(referrerHost("", "dokle.eu")).toBeNull();
    expect(referrerHost("nije url", "dokle.eu")).toBeNull();
  });
});
