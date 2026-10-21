import { adminRoute, body } from "@/server/adminRoute";
import { schedule, setSchedule } from "@/server/admin";

export const GET = adminRoute(async (_req, { skin }) => schedule(skin));
export const POST = adminRoute(async (req, { skin }) => {
  const b = await body<{ date: string; categoryIds: number[] | null }>(req);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(b.date ?? "")) throw new Error("Neispravan datum");
  await setSchedule(skin, b.date, b.categoryIds ?? null);
  return schedule(skin);
});
