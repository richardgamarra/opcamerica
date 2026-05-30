import { getUsers, toggleUserStatus, toggleUserPlan, resetUserPassword } from "../../../users/actions";
import { notFound } from "next/navigation";

export default async function EditUserPage({ params }: { params: { id: string } }) {
  const users = await getUsers();
  const user = users.find((u) => u.id === params.id);
  if (!user) notFound();

  const joined = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  });

  async function handleResetPassword(formData: FormData) {
    "use server";
    const pw = formData.get("newPassword") as string;
    if (pw && pw.length >= 8) await resetUserPassword(user!.id, pw);
  }

  return (
    <div className="max-w-lg">
      <a href="/admin/users" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        ← Back to users
      </a>
      <h1 className="text-xl font-bold text-white mt-4 mb-6">Edit User</h1>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-4 pb-5 border-b border-gray-800">
          <div className="w-12 h-12 rounded-full bg-opc-orange/15 flex items-center justify-center text-opc-orange font-black text-lg">
            {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
          </div>
          <div>
            <p className="font-semibold text-white">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-gray-600 mt-0.5">Joined {joined} · {user.country || "—"}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Plan</p>
            <p className="text-xs text-gray-500 mt-0.5">{user.plan === "elite" ? "OPC Elite member" : "Free plan"}</p>
          </div>
          <form action={toggleUserPlan.bind(null, user.id)}>
            <button type="submit" className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-colors border ${user.plan === "elite" ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-amber-500/30" : "bg-gray-800 text-gray-400 hover:bg-gray-700 border-gray-700"}`}>
              {user.plan === "elite" ? "Revoke Elite" : "Grant Elite"}
            </button>
          </form>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-white">Account status</p>
            <p className="text-xs text-gray-500 mt-0.5">{user.status === "active" ? "User can access the platform" : "User is blocked from signing in"}</p>
          </div>
          <form action={toggleUserStatus.bind(null, user.id)}>
            <button type="submit" className={`text-xs font-bold px-4 py-1.5 rounded-lg transition-colors border ${user.status === "active" ? "bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/20" : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/20"}`}>
              {user.status === "active" ? "Disable account" : "Enable account"}
            </button>
          </form>
        </div>

        <div className="pt-5 border-t border-gray-800">
          <p className="text-sm font-semibold text-white mb-3">Reset password</p>
          <form action={handleResetPassword} className="flex gap-2">
            <input name="newPassword" type="text" placeholder="New password (min 8 chars)" minLength={8} required className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
            <button type="submit" className="bg-gray-700 hover:bg-gray-600 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors whitespace-nowrap">Reset</button>
          </form>
        </div>
      </div>
    </div>
  );
}
