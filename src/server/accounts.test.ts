import { afterAll, describe, expect, it } from "vitest";
import { eq, inArray, like } from "drizzle-orm";
import { db, sql } from "@/db";
import { games, players } from "@/db/schema";
import { ensurePlayer, getSkin, startNext, submitAnswer } from "./game";
import { anonymize, getPlayer, linkAccount, profileFor } from "./accounts";

// Integracijski testovi nad lokalnom bazom (npm run db:migrate && npm run db:seed).
const created: string[] = [];
const newId = () => {
  const id = crypto.randomUUID();
  created.push(id);
  return id;
};
const newPlayer = async () => {
  const id = newId();
  await ensurePlayer(id);
  return id;
};

async function playToday(playerId: string, skinId = "hr") {
  const skin = await getSkin(skinId);
  let state = await startNext(skin, playerId, 0);
  while (state.phase !== "end") {
    const r = await submitAnswer(skin, playerId, "nešto", true);
    if (r.status !== "scored") throw new Error(r.status);
    state = r.state.phase === "end" ? r.state : await startNext(skin, playerId, 0);
  }
  return state;
}

describe.skipIf(!process.env.DATABASE_URL)("računi", () => {
  afterAll(async () => {
    const extra = await db.select({ id: players.id }).from(players).where(like(players.email, "%@example.com"));
    const ids = [...created, ...extra.map((p) => p.id)];
    await db.delete(games).where(inArray(games.playerId, ids));
    await db.delete(players).where(inArray(players.id, ids));
    await sql.end();
  });

  it("prva prijava pretvara anonimnog igrača u račun", async () => {
    const anon = newId();
    await playToday(anon);
    const auth = crypto.randomUUID();
    const id = await linkAccount(anon, auth, "netko@example.com");
    expect(id).toBe(anon);
    const p = await getPlayer(id);
    expect(p?.authUserId).toBe(auth);
    expect(p?.nickname).toMatch(/^Putnik \d{4}$/);
    const { stats, history } = await profileFor(await getSkin("hr"), id);
    expect(stats.played).toBe(1);
    expect(stats.currentStreak).toBe(1);
    expect(history).toHaveLength(1);
  });

  it("anonimna partija druge države nakon prijave ide izvan konkurencije ako je račun taj dan već igrao", async () => {
    const auth = crypto.randomUUID();
    const phone = newId();
    await playToday(phone); // Hrvatska na računu
    const accountId = await linkAccount(phone, auth, "treci@example.com");
    const laptop = newId();
    await playToday(laptop, "rs"); // Srbija anonimno, kasnije istog dana
    await linkAccount(laptop, auth, "treci@example.com");
    const mine = await db.select().from(games).where(eq(games.playerId, accountId));
    expect(mine).toHaveLength(2);
    expect(mine.filter((g) => g.ranked)).toHaveLength(1);
    expect(mine.find((g) => g.ranked)!.startedAt <= mine.find((g) => !g.ranked)!.startedAt).toBe(true);
  });

  it("prijava na drugom uređaju prebacuje anonimne partije, ali ne duplira dan", async () => {
    const auth = crypto.randomUUID();
    const phone = newId();
    await playToday(phone);
    const accountId = await linkAccount(phone, auth, "drugi@example.com");

    // laptop: odigrao isti dan anonimno, pa se prijavio
    const laptop = newId();
    await playToday(laptop);
    const id = await linkAccount(laptop, auth, "drugi@example.com");
    expect(id).toBe(accountId);
    const accountGames = await db.select().from(games).where(eq(games.playerId, accountId));
    expect(accountGames).toHaveLength(1); // današnji dan ostaje s računom
    const laptopGames = await db.select().from(games).where(eq(games.playerId, laptop));
    expect(laptopGames).toHaveLength(1); // duplikat ostaje anonimnom igraču
  });

  it("admin po emailu", async () => {
    process.env.ADMIN_EMAILS = "Sef@Example.com, drugi@x.hr";
    const id = await linkAccount(await newPlayer(), crypto.randomUUID(), "sef@example.com");
    expect((await getPlayer(id))?.role).toBe("admin");
  });

  it("brisanje računa ostavlja anonimnog igrača", async () => {
    const id = await linkAccount(await newPlayer(), crypto.randomUUID(), "brisi@example.com");
    await anonymize(id);
    const p = await getPlayer(id);
    expect(p).toMatchObject({ authUserId: null, email: null, nickname: null });
  });
});
