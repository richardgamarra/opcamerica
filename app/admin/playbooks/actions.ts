"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import pool from "@/lib/db";

export type AdminPlaybook = {
  id: string;
  icon: string;
  title: string;
  title_es: string;
  steps: number;
  read_time: string;
  pdf_url: string | null;
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
  const result = await pool.query("SELECT pdf_url FROM playbooks WHERE id = $1", [id]);
  if (result.rows[0]?.pdf_url) {
    const { unlink } = await import("fs/promises");
    await unlink(join(process.cwd(), "public", result.rows[0].pdf_url)).catch(() => {});
  }
  await pool.query("DELETE FROM playbooks WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}

async function savePdf(file: File, prefix: string): Promise<string> {
  const uploadDir = join(process.cwd(), "public", "uploads", "playbooks");
  await mkdir(uploadDir, { recursive: true });
  const ext = file.name.split(".").pop() || "pdf";
  const filename = `${prefix}-${Date.now()}.${ext}`;
  const bytes = await file.arrayBuffer();
  await writeFile(join(uploadDir, filename), Buffer.from(bytes));
  return `/uploads/playbooks/${filename}`;
}

export async function createPlaybook(formData: FormData) {
  const icon = (formData.get("icon") as string).trim() || "📖";
  const title = (formData.get("title") as string).trim();
  const title_es = (formData.get("title_es") as string).trim();
  const steps = parseInt(formData.get("steps") as string, 10) || 0;
  const read_time = (formData.get("read_time") as string).trim();
  const is_elite = formData.get("is_elite") === "1";
  const pdfFile = formData.get("pdf") as File | null;

  if (!title) {
    redirect("/admin/playbooks/new?error=validation");
  }

  let pdf_url: string | null = null;
  if (pdfFile && pdfFile.size > 0) {
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
    pdf_url = await savePdf(pdfFile, slug);
  }

  await pool.query(
    "INSERT INTO playbooks (icon, title, title_es, steps, read_time, is_elite, pdf_url) VALUES ($1,$2,$3,$4,$5,$6,$7)",
    [icon, title, title_es, steps, read_time, is_elite, pdf_url]
  );

  revalidatePath("/admin/playbooks");
  redirect("/admin/playbooks");
}

export async function deletePlaybook(id: string) {
  const result = await pool.query("SELECT pdf_url FROM playbooks WHERE id = $1", [id]);
  if (result.rows[0]?.pdf_url) {
    const { unlink } = await import("fs/promises");
    await unlink(join(process.cwd(), "public", result.rows[0].pdf_url)).catch(() => {});
  }
  await pool.query("DELETE FROM playbooks WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}

export async function togglePlaybookActive(id: string) {
  await pool.query("UPDATE playbooks SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/playbooks");
}
