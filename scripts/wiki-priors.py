# Iz Wikipedia pregleda (dokle/wiki/<slug>.json) računa nove početne udjele i piše
# src/skins/hr/kategorije/wikipedija.ts i migraciju koja ih upisuje u postojeće odgovore.
# Pokretanje: python3 scripts/wiki-priors.py <wiki-dir> <cats.json> <migracija.sql>
# (cats.json = {slug: [{c: kanonski, s: udio, r: helikopter}]} iz hrCategories, prije ove datoteke)
import json, math, sys

wiki_dir, cats_path, sql_path = sys.argv[1:4]
MIN_SPEARMAN = 0.4   # ispod toga pregledi slabo prate ono što ljudi prvo kažu
WEIGHT = 0.4         # udio pregleda u log-mješavini, ostatak je dosadašnja procjena
MAX_UP, MAX_DOWN = 3.0, 2.0  # koliko se jedan odgovor najviše pomiče (krivi članci, domaći ljudi u en pitanjima)
MIN_COVERAGE = 0.6
# obične imenice: pregledi mjere "školske" teme, ne ono što prvo pada na pamet
GENERIC = {"dragi-kamen", "ples", "riba", "pas", "ptica", "zanr", "africka-zivotinja", "mjerna-jedinica",
           "geometrija", "kost", "koktel", "drustvena-igra"}

def sig2(x):
    return float(f"{x:.2g}")

cats = json.load(open(cats_path))
index = json.load(open(f"{wiki_dir}/_index.json"))
out, rows = {}, []
for slug, answers in cats.items():
    ix = index.get(slug)
    if not ix or slug in GENERIC or (ix.get("spearman_share_vs_views") or 0) < MIN_SPEARMAN:
        continue
    wiki = json.load(open(f"{wiki_dir}/{slug}.json"))
    def ok(a):
        w = wiki.get(a["c"])
        # "context" i općine su najčešće krivi članak (Slavonski Brod → Brod, Příbram; Požega → Požega (općina))
        return (not a["r"] and w and w.get("est") and not w.get("suspect") and not w.get("shared")
                and w.get("match") != "context" and "(općina" not in w["title"])
    usable = [a for a in answers if ok(a)]
    est = {a["c"]: wiki[a["c"]]["est"] for a in usable}
    if ix["lang"] == "en":
        # strane teme se mjere en pregledima; domaći pojmovi (Riva, Ružička) tamo su slabi, pa vrijedi i
        # hr broj preračunat na en ljestvicu medijanom omjera unutar pitanja
        pairs = [(w["views"], w["alt"]["views"]) for a in usable if (w := wiki[a["c"]]).get("lang") == "en"
                 and (w.get("alt") or {}).get("lang") == "hr" and w["alt"].get("views")]
        if len(pairs) >= 10:
            ratio = sorted(e / h for e, h in pairs)[len(pairs) // 2]
            for a in usable:
                alt = wiki[a["c"]].get("alt") or {}
                if alt.get("lang") == "hr" and alt.get("views"):
                    est[a["c"]] = max(est[a["c"]], alt["views"] * ratio)
    if usable:
        # obrnuto od "suspect": među 10 najčešćih s pregledima u donjih 10 % je skoro sigurno krivi članak
        low = sorted(est.values())[len(usable) // 10]
        top = sorted((a["s"] for a in usable), reverse=True)[min(9, len(usable) - 1)]
        usable = [a for a in usable if not (a["s"] >= top and est[a["c"]] <= low)]
    if len(usable) < MIN_COVERAGE * len([a for a in answers if not a["r"]]):
        continue
    # log-linearni pravac udjela po pregledima: slaba veza daje plići pravac, pa pregledi manje pomiču
    xs = [math.log(est[a["c"]] + 1) for a in usable]
    ys = [math.log(a["s"]) for a in usable]
    mx, my = sum(xs) / len(xs), sum(ys) / len(ys)
    b = max(0.0, sum((x - mx) * (y - my) for x, y in zip(xs, ys)) / sum((x - mx) ** 2 for x in xs))
    target = {a["c"]: math.exp(my + b * (x - mx)) for a, x in zip(usable, xs)}
    mixed = {a["c"]: (1 - WEIGHT) * math.log(a["s"]) + WEIGHT * math.log(target[a["c"]]) for a in usable}
    # mješavina sužava raspon; vrati joj raspon i zbroj dosadašnjih procjena, da top ostane top, a rep rep
    sd = lambda v: math.sqrt(sum((x - sum(v) / len(v)) ** 2 for x in v) / len(v)) or 1.0
    mm, k = sum(mixed.values()) / len(mixed), sd(ys) / sd(list(mixed.values()))
    mixed = {c: math.exp(my + k * (x - mm)) for c, x in mixed.items()}
    for a in usable:
        mixed[a["c"]] = min(max(mixed[a["c"]], a["s"] / MAX_DOWN), a["s"] * MAX_UP)
    scale = sum(a["s"] for a in usable) / sum(mixed.values())
    changed = {}
    for a in usable:
        s = sig2(mixed[a["c"]] * scale)
        if s != a["s"]:
            changed[a["c"]] = s
            rows.append((slug, a["c"], a["s"], s))
    if changed:
        out[slug] = changed

with open("src/skins/hr/kategorije/wikipedija.ts", "w") as f:
    f.write("// Početni udjeli dorađeni Wikipedia pregledima (12 mjeseci, 2025-10 do 2026-09); generira scripts/wiki-priors.py.\n")
    f.write("// Samo pitanja s imenima (mjesta, ljudi, djela) gdje pregledi prate procjene; helikopteri se ne diraju.\n")
    f.write("export const wikipedija: Record<string, Record<string, number>> = {\n")
    for slug, ch in out.items():
        f.write(f"  {json.dumps(slug)}: {{ " + ", ".join(f"{json.dumps(k, ensure_ascii=False)}: {v}" for k, v in ch.items()) + " },\n")
    f.write("};\n")

def q(s):
    return "'" + s.replace("'", "''") + "'"

with open(sql_path, "w") as f:
    f.write("-- Početni udjeli iz Wikipedia pregleda (vidi src/skins/hr/kategorije/wikipedija.ts).\n")
    f.write("-- Mijenja samo odgovore iz seeda kojima udio nitko nije ručno promijenio.\n")
    f.write('UPDATE "answers" AS a SET "prior_share" = v.new_share FROM "categories" AS c, (VALUES\n')
    f.write(",\n".join(f"({q(s)}, {q(k)}, {o}::real, {n}::real)" for s, k, o, n in rows))
    f.write('\n) AS v(slug, canonical, old_share, new_share)\nWHERE c."skin_id" = \'hr\' AND c."slug" = v.slug AND a."category_id" = c."id" AND a."canonical" = v.canonical\n')
    f.write('  AND a."source" = \'seed\' AND NOT a."rare" AND abs(a."prior_share" - v.old_share) < 0.0001;\n')

print(len(out), "pitanja,", len(rows), "odgovora promijenjeno", file=sys.stderr)
