"use server";

import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";

export async function signIn(lang: string, formData: FormData) {
  const email = (formData.get("email") as string).toLowerCase().trim();
  const password = formData.get("password") as string;

  const result = await pool.query(
    "SELECT id, password_hash, status FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  if (!user || !user.password_hash) {
    redirect(`/${lang}/auth/signin?error=invalid`);
  }

  if (user.status === "disabled") {
    redirect(`/${lang}/auth/signin?error=disabled`);
  }

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) {
    redirect(`/${lang}/auth/signin?error=invalid`);
  }

  await createSession(user.id);
  redirect(`/${lang}/dashboard/overview`);
}
