"use client";

import { useEffect, useRef } from "react";

/** Prozor preko stranice (native dialog: Esc i klik izvan zatvaraju). */
export default function Modal({ title, onClose, children, className = "" }: { title: string; onClose: () => void; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (d && !d.open) d.showModal();
  }, []);
  return (
    <dialog ref={ref} className={"modal " + className} onClose={onClose} onClick={(e) => e.target === ref.current && onClose()} aria-label={title}>
      <div className="stack">
        <div className="row" style={{ justifyContent: "space-between" }}>
          <h2>{title}</h2>
          <button className="ghost small-btn" onClick={onClose} aria-label="Zatvori">✕</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
