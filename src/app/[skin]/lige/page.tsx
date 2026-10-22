import { LeaguesPage } from "@/components/Leagues";
import { SkinProvider } from "@/components/skin";
import { skinMetadata, skinOf, skinParams, type SkinParams } from "../skin";

export const dynamicParams = false;
export const generateStaticParams = skinParams;
export const generateMetadata = ({ params }: SkinParams) => skinMetadata(params, "Lige");

export default async function SkinLige({ params }: SkinParams) {
  return (
    <SkinProvider skin={await skinOf(params)}>
      <LeaguesPage />
    </SkinProvider>
  );
}
