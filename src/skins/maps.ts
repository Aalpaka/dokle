import type { SkinMap } from "./types";
import { hrMap } from "./hr/map";

// karte po skinu; drže se na klijentu jer su veće od ostatka konfiguracije
export const maps: Record<string, SkinMap> = { hr: hrMap };
