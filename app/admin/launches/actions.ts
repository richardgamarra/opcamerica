"use server";

import { revalidatePath } from "next/cache";
import pool from "@/lib/db";

export type AdminLaunch = {
  id: string;
  user_id: string;
  user_name: string;
  user_email: string;
  name: string;
  tagline: string;
  url: string;
  status: string;
  votes: number;
  created_at: string;
};

export async function getLaunches(): Promise<AdminLaunch[]> {
  const result = await pool.query(
    `SELECT l.*, u.name as user_name, u.email as user_email
     FROM launches l
     JOIN users u ON l.user_id = u.id
     ORDER BY l.created_at DESC`
  );
  return result.rows;
}

export async function updateLaunchStatus(id: string, status: string) {
  await pool.query("UPDATE launches SET status = $1 WHERE id = $2", [status, id]);
  revalidatePath("/admin/launches");
}

export async function deleteLaunch(id: string) {
  await pool.query("DELETE FROM launches WHERE id = $1", [id]);
  revalidatePath("/admin/launches");
}
