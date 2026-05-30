import { getEvents, deleteEvent, toggleEventActive } from "../../events/actions";

export default async function AdminEventsPage() {
  const events = await getEvents();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-white">Events</h1>
          <p className="text-sm text-gray-500 mt-0.5">{events.length} total</p>
        </div>
        <a
          href="/admin/events/new"
          className="bg-opc-orange hover:bg-opc-orange/90 text-white font-semibold text-sm px-4 py-2 rounded-lg transition-colors"
        >
          + Add event
        </a>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Type</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Host</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Spots</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev) => (
              <tr key={ev.id} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                <td className="px-5 py-3 text-white font-medium">
                  {ev.title}
                  {ev.is_elite && <span className="ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">Elite</span>}
                </td>
                <td className="px-4 py-3 text-gray-400">{ev.type}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(ev.event_date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                  {ev.event_time && <span className="block text-gray-600">{ev.event_time}</span>}
                </td>
                <td className="px-4 py-3 text-gray-400">{ev.host}</td>
                <td className="px-4 py-3 text-gray-400">{ev.spots_left}/{ev.spots}</td>
                <td className="px-4 py-3">
                  <form action={toggleEventActive.bind(null, ev.id)}>
                    <button type="submit" className={`text-[10px] font-bold px-2 py-0.5 rounded cursor-pointer transition-colors ${ev.is_active ? "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30" : "bg-gray-700 text-gray-500 hover:bg-gray-600"}`}>
                      {ev.is_active ? "Active" : "Hidden"}
                    </button>
                  </form>
                </td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteEvent.bind(null, ev.id)}>
                    <button type="submit" className="text-xs text-gray-600 hover:text-red-400 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {events.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-600 text-sm mb-3">No events yet.</p>
            <a href="/admin/events/new" className="text-opc-orange text-sm font-semibold hover:underline">+ Add the first event</a>
          </div>
        )}
      </div>
    </div>
  );
}
