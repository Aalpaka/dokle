// Bez ovih varijabli igra radi anonimno, a prijava je isključena (npr. lokalno bez Supabasea).
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
export const authEnabled = !!(supabaseUrl && supabaseAnonKey);
