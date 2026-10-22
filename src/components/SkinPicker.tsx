"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SKIN_IDS, SKIN_META, switchPath } from "@/skins/meta";
import { useSkin, useT } from "./skin";

/** Izbornik zemlje u zaglavlju: zastava i kratica, a otvara popis svih zemalja. */
export function SkinPicker() {
  const { id, flag, short } = useSkin();
  const t = useT();
  const path = usePathname();
  const ref = useRef<HTMLDetailsElement>(null);
  // klik izvan izbornika ga zatvara
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) ref.current.open = false;
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);
  return (
    <details className="skinpick" ref={ref}>
      <summary aria-label={t("Zemlja")} title={t("Zemlja")}>
        <span className="flag">{flag}</span><span className="wide">{short}</span>
      </summary>
      <ul>
        {SKIN_IDS.map((s) => (
          <li key={s}>
            <a href={switchPath(path, s)} aria-current={s === id ? "true" : undefined}>
              <span className="flag">{SKIN_META[s].flag}</span>
              <span>{SKIN_META[s].name}</span>
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
