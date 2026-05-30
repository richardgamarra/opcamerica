"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";
import { getSession } from "@/lib/auth";

export async function submitLaunch(formData: FormData) {
  const session = await getSession();
  if (!session) return;

  const name = (formData.get("name") as string).trim();
  const tagline = (formData.get("tagline") as string).trim();
  const url = (formData.get("url") as string).trim();

  if (!name || !tagline) return;

  await pool.query(
    "INSERT INTO launches (user_id, name, tagline, url) VALUES ($1, $2, $3, $4)",
    [session.id, name, tagline, url]
  );

  revalidatePath("/en/dashboard/launches");
  revalidatePath("/es/dashboard/launches");
}
