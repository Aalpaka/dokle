import type { Metadata } from "next";
import Game from "@/components/Game";
import { SkinProvider } from "@/components/skin";

export const metadata: Metadata = { alternates: { canonical: "/" } };

// naslovnica je uvijek Hrvatska; BiH i Srbija su na /ba i /rs
export default function Home() {
  return (
    <SkinProvider skin="hr">
      <Game />
    </SkinProvider>
  );
}
