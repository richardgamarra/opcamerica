import { createUser } from "../../../users/actions";

const COUNTRIES = [
  { code: "US", label: "United States" },
  { code: "MX", label: "Mexico" },
  { code: "CA", label: "Canada" },
  { code: "CO", label: "Colombia" },
  { code: "CL", label: "Chile" },
  { code: "AR", label: "Argentina" },
  { code: "BR", label: "Brazil" },
  { code: "PE", label: "Peru" },
  { code: "EC", label: "Ecuador" },
  { code: "VE", label: "Venezuela" },
  { code: "OTHER", label: "Other" },
];

const ERRORS: Record<string, string> = {
  validation: "Fill all fields. Password must be at least 8 characters.",
  exists: "An account with that email already exists.",
};

export default function NewUserPage({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  return (
    <div className="max-w-lg">
      <a href="/admin/users" className="text-xs text-gray-500 hover:text-gray-300 transition-colors mb-6 inline-flex items-center gap-1">
        ← Back to users
      </a>

      <h1 className="text-xl font-bold text-white mt-4 mb-6">Add User</h1>

      <form action={createUser} className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-4">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Full name</label>
            <input
              name="name"
              type="text"
              required
              placeholder="Rick Gama"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="user@email.com"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-400 mb-1.5">Password</label>
          <input
            name="password"
            type="text"
            required
            minLength={8}
            placeholder="Minimum 8 characters"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors"
          />
          <p className="text-[11px] text-gray-600 mt-1">Shown as plain text so you can share it with the user.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Country</label>
            <select
              name="country"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors"
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Plan</label>
            <select
              name="plan"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-opc-orange transition-colors"
            >
              <option value="free">Free</option>
              <option value="elite">OPC Elite</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Create user
          </button>
          <a
            href="/admin/users"
            className="bg-gray-800 hover:bg-gray-700 text-gray-300 font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
