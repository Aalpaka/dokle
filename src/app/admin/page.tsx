import type { Metadata } from "next";
import Admin from "@/components/Admin";
import { isSkinId } from "@/skins/meta";

export const metadata: Metadata = { title: "Admin · Dokle?", robots: { index: false } };

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ skin?: string }> }) {
  const { skin } = await searchParams;
  return <Admin skin={isSkinId(skin) ? skin : "hr"} />;
}
