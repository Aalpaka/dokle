import type { Metadata } from "next";
import { LeaguePage } from "@/components/Leagues";

export const metadata: Metadata = { title: "Liga · Dokle?", description: "Uđi u ligu i usporedi koliko daleko stigneš s ekipom." };

export default async function LigaPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <LeaguePage code={code.toUpperCase()} />;
}
