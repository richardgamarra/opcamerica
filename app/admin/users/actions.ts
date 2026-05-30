"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/auth";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  country: string;
  plan: "free" | "elite";
  status: "active" | "disabled";
  created_at: string;
};

export async function getUsers(): Promise<AdminUser[]> {
  const result = await pool.query(
    "SELECT id, name, email, country, plan, status, created_at FROM users ORDER BY created_at DESC"
  );
  return result.rows;
}

export async function toggleUserStatus(id: string) {
  await pool.query(
    "UPDATE users SET status = CASE WHEN status = 'active' THEN 'disabled' ELSE 'active' END WHERE id = $1",
    [id]
  );
  revalidatePath("/admin/users");
}

export async function toggleUserPlan(id: string) {
  await pool.query(
    "UPDATE users SET plan = CASE WHEN plan = 'free' THEN 'elite' ELSE 'free' END WHERE id = $1",
    [id]
  );
  revalidatePath("/admin/users");
}

export async function resetUserPassword(id: string, newPassword: string) {
  const hash = await hashPassword(newPassword);
  await pool.query("UPDATE users SET password_hash = $1 WHERE id = $2", [hash, id]);
  revalidatePath("/admin/users");
}

export async function createUser(formData: FormData) {
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).toLowerCase().trim();
  const password = formData.get("password") as string;
  const country = (formData.get("country") as string) || "";
  const plan = (formData.get("plan") as string) === "elite" ? "elite" : "free";

  if (!name || !email || password.length < 8) {
    redirect("/admin/users/new?error=validation");
  }

  const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
  if (existing.rows.length > 0) {
    redirect("/admin/users/new?error=exists");
  }

  const hash = await hashPassword(password);
  await pool.query(
    "INSERT INTO users (name, email, password_hash, country, plan) VALUES ($1, $2, $3, $4, $5)",
    [name, email, hash, country, plan]
  );

  revalidatePath("/admin/users");
  redirect("/admin/users");
}

export async function deleteUser(id: string) {
  await pool.query("DELETE FROM users WHERE id = $1", [id]);
  revalidatePath("/admin/users");
}
