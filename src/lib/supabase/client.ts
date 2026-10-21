"use client";
import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey, supabaseUrl } from "./config";

export function supabaseBrowser() {
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
