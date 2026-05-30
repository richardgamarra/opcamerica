import { createFundingProgram } from "../../../funding/actions";

const ERRORS: Record<string, string> = {
  validation: "Fill in required fields: name, type, and country.",
};

export default function NewFundingPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/funding" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        Back to funding programs
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add Funding Program</h1>

      <form action={createFundingProgram} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Program Name *</label>
            <input name="name" type="text" required placeholder="Y Combinator"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Type *</label>
            <select name="type" required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors">
              <option value="">Select type</option>
              <option value="Accelerator">Accelerator</option>
              <option value="Grant">Grant</option>
              <option value="Fellowship">Fellowship</option>
              <option value="Incubator">Incubator</option>
              <option value="Loan">Loan</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Amount / Value</label>
            <input name="amount" type="text" placeholder="$500,000"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Country *</label>
            <input name="country" type="text" required placeholder="USA"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Deadline</label>
            <input name="deadline" type="text" placeholder="Oct 2026 or Rolling"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Tags (comma separated)</label>
            <input name="tags" type="text" placeholder="equity, remote-ok, latam"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">URL</label>
            <input name="url" type="url" placeholder="https://..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors" />
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button type="submit"
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Create program
          </button>
          <a href="/admin/funding"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
