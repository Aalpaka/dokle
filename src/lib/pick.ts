export type PoolCategory = { id: number; group: string; slug: string; open: boolean };

/** Koliko jako otvorenih pitanja smije biti u jednom danu. */
export const MAX_OPEN_PER_DAY = 1;

/**
 * Kategorije dana po uzorku grupa. `pool` je već složen po prednosti (najdulje nekorištene prve), `wanted` su slugovi
 * koje skin mora uzeti istim redom (BiH i Srbija prate Hrvatsku). Za ostala mjesta uzima prvu kategoriju grupe, ali
 * preskače jako otvorene kad ih dan već ima MAX_OPEN_PER_DAY; ako grupa nema ništa drugo, ipak uzme otvorenu.
 */
export function pickCategories(pattern: string[], pool: PoolCategory[], wanted: (string | null)[] = []): number[] {
  const picked: PoolCategory[] = [];
  for (const [i, group] of pattern.entries()) {
    const free = (p: PoolCategory) => !picked.includes(p);
    const full = picked.filter((p) => p.open).length >= MAX_OPEN_PER_DAY;
    // bez para (ne bi se smjelo dogoditi) bira se iz iste grupe nešto što taj dan nije ni u jednoj državi
    const same = (p: PoolCategory) => p.group === group && free(p) && !wanted.includes(p.slug);
    const c =
      pool.find((p) => p.slug === wanted[i] && free(p)) ?? pool.find((p) => same(p) && !(full && p.open)) ?? pool.find(same);
    if (!c) throw new Error(`Nema dovoljno aktivnih kategorija u grupi ${group}`);
    picked.push(c);
  }
  return picked.map((p) => p.id);
}

/**
 * Unaprijed zadani dan (raspored.ts): za svako mjesto prvi kandidat iz te grupe koji postoji u poolu, još nije bio ni u
 * jednom danu (`used`) i nije već uzet za drugo mjesto; inače null, pa to mjesto popuni pickCategories kao i obično.
 */
export function plannedSlugs(pattern: string[], plan: string[][], pool: PoolCategory[], used: Set<string>): (string | null)[] {
  const taken = new Set<string>();
  return pattern.map((group, i) => {
    const slug = (plan[i] ?? []).find((s) => !used.has(s) && !taken.has(s) && pool.some((p) => p.slug === s && p.group === group));
    if (!slug) return null;
    taken.add(slug);
    return slug;
  });
}
