"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

export type AdminEvent = {
  id: string;
  title: string;
  title_es: string;
  type: string;
  event_date: string;
  event_time: string;
  host: string;
  spots: number;
  spots_left: number;
  is_elite: boolean;
  is_active: boolean;
  url: string;
  created_at: string;
};

export async function getEvents(): Promise<AdminEvent[]> {
  const result = await pool.query(
    "SELECT * FROM events ORDER BY event_date ASC"
  );
  return result.rows;
}

export async function createEvent(formData: FormData) {
  const title = (formData.get("title") as string).trim();
  const title_es = (formData.get("title_es") as string).trim();
  const type = (formData.get("type") as string).trim();
  const event_date = formData.get("event_date") as string;
  const event_time = (formData.get("event_time") as string).trim();
  const host = (formData.get("host") as string).trim();
  const spots = parseInt(formData.get("spots") as string, 10);
  const url = (formData.get("url") as string).trim();
  const is_elite = formData.get("is_elite") === "1";

  if (!title || !event_date || !type) {
    redirect("/admin/events/new?error=validation");
  }

  await pool.query(
    "INSERT INTO events (title, title_es, type, event_date, event_time, host, spots, spots_left, is_elite, url) VALUES ($1,$2,$3,$4,$5,$6,$7,$7,$8,$9)",
    [title, title_es, type, event_date, event_time, host, spots, is_elite, url]
  );

  revalidatePath("/admin/events");
  redirect("/admin/events");
}

export async function deleteEvent(id: string) {
  await pool.query("DELETE FROM events WHERE id = $1", [id]);
  revalidatePath("/admin/events");
}

export async function toggleEventActive(id: string) {
  await pool.query("UPDATE events SET is_active = NOT is_active WHERE id = $1", [id]);
  revalidatePath("/admin/events");
}
