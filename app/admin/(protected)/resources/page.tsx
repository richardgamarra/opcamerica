import { getResources, deleteResource, toggleResourceActive } from "../../resources/actions";

export default async function AdminResourcesPage() {
  const resources = await getResources();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Resources</h1>
          <p className="text-sm text-gray-500 mt-0.5">{resources.length} total</p>
        </div>
        <a
          href="/admin/resources/new"
          className="bg-opc-orange hover:bg-opc-orange/90 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add resource
        </a>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Resource</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Description</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Tier</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((r) => (
              <tr key={r.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3 text-white font-medium">
                  <span className="mr-2">{r.icon}</span>{r.title}
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs max-w-xs truncate">{r.description}</td>
                <td className="px-4 py-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${r.is_elite ? "bg-amber-500/20 text-amber-400" : "bg-gray-700 text-gray-400"}`}>
                    {r.is_elite ? "Elite" : "Free"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <form action={toggleResourceActive.bind(null, r.id)}>
                    <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${r.is_active ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-gray-700 text-gray-500 hover:bg-gray-600"}`}>
                      {r.is_active ? "Active" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteResource.bind(null, r.id)}>
                    <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {resources.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm mb-3">No resources yet.</p>
            <a href="/admin/resources/new" className="text-opc-orange text-sm font-semibold hover:underline">+ Add the first resource</a>
          </div>
        )}
      </div>
    </div>
  );
}
