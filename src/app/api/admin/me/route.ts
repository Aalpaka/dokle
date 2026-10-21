import { adminRoute } from "@/server/adminRoute";

export const GET = adminRoute(async (_req, { skin }) => ({ ok: true, skin: { id: skin.id, groups: skin.config.groups, perDay: skin.config.dailyPattern.length, today: new Intl.DateTimeFormat("en-CA", { timeZone: skin.timezone }).format(new Date()) } }));
