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
      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Configuracion" : "Settings"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs ? "Gestiona tu perfil y preferencias de cuenta." : "Manage your profile and account preferences."}
      </p>

      <div className="space-y-4">
        {/* Profile */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">{isEs ? "Perfil" : "Profile"}</h2>
          <div className="flex items-center gap-4 mb-5">
            <div className="w-14 h-14 rounded-full bg-opc-orange/15 flex items-center justify-center text-opc-orange font-black text-lg">
              {initials}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">{session.name}</p>
              <p className="text-xs text-gray-400">{session.email}</p>
              <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded ${session.plan === "elite" ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                {session.plan === "elite" ? "OPC Elite" : (isEs ? "Plan Gratis" : "Free Plan")}
              </span>
            </div>
          </div>
          <form action={updateProfile}>
            <input type="hidden" name="lang" value={lang} />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-400 block mb-1">{isEs ? "Nombre" : "Full name"}</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={session.name}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-gray-300"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">{isEs ? "Correo" : "Email"}</label>
                <input
                  type="text"
                  value={session.email}
                  disabled
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400 block mb-1">{isEs ? "Pais" : "Country"}</label>
                <input
                  name="country"
                  type="text"
                  defaultValue={session.country || ""}
                  placeholder={isEs ? "Agregar..." : "Add..."}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-300"
                />
              </div>
            </div>
            <button type="submit" className="mt-4 bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
              {isEs ? "Guardar cambios" : "Save changes"}
            </button>
          </form>
        </div>

        {/* Language */}
        <div className="bg-white border border-gray-100 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-800 mb-3">{isEs ? "Idioma" : "Language"}</h2>
          <div className="flex gap-2">
            <a href="/en/dashboard/settings" className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${lang === "en" ? "bg-opc-orange text-white border-opc-orange" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
              English
            </a>
            <a href="/es/dashboard/settings" className={`px-4 py-2 rounded-lg text-sm font-semibold border transition-colors ${lang === "es" ? "bg-opc-orange text-white border-opc-orange" : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
              Español
            </a>
          </div>
        </div>

        {/* Membership */}
        {session.plan !== "elite" && (
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-amber-800 mb-1">{isEs ? "Membresia" : "Membership"}</h2>
            <p className="text-xs text-amber-600 mb-3">
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
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-amber-800 mb-1">{isEs ? "Membresia" : "Membership"}</h2>
            <p className="text-xs text-amber-600">
              {isEs ? "Eres miembro OPC Elite. Gracias por tu apoyo." : "You are an OPC Elite member. Thank you for your support."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
