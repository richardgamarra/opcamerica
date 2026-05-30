"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type AdminFunding = {
  id: string;
  name: string;
  type: string;
  amount: string;
  country: string;
  deadline: string;
  tags: string[];
  url: string;
  is_active: boolean;
  created_at: string;
  submitter_name?: string;
};

export async function getFundingPrograms(): Promise<AdminFunding[]> {
  const result = await pool.query(
    "SELECT fp.*, u.name as submitter_name FROM funding_programs fp LEFT JOIN users u ON fp.submitted_by = u.id ORDER BY fp.is_active DESC, fp.created_at DESC"
  );
  return result.rows;
}

export async function approveFunding(id: string) {
  await pool.query("UPDATE funding_programs SET is_active = true, submitted_by = NULL WHERE id = $1", [id]);
  revalidatePath("/admin/funding");
  revalidatePath("/en/dashboard/funding");
  revalidatePath("/es/dashboard/funding");
}

export async function rejectFunding(id: string) {
  await pool.query("DELETE FROM funding_programs WHERE id = $1", [id]);
  revalidatePath("/admin/funding");
}

export async function createFundingProgram(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const type = (formData.get("type") as string).trim();
  const amount = (formData.get("amount") as string).trim();
  const country = (formData.get("country") as string).trim();
  const deadline = (formData.get("deadline") as string).trim();
  const tagsRaw = (formData.get("tags") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (!name || !type || !country) {
    redirect("/admin/funding/new?error=validation");
  }

  const tags = tagsRaw ? tagsRaw.split(",").map((t) => t.trim()).filter(Boolean) : [];

  await pool.query(
    "INSERT INTO funding_programs (name, type, amount, country, deadline, tags, url) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [name, type, amount, country, deadline, tags, url]
  );

  revalidatePath("/admin/funding");
  redirect("/admin/funding");
}

export async function deleteFundingProgram(id: string) {
  await pool.query("DELETE FROM funding_programs WHERE id = $1", [id]);
  revalidatePath("/admin/funding");
}

export async function toggleFundingActive(id: string) {
  await pool.query("UPDATE funding_programs SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/funding");
}
