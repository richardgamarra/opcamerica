"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type AdminResource = {
  id: string;
  icon: string;
  title: string;
  title_es: string;
  description: string;
  description_es: string;
  url: string;
  is_elite: boolean;
  is_active: boolean;
  created_at: string;
};

export async function getResources(): Promise<AdminResource[]> {
  const result = await pool.query("SELECT * FROM resources ORDER BY created_at DESC");
  return result.rows;
}

export async function createResource(formData: FormData) {
  const icon = (formData.get("icon") as string).trim() || "📄";
  const title = (formData.get("title") as string).trim();
  const title_es = (formData.get("title_es") as string).trim();
  const description = (formData.get("description") as string).trim();
  const description_es = (formData.get("description_es") as string).trim();
  const url = (formData.get("url") as string).trim();
  const is_elite = formData.get("is_elite") === "1";

  if (!title || !url) {
    redirect("/admin/resources/new?error=validation");
  }

  await pool.query(
    "INSERT INTO resources (icon, title, title_es, description, description_es, url, is_elite) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [icon, title, title_es, description, description_es, url, is_elite]
  );

  revalidatePath("/admin/resources");
  redirect("/admin/resources");
}

export async function deleteResource(id: string) {
  await pool.query("DELETE FROM resources WHERE id = $1", [id]);
  revalidatePath("/admin/resources");
}

export async function toggleResourceActive(id: string) {
  await pool.query("UPDATE resources SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/resources");
}
