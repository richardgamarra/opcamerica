"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function claimPerk(perkId: string) {
  const session = await getSession();
  if (!session) return;

  await pool.query(
    "INSERT INTO claims (user_id, perk_id) VALUES ($1, $2) ON CONFLICT (user_id, perk_id) DO NOTHING",
    [session.id, perkId]
  );

  revalidatePath("/en/dashboard/perks");
  revalidatePath("/es/dashboard/perks");
  revalidatePath("/en/dashboard/claims");
  revalidatePath("/es/dashboard/claims");
}
