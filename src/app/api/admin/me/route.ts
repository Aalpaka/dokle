import { adminRoute } from "@/server/adminRoute";

export const GET = adminRoute(async (_req, { skin }) => ({ ok: true, skin: { id: skin.id, mirror: skin.config.mirror ?? null, groups: skin.config.groups, perDay: skin.config.dailyPattern.length, tiers: skin.config.tiers.map((t) => ({ name: t.name, emoji: t.emoji, minShare: t.minShare, rare: !!t.rare })), today: new Intl.DateTimeFormat("en-CA", { timeZone: skin.timezone }).format(new Date()) } }));
