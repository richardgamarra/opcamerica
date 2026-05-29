import type { Lang } from "@/lib/i18n";

export default async function SettingsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

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
              RG
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-sm">Rick Gama</p>
              <p className="text-xs text-gray-400">rg48351work@gmail.com</p>
              <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-gray-100 text-gray-500">
                {isEs ? "Plan Gratis" : "Free Plan"}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { label: isEs ? "Nombre" : "Full name", value: "Rick Gama" },
              { label: isEs ? "Correo" : "Email", value: "rg48351work@gmail.com" },
              { label: isEs ? "País" : "Country", value: "Mexico" },
              { label: isEs ? "Sitio web" : "Website", value: "" },
            ].map((field) => (
              <div key={field.label}>
                <label className="text-xs text-gray-400 block mb-1">{field.label}</label>
                <input
                  type="text"
                  defaultValue={field.value}
                  placeholder={field.value ? undefined : (isEs ? "Agregar..." : "Add...")}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:border-gray-300"
                />
              </div>
            ))}
          </div>
          <button className="mt-4 bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-4 py-2 rounded-lg transition-colors">
            {isEs ? "Guardar cambios" : "Save changes"}
          </button>
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
      </div>
    </div>
  );
}
