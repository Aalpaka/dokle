import Profile from "@/components/Profile";
import { SkinProvider } from "@/components/skin";
import { skinMetadata, skinOf, skinParams, type SkinParams } from "../skin";

export const dynamicParams = false;
export const generateStaticParams = skinParams;
export const generateMetadata = ({ params }: SkinParams) => skinMetadata(params, "Profil");

export default async function SkinProfil({ params }: SkinParams) {
  return (
    <SkinProvider skin={await skinOf(params)}>
      <Profile />
    </SkinProvider>
  );
}
