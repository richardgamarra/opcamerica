import Link from "next/link";
import { adminLogin } from "./actions";

export default function AdminLoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const hasError = searchParams.error === "1";

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-opc-orange/15 items-center justify-center mb-4">
            <span className="text-opc-orange font-black text-lg">OPC</span>
          </div>
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">OPCAmerica internal access only</p>
        </div>

        <form action={adminLogin} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
          {hasError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2.5 text-sm text-red-400">
              Invalid username or password.
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Username</label>
            <input
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-400 mb-1.5">Password</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors mt-2"
          >
            Sign in to Admin
          </button>
        </form>

        <p className="text-center text-xs text-gray-700 mt-4">
          OPCAmerica · Restricted access
        </p>
        <p className="text-center mt-3">
          <Link href="/en" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
