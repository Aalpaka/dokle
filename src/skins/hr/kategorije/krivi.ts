// Odgovori koji su se pokazali krivima (provjereno na popisima i infookvirima s Wikipedije). Seed ih više ne dodaje,
// a migracija 0018 ih briše iz baze ako ih još nitko nije dao.
export const krivi: Record<string, string[]> = {
  // nisu na popisu hrvatskih nogometnih reprezentativaca: Hrgović je igrao za BiH, ostali samo za mlađe uzraste
  reprezentativac: ["Mirko Hrgović", "Ivan Kelava", "Oliver Zelenika", "Ante Erceg", "Josip Tadić", "Bartol Franjić", "Domagoj Kosić"],
  // bili su samo u Hajdukovoj omladinskoj školi
  hajduk: ["Martin Baturina", "Nediljko Labrović", "Bernardo Matić", "Gregor Gulišija"],
  // Špehar nikad nije igrao za Dinamo (bio je u NK Zagrebu), ostali samo u Dinamovoj omladinskoj školi
  dinamo: ["Robert Špehar", "Roko Šimić", "David Čolina", "Tomislav Štrkalj", "Branimir Kalaica", "Ivan Pavlica"],
  // nisu bili u olimpijskim momčadima (rukomet 2004. i 2012.), a Huklek je u Tokiju bio peti
  "hr-olimpijac": ["Renato Sulić", "Željko Musa", "Tonči Valčić", "Ivan Huklek"],
};
