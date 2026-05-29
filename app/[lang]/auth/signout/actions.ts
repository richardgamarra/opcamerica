"use server";

import { redirect } from "next/navigation";
import { destroySession } from "@/lib/auth";

export async function signOut(lang: string) {
  await destroySession();
  redirect(`/${lang}/auth/signin`);
}
