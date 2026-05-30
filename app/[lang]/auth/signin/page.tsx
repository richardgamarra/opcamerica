import Link from "next/link";
import { signIn } from "./actions";
import type { Lang } from "@/lib/i18n";

const ERRORS: Record<string, { en: string; es: string }> = {
  invalid: {
    en: "Email or password is incorrect.",
    es: "Correo o contrasena incorrectos.",
  },
  disabled: {
    en: "Your account has been disabled. Contact support.",
    es: "Tu cuenta ha sido deshabilitada. Contacta soporte.",
  },
};

export default async function SignInPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: { error?: string };
}) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const error = searchParams.error ? ERRORS[searchParams.error] : null;

  const action = signIn.bind(null, lang);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "var(--bg)" }}>
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full bg-opc-orange flex items-center justify-center">
              <span className="text-white text-[11px] font-black">OPC</span>
            </span>
            <span className="font-bold text-[var(--t2)] text-sm">OPCAmerica</span>
          </Link>
          <h1 className="text-xl font-bold text-[var(--t1)]">
            {isEs ? "Iniciar sesion" : "Sign in"}
          </h1>
          <p className="text-sm text-[var(--t3)] mt-1">
            {isEs ? "Bienvenido de vuelta." : "Welcome back."}
          </p>
        </div>

        <form action={action} className="rounded-2xl p-6 space-y-4" style={{ backgroundColor: "var(--card)", border: "1px solid var(--border)" }}>
          {error && (
            <div className="rounded-lg px-4 py-2.5 text-sm text-red-400" style={{ backgroundColor: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)" }}>
              {isEs ? error.es : error.en}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-[var(--t3)] mb-1.5">
              {isEs ? "Correo electronico" : "Email address"}
            </label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm text-[var(--t1)] placeholder:text-[var(--t4)] focus:outline-none transition-colors"
              style={{ backgroundColor: "var(--input)", border: "1px solid var(--border-strong)" }}
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-white/40">
                {isEs ? "Contrasena" : "Password"}
              </label>
              <Link href={`/${lang}/auth/forgot`} className="text-[11px] text-opc-orange hover:underline">
                {isEs ? "Olvide mi contrasena" : "Forgot password?"}
              </Link>
            </div>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full rounded-lg px-3 py-2.5 text-sm text-[var(--t1)] placeholder:text-[var(--t4)] focus:outline-none transition-colors"
              style={{ backgroundColor: "var(--input)", border: "1px solid var(--border-strong)" }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm py-2.5 rounded-lg transition-colors"
          >
            {isEs ? "Entrar" : "Sign in"}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--t3)] mt-5">
          {isEs ? "No tienes cuenta?" : "Don't have an account?"}{" "}
          <Link href={`/${lang}/auth/signup`} className="text-opc-orange font-semibold hover:underline">
            {isEs ? "Registrate gratis" : "Sign up free"}
          </Link>
        </p>

        <p className="text-center mt-4">
          <Link href={`/${lang}`} className="text-xs text-[var(--t4)] hover:text-[var(--t3)] transition-colors">
            ← {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </p>
      </div>
    </div>
  );
}
