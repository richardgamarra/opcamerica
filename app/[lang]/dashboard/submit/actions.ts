"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function submitEvent(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const title = (formData.get("title") as string).trim();
  const type = (formData.get("type") as string).trim();
  const event_date = formData.get("event_date") as string;
  const event_time = (formData.get("event_time") as string).trim();
  const host = (formData.get("host") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (!title || !event_date || !type) return;

  await pool.query(
    "INSERT INTO events (title, title_es, type, event_date, event_time, host, spots, spots_left, is_active, url, submitted_by) VALUES ($1,$1,$2,$3,$4,$5,0,0,false,$6,$7)",
    [title, type, event_date, event_time, host, url, session.id]
  );

  revalidatePath("/en/dashboard/events");
  revalidatePath("/es/dashboard/events");
}

export async function submitFunding(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const name = (formData.get("name") as string).trim();
  const type = (formData.get("type") as string).trim();
  const amount = (formData.get("amount") as string).trim();
  const country = (formData.get("country") as string).trim();
  const deadline = (formData.get("deadline") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (!name || !country) return;

  await pool.query(
    "INSERT INTO funding_programs (name, type, amount, country, deadline, tags, url, is_active, submitted_by) VALUES ($1,$2,$3,$4,$5,$6,$7,false,$8)",
    [name, type, amount, country, deadline, [], url, session.id]
  );

  revalidatePath("/en/dashboard/funding");
  revalidatePath("/es/dashboard/funding");
}

export async function submitPlaybook(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const title = (formData.get("title") as string).trim();
  const read_time = (formData.get("read_time") as string).trim();
  const pdfFile = formData.get("pdf") as File | null;

  if (!title) return;

  let pdf_url: string | null = null;
  if (pdfFile && pdfFile.size > 0) {
    const { writeFile, mkdir } = await import("fs/promises");
    const { join } = await import("path");
    const uploadDir = join(process.cwd(), "public", "uploads", "playbooks");
    await mkdir(uploadDir, { recursive: true });
    const ext = pdfFile.name.split(".").pop() || "pdf";
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
    const filename = `${slug}-${Date.now()}.${ext}`;
    const bytes = await pdfFile.arrayBuffer();
    await writeFile(join(uploadDir, filename), Buffer.from(bytes));
    pdf_url = `/uploads/playbooks/${filename}`;
  }

  await pool.query(
    "INSERT INTO playbooks (icon, title, title_es, steps, read_time, is_elite, is_active, submitted_by, pdf_url) VALUES ($1,$2,$2,0,$3,false,false,$4,$5)",
    ["📖", title, read_time, session.id, pdf_url]
  );

  revalidatePath("/en/dashboard/playbooks");
  revalidatePath("/es/dashboard/playbooks");
}

export async function submitResource(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const title = (formData.get("title") as string).trim();
  const description = (formData.get("description") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (!title || !url) return;

  await pool.query(
    "INSERT INTO resources (icon, title, title_es, description, description_es, url, is_elite, is_active, submitted_by) VALUES ($1,$2,$2,$3,$3,$4,false,false,$5)",
    ["📄", title, description, url, session.id]
  );

  revalidatePath("/en/dashboard/resources");
  revalidatePath("/es/dashboard/resources");
}
