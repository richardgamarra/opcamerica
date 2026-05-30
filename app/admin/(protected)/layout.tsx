import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminLogout } from "../login/actions";
import { getSession } from "@/lib/auth";

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const isAdminCookie = cookies().get("opc_admin")?.value === "1";
  const session = isAdminCookie ? null : await getSession();
  const isAuthed = isAdminCookie || session?.role === "admin";

  if (!isAuthed) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-950 font-sans">
      {/* Top bar */}
      <header className="h-12 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <span className="text-opc-orange font-black text-sm">OPC</span>
          <span className="text-gray-600 text-sm">/</span>
          <span className="text-gray-300 text-sm font-semibold">Admin</span>
        </div>
        <form action={adminLogout}>
          <button type="submit" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            Sign out
          </button>
        </form>
      </header>

      <div className="flex min-h-[calc(100vh-48px)]">
        {/* Sidebar */}
        <aside className="w-48 bg-gray-900 border-r border-gray-800 flex flex-col py-4">
          <nav className="space-y-0.5 px-3">
            {[
              { label: "Users", href: "/admin/users", icon: "👥" },
              { label: "Daily Pulse", href: "/admin/daily-pulse", icon: "📡" },
              { label: "Events", href: "/admin/events", icon: "📅" },
              { label: "Funding", href: "/admin/funding", icon: "💰" },
              { label: "Launches", href: "/admin/launches", icon: "🚀" },
              { label: "Playbooks", href: "/admin/playbooks", icon: "📖" },
              { label: "Perks", href: "/admin/perks", icon: "🎁" },
              { label: "Claims", href: "/admin/claims", icon: "✅" },
              { label: "Resources", href: "/admin/resources", icon: "📚" },
              { label: "Settings", href: "/admin/settings", icon: "⚙️" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
