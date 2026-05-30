"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type AdminPerk = {
  id: string;
  brand: string;
  logo: string;
  offer: string;
  offer_es: string;
  category: string;
  claim_url: string;
  is_elite: boolean;
  is_active: boolean;
  created_at: string;
};

export async function getPerks(): Promise<AdminPerk[]> {
  const result = await pool.query("SELECT * FROM perks ORDER BY created_at DESC");
  return result.rows;
}

export async function createPerk(formData: FormData) {
  const brand = (formData.get("brand") as string).trim();
  const logo = (formData.get("logo") as string).trim() || "🎁";
  const offer = (formData.get("offer") as string).trim();
  const offer_es = (formData.get("offer_es") as string).trim();
  const category = (formData.get("category") as string).trim();
  const claim_url = (formData.get("claim_url") as string).trim();
  const is_elite = formData.get("is_elite") === "1";

  if (!brand || !offer || !category) {
    redirect("/admin/perks/new?error=validation");
  }

  await pool.query(
    "INSERT INTO perks (brand, logo, offer, offer_es, category, claim_url, is_elite) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [brand, logo, offer, offer_es, category, claim_url, is_elite]
  );

  revalidatePath("/admin/perks");
  redirect("/admin/perks");
}

export async function deletePerk(id: string) {
  await pool.query("DELETE FROM perks WHERE id = $1", [id]);
  revalidatePath("/admin/perks");
}

export async function togglePerkActive(id: string) {
  await pool.query("UPDATE perks SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/perks");
}
