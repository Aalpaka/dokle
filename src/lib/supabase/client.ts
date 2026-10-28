"use client";
import { createBrowserClient } from "@supabase/ssr";
import { cookieOptions, supabaseAnonKey, supabaseUrl } from "./config";

export function supabaseBrowser() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey, { cookieOptions });
}
