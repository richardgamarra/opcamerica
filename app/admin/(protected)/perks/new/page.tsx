import { createPerk } from "../../../perks/actions";

const ERRORS: Record<string, string> = {
  validation: "Fill in required fields: brand, offer, and category.",
};

export default function NewPerkPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/perks" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        Back to perks
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add Perk</h1>

      <form action={createPerk} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Brand *</label>
            <input name="brand" type="text" required placeholder="Notion"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Logo (emoji)</label>
            <input name="logo" type="text" placeholder="📋"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Offer (English) *</label>
            <input name="offer" type="text" required placeholder="6 months Pro free"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Offer (Spanish)</label>
            <input name="offer_es" type="text" placeholder="6 meses Pro gratis"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Category *</label>
            <select name="category" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors">
              <option value="">Select category</option>
              <option value="AI">AI</option>
              <option value="Productivity">Productivity</option>
              <option value="Dev Tools">Dev Tools</option>
              <option value="Design">Design</option>
              <option value="Email">Email</option>
              <option value="Payments">Payments</option>
              <option value="Marketing">Marketing</option>
              <option value="Other">Other</option>
            </select>
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
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Claim URL</label>
            <input name="claim_url" type="url" placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Create perk
          </button>
          <a href="/admin/perks"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
