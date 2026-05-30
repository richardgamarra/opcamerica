import { createEvent } from "../../../events/actions";

const ERRORS: Record<string, string> = {
  validation: "Fill in required fields: title, type, and date.",
};

export default function NewEventPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/events" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        Back to events
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add Event</h1>

      <form action={createEvent} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (English) *</label>
            <input name="title" type="text" required placeholder="OPC Weekly Sync"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (Spanish)</label>
            <input name="title_es" type="text" placeholder="Sincronizacion Semanal OPC"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Type *</label>
            <select name="type" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors">
              <option value="">Select type</option>
              <option value="Virtual">Virtual</option>
              <option value="Webinar">Webinar</option>
              <option value="In-Person">In-Person</option>
              <option value="Workshop">Workshop</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Date *</label>
            <input name="event_date" type="date" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Time</label>
            <input name="event_time" type="text" placeholder="6:00 PM CT"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Host</label>
            <input name="host" type="text" placeholder="OPCAmerica Team"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Total Spots</label>
            <input name="spots" type="number" defaultValue="50" min="1"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Registration URL</label>
            <input name="url" type="url" placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tier</label>
            <select name="is_elite"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors">
              <option value="0">Free (all members)</option>
              <option value="1">Elite only</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Create event
          </button>
          <a href="/admin/events"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
