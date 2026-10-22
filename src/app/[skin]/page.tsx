import Game from "@/components/Game";
import { SkinProvider } from "@/components/skin";
import { skinMetadata, skinOf, skinParams, type SkinParams } from "./skin";

export const dynamicParams = false;
export const generateStaticParams = skinParams;
export const generateMetadata = ({ params }: SkinParams) => skinMetadata(params);

export default async function SkinHome({ params }: SkinParams) {
  return (
    <SkinProvider skin={await skinOf(params)}>
      <Game />
    </SkinProvider>
  );
}
