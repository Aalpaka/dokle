import type { MetadataRoute } from "next";
import { SKIN_IDS, SKIN_META } from "@/skins/meta";
import { SITE_URL } from "@/lib/site";

// samo naslovnice zemalja, privatnost i uvjeti; lige i profil su osobni i ne trebaju u tražilicu
export default function sitemap(): MetadataRoute.Sitemap {
  const homes = SKIN_IDS.map((id) => ({
    url: SITE_URL + (SKIN_META[id].base || "/"),
    changeFrequency: "daily" as const,
    priority: id === "hr" ? 1 : 0.8,
  }));
  return [...homes, { url: `${SITE_URL}/privatnost`, changeFrequency: "yearly", priority: 0.2 }, { url: `${SITE_URL}/uvjeti`, changeFrequency: "yearly", priority: 0.2 }];
}
