import { getUsers, toggleUserStatus, toggleUserPlan, deleteUser } from "../../users/actions";

export default async function AdminUsersPage() {
  const users = await getUsers();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Users</h1>
          <p className="text-sm text-gray-500 mt-0.5">{users.length} registered</p>
        </div>
        <a
          href="/admin/users/new"
          className="bg-opc-orange hover:bg-opc-orange/90 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add user
        </a>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total users", value: users.length },
          { label: "Elite members", value: users.filter((u) => u.plan === "elite").length },
          { label: "Disabled", value: users.filter((u) => u.status === "disabled").length },
        ].map((s) => (
          <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl px-5 py-4">
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Name</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Email</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Country</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Plan</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Joined</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3 text-white font-medium">{user.name}</td>
                <td className="px-5 py-3 text-gray-400">{user.email}</td>
                <td className="px-4 py-3 text-gray-400">{user.country || "—"}</td>
                <td className="px-4 py-3">
                  <form action={toggleUserPlan.bind(null, user.id)}>
                    <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${user.plan === "elite" ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}>
                      {user.plan === "elite" ? "Elite" : "Free"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleUserStatus.bind(null, user.id)}>
                    <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${user.status === "active" ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-red-500/20 text-red-400 hover:bg-red-500/30"}`}>
                      {user.status === "active" ? "Active" : "Disabled"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a href={`/admin/users/${user.id}`} className="text-xs text-gray-500 hover:text-opc-orange transition-colors">
                      Edit
                    </a>
                    <form action={deleteUser.bind(null, user.id)}>
                      <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {users.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm mb-3">No users yet.</p>
            <a href="/admin/users/new" className="text-opc-orange text-sm font-semibold hover:underline">+ Add the first user</a>
          </div>
        )}
      </div>
    </div>
  );
}
