import { getFundingPrograms, deleteFundingProgram, toggleFundingActive } from "../../funding/actions";

export default async function AdminFundingPage() {
  const programs = await getFundingPrograms();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Funding Programs</h1>
          <p className="text-sm text-gray-500 mt-0.5">{programs.length} total</p>
        </div>
        <a
          href="/admin/funding/new"
          className="bg-opc-orange hover:bg-opc-orange/90 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add program
        </a>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Name</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Amount</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Country</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Deadline</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {programs.map((p) => (
              <tr key={p.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3 text-white font-medium">{p.name}</td>
                <td className="px-4 py-3 text-gray-400">{p.type}</td>
                <td className="px-4 py-3 text-gray-400">{p.amount}</td>
                <td className="px-4 py-3 text-gray-400">{p.country}</td>
                <td className="px-4 py-3 text-gray-400">{p.deadline}</td>
                <td className="px-4 py-3">
                  <form action={toggleFundingActive.bind(null, p.id)}>
                    <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${p.is_active ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-gray-700 text-gray-500 hover:bg-gray-600"}`}>
                      {p.is_active ? "Active" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteFundingProgram.bind(null, p.id)}>
                    <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {programs.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm mb-3">No programs yet.</p>
            <a href="/admin/funding/new" className="text-opc-orange text-sm font-semibold hover:underline">+ Add the first program</a>
          </div>
        )}
      </div>
    </div>
  );
}
