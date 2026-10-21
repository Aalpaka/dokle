/** Današnji datum (YYYY-MM-DD) u vremenskoj zoni skina; novi dan počinje u ponoć po lokalnom vremenu. */
export function localDate(timezone: string, now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: timezone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Redni broj dana igre; dan lansiranja je #1. */
export function dayNumber(launchDate: string, date: string): number {
  const toUtc = (s: string) => {
    const [y, m, d] = s.split("-").map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return Math.round((toUtc(date) - toUtc(launchDate)) / 86400000) + 1;
}
