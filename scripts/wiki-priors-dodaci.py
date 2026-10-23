# Pokretanje: python3 -I scripts/wiki-priors-dodaci.py <main.json> <grana.json> <izlaz.json>
# (<x>.json = {slug: [{c, v, s, r}]} iz hrCategories na mainu i na grani; izlaz ide u kategorije/wikipedija-dodaci.ts)
# Wikipedia priori za NOVE odgovore (isti recept kao scripts/wiki-priors.py, ali samo za odgovore kojih nema na mainu).
import json, math, gzip, sys, re
W = "/mnt/project-files/dokle/wiki"
old, new = json.load(open(sys.argv[1])), json.load(open(sys.argv[2]))
index = json.load(open(f"{W}/_index.json"))
GENERIC = {"bitka", "utvrda", "dalmatinska-zagora", "istra", "slavonija", "zagorje", "lika-gorski", "beatles", "biblija", "knjizevno-djelo", "opera-balet", "simpsoni", "star-wars", "got", "lotr", "superheroj", "medij", "glazba", "dragi-kamen", "ples", "riba", "pas", "ptica", "zanr", "africka-zivotinja", "mjerna-jedinica",
           "geometrija", "kost", "koktel", "drustvena-igra"}
WEIGHT, MAX_UP, MAX_DOWN = 0.4, 3.0, 2.0
slugs = [s for s, ix in index.items() if s in new and s not in GENERIC and (ix.get("spearman_share_vs_views") or 0) >= 0.4]
cands = {}
for s in slugs:
    have = {a["c"] for a in old.get(s, [])}
    got = []
    for a in new[s]:
        if a["c"] not in have and not a["r"]:
            for t in [a["c"]]:
                t = t[:1].upper() + t[1:]
                cands.setdefault(t, set())
need = set(cands)
views = {"hr": {}, "en": {}}
for lang in views:
    with gzip.open(f"{W}/skripta/podaci/pv12-{lang}.tsv.gz", "rt", encoding="utf-8") as f:
        for line in f:
            t, _, n = line.rstrip("\n").rpartition("\t")
            t = t.replace("_", " ")
            if t in need:
                views[lang][t] = views[lang].get(t, 0) + int(n)
out, report = {}, []
for s in slugs:
    ix = index[s]; lang = ix["lang"]; other = "en" if lang == "hr" else "hr"
    wiki = json.load(open(f"{W}/{s}.json"))
    cur = {a["c"]: a for a in new[s]}
    usable = [(c, w) for c, w in wiki.items() if c in cur and not cur[c]["r"] and w.get("est") and not w.get("suspect")
              and not w.get("shared") and w.get("match") != "context"]
    if len(usable) < 20: continue
    # omjer jezika iz postojećih (glavni/drugi) za odgovore koji imaju oba
    pairs = sorted(w["views"] / w["alt"]["views"] for c, w in usable if w.get("lang") == lang and (w.get("alt") or {}).get("lang") == other and w["alt"].get("views"))
    ratio = pairs[len(pairs) // 2] if len(pairs) >= 10 else None
    xs = [math.log(w["est"] + 1) for c, w in usable]; ys = [math.log(cur[c]["s"]) for c, w in usable]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    b = max(0.0, sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs))
    ests = sorted((w["est"] for c, w in usable), reverse=True)
    cap = ests[min(4, len(ests) - 1)]  # više pregleda od 5. najgledanijeg postojećeg = vjerojatno krivi članak
    have = {a["c"] for a in old.get(s, [])}
    got = []
    for a in new[s]:
        if a["c"] in have or a["r"]: continue
        names = [a["c"]]
        if len(a["c"]) <= 4 and " " not in a["c"]: continue  # kratka imena često vode na krivi članak
        est = None
        for t in names:
            t = t[:1].upper() + t[1:]
            if t in views[lang]: est = views[lang][t]; break
        if est is None and ratio:
            for t in names:
                t = t[:1].upper() + t[1:]
                if t in views[other]: est = views[other][t] * ratio; break
        if not est or est > cap: continue
        target = math.exp(my + b * (math.log(est + 1) - mx))
        m = math.exp((1 - WEIGHT) * math.log(a["s"]) + WEIGHT * math.log(target))
        m = min(max(m, a["s"] / MAX_DOWN), a["s"] * MAX_UP)
        got.append((a, m, est))
    if not got: continue
    # zbroj novih odgovora ostaje isti: pregledi samo preraspodjeljuju udio među njima
    k = sum(a["s"] for a, m, e in got) / sum(m for a, m, e in got)
    for a, m, est in got:
        v = float(f"{min(max(m * k, a['s'] / MAX_DOWN), a['s'] * MAX_UP):.2g}")
        if v != a["s"]:
            out.setdefault(s, {})[a["c"]] = v; report.append((s, a["c"], a["s"], v, int(est)))
json.dump(out, open(sys.argv[3], "w"), ensure_ascii=False)
print(len(out), "pitanja,", len(report), "odgovora", file=sys.stderr)
for r in sorted(report, key=lambda r: -r[3] / r[2])[:25]: print(r, file=sys.stderr)
