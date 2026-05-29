"use server";

import { revalidatePath } from "next/cache";

export type User = {
  id: string;
  name: string;
  email: string;
  country: string;
  plan: "free" | "elite";
  status: "active" | "disabled";
  joined: string;
};

// In-memory store (replace with DB later)
const USERS: User[] = [
  { id: "1", name: "Rick Gama", email: "rg48351work@gmail.com", country: "MX", plan: "free", status: "active", joined: "2026-05-29" },
];

export async function getUsers(): Promise<User[]> {
  return USERS;
}

export async function toggleUserStatus(id: string) {
  const user = USERS.find((u) => u.id === id);
  if (user) user.status = user.status === "active" ? "disabled" : "active";
  revalidatePath("/admin/users");
}

export async function toggleUserPlan(id: string) {
  const user = USERS.find((u) => u.id === id);
  if (user) user.plan = user.plan === "free" ? "elite" : "free";
  revalidatePath("/admin/users");
}

export async function resetPassword(id: string, newPassword: string) {
  // No-op until real auth — placeholder for Clerk/DB integration
  console.log(`Reset password for user ${id}: ${newPassword}`);
  revalidatePath("/admin/users");
}
