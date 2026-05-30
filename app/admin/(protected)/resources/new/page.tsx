import { createResource } from "../../../resources/actions";

const ERRORS: Record<string, string> = {
  validation: "Title and URL are required.",
};

export default function NewResourcePage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/resources" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        Back to resources
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add Resource</h1>

      <form action={createResource} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Icon (emoji)</label>
            <input name="icon" type="text" placeholder="📄"
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
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (English) *</label>
            <input name="title" type="text" required placeholder="OPC Founder Toolkit"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Title (Spanish)</label>
            <input name="title_es" type="text" placeholder="Kit del Founder OPC"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description (English)</label>
            <textarea name="description" rows={2} placeholder="Essential tools and templates for OPC founders."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Description (Spanish)</label>
            <textarea name="description_es" rows={2} placeholder="Herramientas esenciales para founders OPC."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors resize-none" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">URL *</label>
            <input name="url" type="url" required placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Create resource
          </button>
          <a href="/admin/resources"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
