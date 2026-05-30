"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { verifyPassword, createSession } from "@/lib/auth";

export async function signIn(lang: string, formData: FormData) {
  const emailRaw = (formData.get("email") as string).trim();
  const password = formData.get("password") as string;

  // Admin shortcut: username "admin" with admin password goes to admin panel
  if (emailRaw.toLowerCase() === "admin" && password === "OPCAmerica2026!") {
    cookies().set("opc_admin", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });
    redirect("/admin");
  }

  const email = emailRaw.toLowerCase();

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
