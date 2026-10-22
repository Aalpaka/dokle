import type { Metadata } from "next";
import { LeaguesPage } from "@/components/Leagues";

export const metadata: Metadata = { title: "Lige · Dokle?" };

export default function LigePage() {
  return <LeaguesPage />;
}
