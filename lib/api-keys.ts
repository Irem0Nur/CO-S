import { supabase } from "./supabase";
import { randomBytes } from "crypto";

export function generateKey(): string {
  return "sk_" + randomBytes(24).toString("hex");
}

export async function createApiKey(userId: string, name: string) {
  const key = generateKey();
  const { data, error } = await supabase
    .from("api_keys")
    .insert({ user_id: userId, key, name })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listApiKeys(userId: string) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("id, name, key, created_at, last_used_at, is_active")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function deleteApiKey(id: string, userId: string) {
  const { error } = await supabase
    .from("api_keys")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  if (error) throw error;
}

export async function validateApiKey(key: string) {
  const { data, error } = await supabase
    .from("api_keys")
    .select("user_id, is_active")
    .eq("key", key)
    .single();
  if (error || !data || !data.is_active) return null;

  // last_used_at güncelle (await etme, gecikmeye neden olmasın)
  supabase
    .from("api_keys")
    .update({ last_used_at: new Date().toISOString() })
    .eq("key", key);

  return data.user_id;
}
