import { createPlaybook } from "../../../playbooks/actions";

const ERRORS: Record<string, string> = {
  validation: "Title is required.",
};

export default function NewPlaybookPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/playbooks" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        Back to playbooks
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add Playbook</h1>

      <form action={createPlaybook} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon (emoji)</label>
            <input name="icon" type="text" placeholder="📖"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Read Time</label>
            <input name="read_time" type="text" placeholder="15 min"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (English) *</label>
            <input name="title" type="text" required placeholder="Build Your First OPC in 30 Days"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (Spanish)</label>
            <input name="title_es" type="text" placeholder="Construye tu OPC en 30 dias"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Number of Steps</label>
            <input name="steps" type="number" defaultValue="10" min="1"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors" />
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
            Create playbook
          </button>
          <a href="/admin/playbooks"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
