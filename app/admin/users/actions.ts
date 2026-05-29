"use server";

import { revalidatePath } from "next/cache";
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
