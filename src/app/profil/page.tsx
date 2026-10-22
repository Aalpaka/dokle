import type { Metadata } from "next";
import { SkinProvider } from "@/components/skin";
import Profile from "@/components/Profile";

export const metadata: Metadata = { title: "Profil · Dokle?" };

export default function ProfilPage() {
  return (
    <SkinProvider skin="hr">
      <Profile />
    </SkinProvider>
  );
}
