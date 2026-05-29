"use server";

import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { hashPassword, createSession } from "@/lib/auth";

export async function signUp(lang: string, formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).toLowerCase().trim();
  const password = formData.get("password") as string;
  const country = (formData.get("country") as string) || "";

  if (!name || !email || password.length < 8) {
    redirect(`/${lang}/auth/signup?error=validation`);
  }

  // Check if email already exists
  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    redirect(`/${lang}/auth/signup?error=exists`);
  }

  const passwordHash = await hashPassword(password);

  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash, country) VALUES ($1, $2, $3, $4) RETURNING id",
    [name, email, passwordHash, country]
  );

  await createSession(result.rows[0].id);
  redirect(`/${lang}/dashboard/overview`);
}
