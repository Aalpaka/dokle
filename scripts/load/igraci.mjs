// Test opterećenja: N igrača u par sekundi odigra cijelu partiju (pregled dok tipka, krivi i točan odgovor, usporedba).
//   node scripts/load/igraci.mjs http://localhost:3100 200 [hr|ba|rs]
// Točne odgovore uzima iz baze (DATABASE_URL), pa radi samo protiv lokalnog servera s istom bazom.
import postgres from "postgres";

const [base = "http://localhost:3100", nArg = "100", skin = "hr"] = process.argv.slice(2);
const N = Number(nArg);
const sql = postgres(process.env.DATABASE_URL ?? "postgres://postgres:postgres@localhost:5432/dokle", { max: 2 });
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));

const stats = new Map(); // ruta -> trajanja u ms
let errors = 0;
async function call(path, init = {}, cookie) {
  const t = performance.now();
  const res = await fetch(base + path, { ...init, headers: { "x-skin": skin, "content-type": "application/json", ...(cookie ? { cookie } : {}) } });
  res.text_ = await res.text().catch(() => "");
  const key = (init.method ?? "GET") + " " + path.split("?")[0];
  if (!stats.has(key)) stats.set(key, []);
  stats.get(key).push(performance.now() - t);
  if (res.status >= 500) errors++;
  return res;
}
const json = (res) => JSON.parse(res.text_);

async function player(i, cats, pool) {
  await call("/api/game");
  const first = await fetch(base + "/api/game/start", { method: "POST", headers: { "x-skin": skin } });
  const cookie = first.headers.get("set-cookie")?.split(";")[0];
  let state = await first.json();
  await call("/api/me", {}, cookie);
  for (let r = 0; r < state.perDay; r++) {
    if (r > 0) state = json(await call("/api/game/start", { method: "POST", body: "{}" }, cookie));
    await sleep((state.current?.waitMs ?? 0) + 100);
    const list = pool.get(cats[r]) ?? [];
    const word = list[(i * 7 + r) % Math.max(1, list.length)] ?? "nesto";
    if (i % 3 === r % 3) await call("/api/game/answer", { method: "POST", body: JSON.stringify({ raw: "qqqq" + i }) }, cookie);
    for (let k = 2; k <= word.length; k += 2) {
      await call("/api/game/preview?q=" + encodeURIComponent(word.slice(0, k)), {}, cookie);
      await sleep(150);
    }
    await call("/api/game/answer", { method: "POST", body: JSON.stringify({ raw: word, final: true }) }, cookie);
  }
  await call("/api/game/compare", {}, cookie);
  await call("/api/game/answers?position=0", {}, cookie);
}

// prvi zahtjev složi dnevnu zagonetku, tek onda kreće navala
await call("/api/game");
const [p] = await sql`select id from daily_puzzles where skin_id = ${skin} order by date desc limit 1`;
const cats = (await sql`select category_id from puzzle_categories where puzzle_id = ${p.id} order by position`).map((r) => r.category_id);
const pool = new Map();
for (const r of await sql`select category_id, canonical from answers where category_id = any(${cats}) order by random()`)
  pool.set(r.category_id, [...(pool.get(r.category_id) ?? []), r.canonical]);
stats.clear();

const t0 = performance.now();
await Promise.all(Array.from({ length: N }, (_, i) => sleep(Math.random() * 5000).then(() => player(i, cats, pool)).catch((e) => (errors++, console.error(e.message)))));
const secs = (performance.now() - t0) / 1000;

const pct = (a, q) => a[Math.min(a.length - 1, Math.floor(q * a.length))];
let total = 0;
console.log(`${N} igrača, ${secs.toFixed(1)} s, greške: ${errors}`);
for (const [k, v] of [...stats].sort()) {
  v.sort((a, b) => a - b);
  total += v.length;
  console.log(`${k.padEnd(28)} n=${String(v.length).padStart(6)}  p50=${pct(v, 0.5).toFixed(0).padStart(5)} ms  p95=${pct(v, 0.95).toFixed(0).padStart(5)} ms  max=${v.at(-1).toFixed(0).padStart(5)} ms`);
}
console.log(`ukupno ${total} API poziva, ${(total / N).toFixed(0)} po partiji, ${(total / secs).toFixed(0)}/s`);
await sql.end();
