"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_USER = "admin";
const ADMIN_PASS = "OPCAmerica2026!";

export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    cookies().set("opc_admin", "1", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8, // 8 hours
      path: "/",
    });
    redirect("/admin");
  }

  redirect("/admin/login?error=1");
}

export async function adminLogout() {
  cookies().delete("opc_admin");
  redirect("/admin/login");
}
