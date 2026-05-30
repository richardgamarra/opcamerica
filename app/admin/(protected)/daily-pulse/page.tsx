import { getPulseItems, deletePulseItem, togglePulseActive } from "../../daily-pulse/actions";

const TYPE_ICON: Record<string, string> = {
  podcast: "🎙",
  ai: "🤖",
  webpage: "📄",
  youtube: "▶️",
};

const TYPE_COLOR: Record<string, string> = {
  podcast: "bg-purple-500/20 text-purple-400",
  ai: "bg-blue-500/20 text-blue-400",
  webpage: "bg-gray-700 text-gray-400",
  youtube: "bg-red-500/20 text-red-400",
};

export default async function AdminDailyPulsePage() {
  const items = await getPulseItems();

  // Group by date for display
  const byDate: Record<string, typeof items> = {};
  for (const item of items) {
    const d = new Date(item.pulse_date).toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric", year: "numeric" });
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(item);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Daily Pulse</h1>
          <p className="text-sm text-gray-500 mt-0.5">{items.length} items across {Object.keys(byDate).length} dates</p>
        </div>
        <a
          href="/admin/daily-pulse/new"
          className="bg-opc-orange hover:bg-opc-orange/90 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add item
        </a>
      </div>

      {Object.keys(byDate).length === 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl py-12 text-center">
          <p className="text-gray-600 text-sm mb-3">No pulse items yet.</p>
          <a href="/admin/daily-pulse/new" className="text-opc-orange text-sm font-semibold hover:underline">+ Add the first item</a>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(byDate).map(([date, dateItems]) => (
          <div key={date}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{date}</p>
            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Type</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Title</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Source</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
                    <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {dateItems.map((item) => (
                    <tr key={item.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                      <td className="px-5 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-flex items-center gap-1 ${TYPE_COLOR[item.type]}`}>
                          {TYPE_ICON[item.type]} {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white font-medium max-w-xs">
                        {item.url ? (
                          <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-opc-orange transition-colors">{item.title}</a>
                        ) : item.title}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{item.source}</td>
                      <td className="px-4 py-3">
                        <form action={togglePulseActive.bind(null, item.id)}>
                          <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${item.is_active ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-gray-700 text-gray-500 hover:bg-gray-600"}`}>
                            {item.is_active ? "Live" : "Hidden"}
                          </button>
                        </form>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <form action={deletePulseItem.bind(null, item.id)}>
                          <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">Delete</button>
                        </form>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
