"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useT } from "./skin";

/** Dio slike (u pikselima izvorne slike) koji ide u profilnu: kvadrat sa stranicom side. */
export type Crop = { sx: number; sy: number; side: number };

const MAX_ZOOM = 4;

/**
 * Prozor za namještanje profilne slike: slika se povlači (miš ili prst) i zumira (dva prsta, kotačić ili klizač)
 * unutar kvadratnog okvira. Krug pokazuje što se vidi u ligama, a sprema se cijeli kvadrat.
 * Stanje je točka slike u sredini okvira (cx, cy) i zum, pa ne ovisi o veličini okvira na ekranu.
 */
export default function AvatarCrop({ img, busy, onSave, onClose }: { img: HTMLImageElement; busy: boolean; onSave: (c: Crop) => void; onClose: () => void }) {
  const t = useT();
  const w = img.naturalWidth, h = img.naturalHeight, minSide = Math.min(w, h);
  const box = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(0);
  const [view, setView] = useState({ z: 1, cx: w / 2, cy: h / 2 });
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const pinch = useRef<{ dist: number; z: number } | null>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSize(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Okvir uvijek ostaje unutar slike: pola stranice izreza je minSide / (2 * zum).
  const clamp = (z: number, cx: number, cy: number) => {
    z = Math.min(MAX_ZOOM, Math.max(1, z));
    const half = minSide / (2 * z);
    return { z, cx: Math.min(w - half, Math.max(half, cx)), cy: Math.min(h - half, Math.max(half, cy)) };
  };
  const scale = (z: number) => (size / minSide) * z; // pikseli ekrana po pikselu slike

  const zoomTo = (z: number) => setView((v) => clamp(z, v.cx, v.cy));

  const down = (e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    pinch.current = null;
  };
  const move = (e: React.PointerEvent) => {
    const ps = pointers.current;
    const prev = ps.get(e.pointerId);
    if (!prev) return;
    const next = { x: e.clientX, y: e.clientY };
    if (ps.size >= 2) {
      const [a, b] = [...ps.values()];
      const dist = (p: { x: number; y: number }, q: { x: number; y: number }) => Math.hypot(p.x - q.x, p.y - q.y);
      if (!pinch.current) pinch.current = { dist: dist(a, b) || 1, z: view.z };
      ps.set(e.pointerId, next);
      const [a2, b2] = [...ps.values()];
      const p = pinch.current;
      // pomak sredine između prstiju pomiče sliku, razmak između njih zumira
      const dx = ((next.x - prev.x) / 2), dy = ((next.y - prev.y) / 2);
      setView((v) => {
        const s = scale(v.z);
        return clamp(p.z * (dist(a2, b2) / p.dist), v.cx - dx / s, v.cy - dy / s);
      });
      return;
    }
    ps.set(e.pointerId, next);
    setView((v) => {
      const s = scale(v.z);
      return clamp(v.z, v.cx - (next.x - prev.x) / s, v.cy - (next.y - prev.y) / s);
    });
  };
  const up = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    pinch.current = null;
  };

  // kotačić: React ga veže kao pasivan, pa preventDefault mora ići preko pravog slušača
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      setView((v) => clamp(v.z * Math.exp(-e.deltaY / 400), v.cx, v.cy));
    };
    el.addEventListener("wheel", wheel, { passive: false });
    return () => el.removeEventListener("wheel", wheel);
  });

  const s = scale(view.z);
  const key = (e: React.KeyboardEvent) => {
    const step = 10 / (s || 1);
    const moves: Record<string, [number, number]> = { ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step] };
    if (moves[e.key]) {
      e.preventDefault();
      const [dx, dy] = moves[e.key];
      setView((v) => clamp(v.z, v.cx + dx, v.cy + dy));
    } else if (e.key === "+" || e.key === "=") zoomTo(view.z * 1.15);
    else if (e.key === "-") zoomTo(view.z / 1.15);
  };

  const side = minSide / view.z;
  return (
    <Modal title={t("Namjesti sliku")} onClose={onClose} className="narrow crop-modal">
      <p className="small crop-hint">{t("Povuci sliku i zumiraj da lice bude u krugu.")}</p>
      <div
        ref={box}
        className="crop-box"
        tabIndex={0}
        role="application"
        aria-label={t("Namjesti sliku")}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        onKeyDown={key}
      >
        {size > 0 && (
          <img
            src={img.src}
            alt=""
            draggable={false}
            style={{ width: w * s, height: h * s, transform: `translate(${size / 2 - view.cx * s}px, ${size / 2 - view.cy * s}px)` }}
          />
        )}
        <span className="crop-ring" aria-hidden />
      </div>
      <label className="crop-zoom">
        <span aria-hidden>−</span>
        <input
          type="range"
          min={1}
          max={MAX_ZOOM}
          step={0.01}
          value={view.z}
          onChange={(e) => zoomTo(Number(e.target.value))}
          aria-label={t("Zum")}
        />
        <span aria-hidden>+</span>
      </label>
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="ghost small-btn" onClick={onClose} disabled={busy}>{t("Odustani")}</button>
        <button className="small-btn" disabled={busy || !size} onClick={() => onSave({ sx: view.cx - side / 2, sy: view.cy - side / 2, side })}>
          {busy ? t("Šaljem…") : t("Spremi")}
        </button>
      </div>
    </Modal>
  );
}
