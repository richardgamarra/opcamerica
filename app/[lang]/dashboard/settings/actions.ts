"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import pool from "@/lib/db";

export async function updateProfile(formData: FormData) {
  const session = await getSession();
  if (!session) redirect("/en/auth/signin");

  const name = (formData.get("name") as string)?.trim();
  const country = (formData.get("country") as string)?.trim();
  const lang = (formData.get("lang") as string) || "en";

  if (!name) return;

  await pool.query(
    "UPDATE users SET name = $1, country = $2 WHERE id = $3",
    [name, country || null, session.id]
  );

  revalidatePath(`/${lang}/dashboard/settings`);
}
