import { getSettings, updateSetting } from "../../settings/actions";

const SECTIONS = [
  { key: "events", label: "Events" },
  { key: "funding", label: "Funding & Programs" },
  { key: "playbooks", label: "Playbooks" },
  { key: "perks", label: "Perks & Deals" },
  { key: "resources", label: "Resources" },
  { key: "launches", label: "My Launches" },
];

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-bold text-white mb-6">Admin Settings</h1>

      {/* Platform info */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 space-y-3">
        <div>
          <p className="text-sm font-semibold text-white mb-1">Admin credentials</p>
          <p className="text-xs text-gray-500">Username: <span className="text-gray-300 font-mono">admin</span></p>
          <p className="text-xs text-gray-500 mt-1">Password: set in <span className="text-gray-300 font-mono">app/admin/login/actions.ts</span></p>
        </div>
        <div className="pt-3 border-t border-gray-800">
          <p className="text-sm font-semibold text-white mb-1">Admin member account</p>
          <p className="text-xs text-gray-500">Email: <span className="text-gray-300 font-mono">admin@opcamerica.com</span></p>
          <p className="text-xs text-gray-500 mt-1">Use this account to access the LaunchPad as a member from the sign-in page.</p>
        </div>
        <div className="pt-3 border-t border-gray-800">
          <p className="text-sm font-semibold text-white mb-1">Platform</p>
          <div className="space-y-1 text-xs text-gray-500">
            <p>Auth system: <span className="text-emerald-400">PostgreSQL (bcrypt)</span></p>
            <p>Hosting: <span className="text-emerald-400">OVH 192.99.7.220:3900</span></p>
          </div>
        </div>
      </div>

      {/* Section access controls */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <p className="text-sm font-semibold text-white mb-1">LaunchPad section access</p>
        <p className="text-xs text-gray-500 mb-5">Control which sections users can view and post to. Changes take effect immediately.</p>

        <div className="space-y-0">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_80px_80px] gap-2 pb-2 border-b border-gray-800 mb-1">
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider">Section</span>
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider text-center">View</span>
            <span className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider text-center">Post</span>
          </div>

          {SECTIONS.map((s) => {
            const canView = settings[`${s.key}_view`] !== "false";
            const canPost = settings[`${s.key}_post`] !== "false";

            return (
              <div key={s.key} className="grid grid-cols-[1fr_80px_80px] gap-2 py-3 border-b border-gray-800/40 items-center">
                <span className="text-sm text-gray-300">{s.label}</span>

                {/* View toggle */}
                <div className="flex justify-center">
                  <form action={updateSetting.bind(null, `${s.key}_view`, canView ? "false" : "true")}>
                    <button type="submit" className={`w-10 h-5 rounded-full transition-colors relative ${canView ? "bg-emerald-500" : "bg-gray-700"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${canView ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </form>
                </div>

                {/* Post toggle */}
                <div className="flex justify-center">
                  <form action={updateSetting.bind(null, `${s.key}_post`, canPost ? "false" : "true")}>
                    <button type="submit" className={`w-10 h-5 rounded-full transition-colors relative ${canPost ? "bg-emerald-500" : "bg-gray-700"}`}>
                      <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${canPost ? "translate-x-5" : "translate-x-0.5"}`} />
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
