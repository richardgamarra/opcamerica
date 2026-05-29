import Link from "next/link";
import { signUp } from "./actions";
import type { Lang } from "@/lib/i18n";

const ERRORS: Record<string, { en: string; es: string }> = {
  validation: {
    en: "Please fill all fields. Password must be at least 8 characters.",
    es: "Completa todos los campos. La contrasena debe tener al menos 8 caracteres.",
  },
  exists: {
    en: "An account with that email already exists.",
    es: "Ya existe una cuenta con ese correo.",
  },
};

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

export default async function SignUpPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: { error?: string };
}) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  const action = signUp.bind(null, lang);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full bg-opc-dark flex items-center justify-center">
              <span className="text-white text-[11px] font-black">OPC</span>
            </span>
            <span className="font-bold text-gray-800 text-sm">OPCAmerica</span>
          </Link>
          <h1 className="text-xl font-bold text-gray-900">
            {isEs ? "Crear cuenta gratis" : "Create your free account"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            {isEs ? "Unete a la comunidad OPC de las Americas." : "Join the OPC community of the Americas."}
          </p>
        </div>

        <form action={action} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-2.5 text-sm text-red-600">
              {isEs ? error.es : error.en}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              {isEs ? "Nombre completo" : "Full name"}
            </label>
            <input
              name="name"
              type="text"
              autoComplete="name"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              {isEs ? "Correo electronico" : "Email address"}
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              {isEs ? "Contrasena" : "Password"}
            </label>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors"
            />
            <p className="text-[11px] text-gray-300 mt-1">
              {isEs ? "Minimo 8 caracteres" : "Minimum 8 characters"}
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">
              {isEs ? "Pais" : "Country"}
            </label>
            <select
              name="country"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-opc-orange transition-colors bg-white"
            >
              <option value="">{isEs ? "Selecciona tu pais" : "Select your country"}</option>
              {COUNTRIES.map((c) => (
                <option key={c.code} value={c.code}>{c.label}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors mt-2"
          >
            {isEs ? "Crear cuenta" : "Create account"}
          </button>

          <p className="text-[11px] text-gray-300 text-center">
            {isEs
              ? "Al registrarte aceptas nuestros terminos de uso."
              : "By signing up you agree to our terms of use."}
          </p>
        </form>

        <p className="text-center text-sm text-gray-400 mt-5">
          {isEs ? "Ya tienes cuenta?" : "Already have an account?"}{" "}
          <Link href={`/${lang}/auth/signin`} className="text-opc-orange font-semibold hover:underline">
            {isEs ? "Iniciar sesion" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
}
