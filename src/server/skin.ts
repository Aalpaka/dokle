import "server-only";
import { getSkin } from "./game";

/** Skin za ovaj zahtjev. Zasad iz env varijable; kasnije po domeni (dokle.hr, dokle.ba...). */
export function currentSkin() {
  return getSkin(process.env.DEFAULT_SKIN ?? "hr");
}
