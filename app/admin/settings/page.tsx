export default function AdminSettingsPage() {
  return (
    <div className="max-w-lg">
      <h1 className="text-xl font-bold text-white mb-6">Admin Settings</h1>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
        <div>
          <p className="text-sm font-semibold text-white mb-1">Admin credentials</p>
          <p className="text-xs text-gray-500">Username: <span className="text-gray-300 font-mono">admin</span></p>
          <p className="text-xs text-gray-500 mt-1">Password is set in <span className="text-gray-300 font-mono">app/admin/login/actions.ts</span></p>
        </div>

        <div className="pt-4 border-t border-gray-800">
          <p className="text-sm font-semibold text-white mb-1">Platform</p>
          <div className="space-y-2 text-xs text-gray-500">
            <p>LaunchPad gating: <span className="text-emerald-400">Open (all users)</span></p>
            <p>Elite gating: <span className="text-gray-400">UI only — no real auth yet</span></p>
            <p>Auth system: <span className="text-gray-400">Planned (Clerk)</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}
