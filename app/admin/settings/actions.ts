"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

export async function getSettings(): Promise<Record<string, string>> {
  const result = await pool.query("SELECT key, value FROM site_settings");
  return Object.fromEntries(result.rows.map((r) => [r.key, r.value]));
}

export async function updateSetting(key: string, value: string) {
  await pool.query(
    "INSERT INTO site_settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2",
    [key, value]
  );
  revalidatePath("/admin/settings");
  revalidatePath("/en/dashboard");
  revalidatePath("/es/dashboard");
}
