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
  // popis je poravnat s desnim rubom izbornika; kad iza njega ima još gumba (prijava), na mobitelu bi izašao lijevo van ekrana
  const fit = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const ul = e.currentTarget.querySelector("ul");
    if (!ul) return;
    ul.style.translate = "";
    if (!e.currentTarget.open) return;
    const r = ul.getBoundingClientRect(), vw = document.documentElement.clientWidth;
    const dx = Math.max(0, 8 - r.left) - Math.max(0, r.right - (vw - 8));
    if (dx) ul.style.translate = `${dx}px 0`;
  };
  return (
    <details className="skinpick" ref={ref} onToggle={fit}>
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
