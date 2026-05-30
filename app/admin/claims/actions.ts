"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

export type AdminClaim = {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  perk_id: string;
  perk_brand: string;
  perk_offer: string;
  claimed_at: string;
};

export async function getClaims(): Promise<AdminClaim[]> {
  const result = await pool.query(
    `SELECT c.*, u.name as user_name, u.email as user_email, p.brand as perk_brand, p.offer as perk_offer
     FROM claims c
     JOIN users u ON c.user_id = u.id
     JOIN perks p ON c.perk_id = p.id
     ORDER BY c.claimed_at DESC`
  );
  return result.rows;
}

export async function deleteClaim(id: string) {
  await pool.query("DELETE FROM claims WHERE id = $1", [id]);
  revalidatePath("/admin/claims");
}
