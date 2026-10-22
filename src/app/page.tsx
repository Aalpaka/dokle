import Game from "@/components/Game";
import { SkinProvider } from "@/components/skin";

// naslovnica je uvijek Hrvatska; BiH i Srbija su na /ba i /rs
export default function Home() {
  return (
    <SkinProvider skin="hr">
      <Game />
    </SkinProvider>
  );
}
