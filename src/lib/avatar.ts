// Profilne slike: preglednik ih smanji na kvadrat AVATAR_PX (webp, ili jpeg gdje webp ne radi), server prima
// samo male slike poznatog formata i ne vjeruje zaglavlju content-type nego prvim bajtovima.
export const AVATAR_PX = 192;
export const MAX_AVATAR_BYTES = 64 * 1024;
export const AVATAR_KEY_RE = /^[A-Za-z0-9_-]{22}$/;

export function sniffImage(b: Uint8Array): "image/webp" | "image/jpeg" | "image/png" | null {
  const at = (i: number, ...xs: number[]) => xs.every((x, j) => b[i + j] === x);
  if (b.length >= 12 && at(0, 0x52, 0x49, 0x46, 0x46) && at(8, 0x57, 0x45, 0x42, 0x50)) return "image/webp";
  if (b.length >= 3 && at(0, 0xff, 0xd8, 0xff)) return "image/jpeg";
  if (b.length >= 8 && at(0, 0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a)) return "image/png";
  return null;
}

export const avatarUrl = (key: string) => `/api/slika/${key}`;
