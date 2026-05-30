import { getClaims, deleteClaim } from "../../claims/actions";

export default async function AdminClaimsPage() {
  const claims = await getClaims();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Claims</h1>
          <p className="text-sm text-gray-500 mt-0.5">{claims.length} total</p>
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Perk</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Member</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Claimed</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {claims.map((c) => (
              <tr key={c.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3">
                  <p className="text-white font-medium">{c.perk_brand}</p>
                  <p className="text-xs text-gray-500">{c.perk_offer}</p>
                </td>
                <td className="px-4 py-3">
                  <p className="text-gray-300 text-xs">{c.user_name}</p>
                  <p className="text-gray-600 text-xs">{c.user_email}</p>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(c.claimed_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteClaim.bind(null, c.id)}>
                    <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                      Remove
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {claims.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm">No claims yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
