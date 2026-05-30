import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AdminRoot() {
  const isAuthed = cookies().get("opc_admin")?.value === "1";
  if (!isAuthed) redirect("/admin/login");
  redirect("/admin/users");
}
