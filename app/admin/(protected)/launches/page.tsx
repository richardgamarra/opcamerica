import { getLaunches, deleteLaunch, updateLaunchStatus } from "../../launches/actions";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/20 text-yellow-400",
  approved: "bg-emerald-500/20 text-emerald-400",
  rejected: "bg-red-500/20 text-red-400",
};

export default async function AdminLaunchesPage() {
  const launches = await getLaunches();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Launches</h1>
          <p className="text-sm text-gray-500 mt-0.5">{launches.length} submitted</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Product</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Founder</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Votes</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Submitted</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {launches.map((l) => (
              <tr key={l.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{l.name}</p>
                  <p className="text-xs text-gray-500">{l.tagline}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-300 text-xs">{l.user_name}</p>
                  <p className="text-gray-600 text-xs">{l.user_email}</p>
                </td>
                <td className="px-4 py-3 text-gray-400">{l.votes}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${STATUS_COLORS[l.status] ?? "bg-gray-700 text-gray-400"}`}>
                    {l.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(l.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    {l.status === "pending" && (
                      <>
                        <form action={updateLaunchStatus.bind(null, l.id, "approved")}>
                          <button type="submit" className="text-xs text-emerald-500 hover:text-emerald-300 transition-colors">Approve</button>
                        </form>
                        <form action={updateLaunchStatus.bind(null, l.id, "rejected")}>
                          <button type="submit" className="text-xs text-red-500 hover:text-red-300 transition-colors">Reject</button>
                        </form>
                      </>
                    )}
                    <form action={deleteLaunch.bind(null, l.id)}>
                      <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Delete</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {launches.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm">No launches submitted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
