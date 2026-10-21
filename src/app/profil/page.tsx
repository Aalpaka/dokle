import type { Metadata } from "next";
import Profile from "@/components/Profile";

export const metadata: Metadata = { title: "Profil · Dokle?" };

export default function ProfilPage() {
  return <Profile />;
}
