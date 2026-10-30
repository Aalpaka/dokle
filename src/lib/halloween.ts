// Noć vještica: posebna tema samo 31. 10., od ponoći do ponoći po zagrebačkom vremenu.
// Prije toga se može pogledati s ?halloween=1 (pamti se do zatvaranja kartice), ?halloween=0 je gasi.

export const HALLOWEEN_KEY = "dokle-halloween";

const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Zagreb", month: "2-digit", day: "2-digit" });

/** Je li u Zagrebu 31. listopada. */
export function isHalloweenDay(now = new Date()): boolean {
  return day.format(now) === "10-31";
}

/** Pregled prije datuma: ?halloween=1 uključi, ?halloween=0 isključi; pamti se u sessionStorage. */
export function halloweenPreview(search: string, storage: Pick<Storage, "getItem" | "setItem" | "removeItem"> | null): boolean {
  const q = new URLSearchParams(search).get("halloween");
  if (!storage) return q === "1";
  try {
    if (q === "1") storage.setItem(HALLOWEEN_KEY, "1");
    if (q === "0") storage.removeItem(HALLOWEEN_KEY);
    return storage.getItem(HALLOWEEN_KEY) === "1";
  } catch {
    return q === "1";
  }
}

/**
 * Isto kao isHalloweenDay + halloweenPreview, ali kao mala skripta u <head>: postavi html[data-theme]
 * prije prvog crtanja, pa boje ne bljesnu iz obične teme u halloweensku.
 */
export const HALLOWEEN_SCRIPT = `(function(){var on=false,q=null;try{q=new URLSearchParams(location.search).get("halloween")}catch(e){}
try{var s=sessionStorage;if(q==="1")s.setItem("${HALLOWEEN_KEY}","1");if(q==="0")s.removeItem("${HALLOWEEN_KEY}");on=s.getItem("${HALLOWEEN_KEY}")==="1"}catch(e){on=q==="1"}
try{if(new Intl.DateTimeFormat("en-CA",{timeZone:"Europe/Zagreb",month:"2-digit",day:"2-digit"}).format(new Date())==="10-31")on=true}catch(e){}
if(on)document.documentElement.setAttribute("data-theme","halloween")})()`;
