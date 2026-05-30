"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type PulseItem = {
  id: string;
  type: "podcast" | "ai" | "webpage" | "youtube";
  title: string;
  source: string;
  url: string;
  description: string;
  pulse_date: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export async function getPulseItems(): Promise<PulseItem[]> {
  const result = await pool.query(
    "SELECT * FROM daily_pulse ORDER BY pulse_date DESC, sort_order ASC, created_at DESC"
  );
  return result.rows;
}

export async function createPulseItem(formData: FormData) {
  const type = formData.get("type") as string;
  const title = (formData.get("title") as string).trim();
  const source = (formData.get("source") as string).trim();
  const url = (formData.get("url") as string).trim();
  const description = (formData.get("description") as string).trim();
  const pulse_date = formData.get("pulse_date") as string;

  if (!title || !type || !pulse_date) {
    redirect("/admin/daily-pulse/new?error=validation");
  }

  await pool.query(
    "INSERT INTO daily_pulse (type, title, source, url, description, pulse_date) VALUES ($1,$2,$3,$4,$5,$6)",
    [type, title, source, url, description, pulse_date]
  );

  revalidatePath("/admin/daily-pulse");
  revalidatePath("/en/dashboard/daily-pulse");
  revalidatePath("/es/dashboard/daily-pulse");
  redirect("/admin/daily-pulse");
}

export async function deletePulseItem(id: string) {
  await pool.query("DELETE FROM daily_pulse WHERE id = $1", [id]);
  revalidatePath("/admin/daily-pulse");
  revalidatePath("/en/dashboard/daily-pulse");
  revalidatePath("/es/dashboard/daily-pulse");
}

export async function togglePulseActive(id: string) {
  await pool.query("UPDATE daily_pulse SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/daily-pulse");
  revalidatePath("/en/dashboard/daily-pulse");
  revalidatePath("/es/dashboard/daily-pulse");
}
