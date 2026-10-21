export type PlayedDay = { date: string; km: number };

export type PlayerStats = {
  played: number;
  currentStreak: number;
  longestStreak: number;
  avgKm: number;
  bestKm: number;
};

const dayIndex = (d: string) => {
  const [y, m, day] = d.split("-").map(Number);
  return Math.round(Date.UTC(y, m - 1, day) / 86400000);
};

/**
 * Statistika iz završenih partija. Streak = uzastopni dani s odigranom partijom;
 * trenutni streak živi dok je zadnja partija danas ili jučer.
 */
export function computeStats(days: PlayedDay[], today: string): PlayerStats {
  if (!days.length) return { played: 0, currentStreak: 0, longestStreak: 0, avgKm: 0, bestKm: 0 };
  const idx = [...new Set(days.map((d) => dayIndex(d.date)))].sort((a, b) => a - b);
  let longest = 1, run = 1;
  for (let i = 1; i < idx.length; i++) {
    run = idx[i] === idx[i - 1] + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
  }
  const last = idx[idx.length - 1];
  const t = dayIndex(today);
  let current = 0;
  if (t - last <= 1) {
    current = 1;
    for (let i = idx.length - 1; i > 0 && idx[i] === idx[i - 1] + 1; i--) current++;
  }
  const kms = days.map((d) => d.km);
  return {
    played: days.length,
    currentStreak: current,
    longestStreak: longest,
    avgKm: Math.round(kms.reduce((a, b) => a + b, 0) / kms.length),
    bestKm: Math.max(...kms),
  };
}
