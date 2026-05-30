"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type AdminPlaybook = {
  id: string;
  icon: string;
  title: string;
  title_es: string;
  steps: number;
  read_time: string;
  is_elite: boolean;
  is_active: boolean;
  created_at: string;
  submitter_name?: string;
};

export async function getPlaybooks(): Promise<AdminPlaybook[]> {
  const result = await pool.query(
    "SELECT pb.*, u.name as submitter_name FROM playbooks pb LEFT JOIN users u ON pb.submitted_by = u.id ORDER BY pb.is_active DESC, pb.created_at DESC"
  );
  return result.rows;
}

export async function approvePlaybook(id: string) {
  await pool.query("UPDATE playbooks SET is_active = true, submitted_by = NULL WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
  revalidatePath("/en/dashboard/playbooks");
  revalidatePath("/es/dashboard/playbooks");
}

export async function rejectPlaybook(id: string) {
  await pool.query("DELETE FROM playbooks WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}

export async function createPlaybook(formData: FormData) {
  const icon = (formData.get("icon") as string).trim() || "📖";
  const title = (formData.get("title") as string).trim();
  const title_es = (formData.get("title_es") as string).trim();
  const steps = parseInt(formData.get("steps") as string, 10) || 0;
  const read_time = (formData.get("read_time") as string).trim();
  const is_elite = formData.get("is_elite") === "1";

  if (!title) {
    redirect("/admin/playbooks/new?error=validation");
  }

  await pool.query(
    "INSERT INTO playbooks (icon, title, title_es, steps, read_time, is_elite) VALUES ($1,$2,$3,$4,$5,$6)",
    [icon, title, title_es, steps, read_time, is_elite]
  );

  revalidatePath("/admin/playbooks");
  redirect("/admin/playbooks");
}

export async function deletePlaybook(id: string) {
  await pool.query("DELETE FROM playbooks WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}

export async function togglePlaybookActive(id: string) {
  await pool.query("UPDATE playbooks SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}
