import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export default async function JoinElitePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href={`/${lang}`} className="inline-flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full bg-opc-dark flex items-center justify-center">
              <span className="text-white text-[11px] font-black">OPC</span>
            </span>
            <span className="font-bold text-gray-800 text-sm">OPCAmerica</span>
          </Link>
        </div>

        {/* Hero card */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "linear-gradient(135deg, #b84a1a 0%, #7a2e0e 100%)" }}>
          <div className="px-8 py-10 text-white text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-bold mb-6">
              👑 OPC Elite
              <span className="bg-white text-opc-orange text-[10px] font-black px-2 py-0.5 rounded ml-1">50% OFF</span>
            </div>
            <h1 className="text-3xl font-black mb-3">
              {isEs ? "Lanza, crece y escala tu OPC" : "Launch, grow, and scale your OPC"}
            </h1>
            <p className="text-white/80 text-sm mb-2">
              {isEs
                ? "Precio de lanzamiento: $99/ano. Cuando lancemos sube a $199."
                : "Launch price: $99/year. When we launch, it goes up to $199."}
            </p>
            <p className="text-white/60 text-xs">
              {isEs ? "Sin tarjeta de credito. Cancela cuando quieras." : "No credit card for waitlist. Cancel anytime after launch."}
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 mb-5">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
            {isEs ? "Que incluye Elite" : "What's included"}
          </p>
          <ul className="space-y-3">
            {[
              isEs ? "3 lanzamientos de producto activos" : "3 active product launches",
              isEs ? "Acceso a todos los Playbooks (20+)" : "Access to all Playbooks (20+)",
              isEs ? "Deals exclusivos con socios ($5,000+ en valor)" : "Exclusive partner deals ($5,000+ in value)",
              isEs ? "Eventos privados para miembros Elite" : "Private events for Elite members",
              isEs ? "Prioridad en el feed de LaunchPad" : "Priority placement in the LaunchPad feed",
              isEs ? "Alertas de grants y programas de fondeo" : "Grant and funding program alerts",
              isEs ? "Soporte prioritario" : "Priority support",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-gray-700">
                <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Waitlist form */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
          <h2 className="font-bold text-gray-900 mb-1">
            {isEs ? "Unete a la lista de espera" : "Join the waitlist"}
          </h2>
          <p className="text-xs text-gray-400 mb-4">
            {isEs
              ? "Seras el primero en enterarte cuando lancemos y conservas el precio de $99."
              : "You'll be first to know when we launch and lock in the $99 price."}
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder={isEs ? "tu@correo.com" : "you@email.com"}
              className="flex-1 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors"
            />
            <button className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap">
              {isEs ? "Reservar" : "Reserve spot"}
            </button>
          </div>
          <p className="text-[11px] text-gray-300 mt-3 text-center">
            {isEs ? "Ya tienes cuenta?" : "Already have an account?"}{" "}
            <Link href={`/${lang}/auth/signin`} className="text-opc-orange hover:underline">
              {isEs ? "Inicia sesion" : "Sign in"}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          <Link href={`/${lang}`} className="hover:text-gray-600 transition-colors">
            ← {isEs ? "Volver al inicio" : "Back to home"}
          </Link>
        </p>
      </div>
    </div>
  );
}
