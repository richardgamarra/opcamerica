import type { Lang } from "@/lib/i18n";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateProfile } from "./actions";

export default async function SettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const session = await getSession();
  if (!session) redirect(`/${lang}/auth/signin`);

  const initials = session.name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--t1)] mb-1">
        {isEs ? "Configuracion" : "Settings"}
      </h1>
      <p className="text-sm text-[var(--t3)] mb-6">
        {isEs ? "Gestiona tu perfil y preferencias de cuenta." : "Manage your profile and account preferences."}
      </p>

      <div className="space-y-4">
        {/* Profile */}
        <div className="border rounded-xl p-5" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold text-[var(--t1)] mb-4">{isEs ? "Perfil" : "Profile"}</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-full bg-opc-orange/15 flex items-center justify-center text-opc-orange font-black text-lg">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-[var(--t1)] text-sm">{session.name}</p>
              <p className="text-xs text-[var(--t3)]">{session.email}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${session.plan === "elite" ? "bg-amber-400/10 text-amber-400" : "bg-white/10 text-white/40"}`}>
                {session.plan === "elite" ? "OPC Elite" : (isEs ? "Plan Gratis" : "Free Plan")}
              </span>
            </div>
          </div>
          <form action={updateProfile}>
            <input type="hidden" name="lang" value={lang} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-[var(--t3)] block mb-1">{isEs ? "Nombre" : "Full name"}</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={session.name}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] focus:outline-none transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }}
                />
              </div>
              <div>
                <label className="text-xs text-[var(--t3)] block mb-1">{isEs ? "Correo" : "Email"}</label>
                <input
                  type="text"
                  value={session.email}
                  disabled
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t4)] cursor-not-allowed"
                  style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}
                />
              </div>
              <div>
                <label className="text-xs text-[var(--t3)] block mb-1">{isEs ? "Pais" : "Country"}</label>
                <input
                  name="country"
                  type="text"
                  defaultValue={session.country || ""}
                  placeholder={isEs ? "Agregar..." : "Add..."}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }}
                />
              </div>
            </div>
            <button type="submit" className="mt-4 bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
              {isEs ? "Guardar cambios" : "Save changes"}
            </button>
          </form>
        </div>

        {/* Language */}
        <div className="border rounded-xl p-5" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <h2 className="text-sm font-semibold text-[var(--t1)] mb-3">{isEs ? "Idioma" : "Language"}</h2>
          <div className="flex gap-2">
            <a href="/en/dashboard/settings" className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${lang === "en" ? "bg-opc-orange text-white border-opc-orange" : "text-[var(--t3)] hover:text-[var(--t2)]"}`}
              style={lang !== "en" ? { backgroundColor: "var(--card)", borderColor: "var(--border)" } : {}}>
              English
            </a>
            <a href="/es/dashboard/settings" className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${lang === "es" ? "bg-opc-orange text-white border-opc-orange" : "text-[var(--t3)] hover:text-[var(--t2)]"}`}
              style={lang !== "es" ? { backgroundColor: "var(--card)", borderColor: "var(--border)" } : {}}>
              Español
            </a>
          </div>
        </div>

        {/* Membership */}
        {session.plan !== "elite" && (
          <div className="border rounded-xl p-5" style={{ backgroundColor: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
            <h2 className="text-sm font-semibold text-amber-400 mb-1">{isEs ? "Membresia" : "Membership"}</h2>
            <p className="text-xs text-amber-400/70 mb-3">
              {isEs
                ? "Actualmente en Plan Gratis. Upgrade a OPC Elite para desbloquear todo."
                : "Currently on Free Plan. Upgrade to OPC Elite to unlock everything."}
            </p>
            <a
              href={`/${lang}/join-elite`}
              className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors"
            >
              {isEs ? "Unirse a Elite ($99/ano)" : "Join Elite ($99/year)"}
            </a>
          </div>
        )}

        {session.plan === "elite" && (
          <div className="border rounded-xl p-5" style={{ backgroundColor: "rgba(245,158,11,0.06)", borderColor: "rgba(245,158,11,0.2)" }}>
            <h2 className="text-sm font-semibold text-amber-400 mb-1">{isEs ? "Membresia" : "Membership"}</h2>
            <p className="text-xs text-amber-400/70">
              {isEs ? "Eres miembro OPC Elite. Gracias por tu apoyo." : "You are an OPC Elite member. Thank you for your support."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
