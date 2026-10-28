// Bez ovih varijabli igra radi anonimno, a prijava je isključena (npr. lokalno bez Supabasea).
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const authEnabled = !!(supabaseUrl && supabaseAnonKey);
// kolačići sesije (sb-*) u produkciji samo preko HTTPS-a, kao i dokle_pid; lokalno je http://localhost
export const cookieOptions = { secure: process.env.NODE_ENV === "production" };
