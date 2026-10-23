import type { Metadata } from "next";
import { SkinProvider } from "@/components/skin";
import { LeaguePage } from "@/components/Leagues";

export const metadata: Metadata = { title: "Liga · Dokle?", description: "Uđi u ligu i usporedi koliko daleko stigneš s ekipom.", robots: { index: false } };

export default async function LigaPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return (
    <SkinProvider skin="hr">
      <LeaguePage code={code.toUpperCase()} />
    </SkinProvider>
  );
}
