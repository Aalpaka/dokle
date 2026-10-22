"use client";

import { createContext, useContext, useEffect } from "react";
import { SKIN_META, type SkinId, type SkinMeta } from "@/skins/meta";
import { translate } from "@/i18n";

// skin stranice; API ga dobiva u zaglavlju x-skin (vidi skinFetch), a server ga čita u currentSkin()
let active: SkinId = "hr";

const Ctx = createContext<SkinMeta>(SKIN_META.hr);

export function SkinProvider({ skin, children }: { skin: SkinId; children: React.ReactNode }) {
  // postavlja se odmah, prije prvih fetch poziva u efektima djece
  active = skin;
  const meta = SKIN_META[skin];
  useEffect(() => {
    document.documentElement.lang = meta.htmlLang;
  }, [meta.htmlLang]);
  return <Ctx.Provider value={meta}>{children}</Ctx.Provider>;
}

export function useSkin() {
  const meta = useContext(Ctx);
  // putanja unutar skina: "/lige" -> "/ba/lige"
  const href = (path: string) => (path === "/" ? meta.base || "/" : meta.base + path);
  return { ...meta, href };
}

/** Prijevod hrvatskog teksta sučelja na jezik skina; {x} se zamjenjuje iz vars. */
export function useT() {
  const { locale } = useContext(Ctx);
  return (hr: string, vars?: Record<string, string | number>) => translate(locale, hr, vars);
}

/** fetch prema našem API-ju za skin ove stranice. */
export function skinFetch(input: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("x-skin", active);
  return fetch(input, { ...init, headers });
}

export type T = ReturnType<typeof useT>;
