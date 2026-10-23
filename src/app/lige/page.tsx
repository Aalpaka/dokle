import type { Metadata } from "next";
import { SkinProvider } from "@/components/skin";
import { LeaguesPage } from "@/components/Leagues";

export const metadata: Metadata = { title: "Lige · Dokle?", robots: { index: false } };

export default function LigePage() {
  return (
    <SkinProvider skin="hr">
      <LeaguesPage />
    </SkinProvider>
  );
}
