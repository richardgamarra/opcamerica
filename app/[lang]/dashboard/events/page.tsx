import { EliteBanner } from "@/components/dashboard/EliteBanner";
import type { Lang } from "@/lib/i18n";

const EVENTS = [
  {
    title: "OPC Weekly Sync",
    type: "Virtual",
    date: "Jun 4, 2026",
    time: "6:00 PM CT",
    host: "OPCAmerica Team",
    spots: 40,
    spotsLeft: 22,
    free: true,
  },
  {
    title: "AI Automation for OPC Founders",
    type: "Webinar",
    date: "Jun 11, 2026",
    time: "5:00 PM CT",
    host: "Rick Gama",
    spots: 100,
    spotsLeft: 67,
    free: true,
  },
  {
    title: "Elite Founders Mastermind",
    type: "Virtual",
    date: "Jun 18, 2026",
    time: "6:00 PM CT",
    host: "OPC Elite",
    spots: 15,
    spotsLeft: 8,
    free: false,
  },
];

const TYPE_COLOR: Record<string, string> = {
  Virtual: "bg-blue-100 text-blue-700",
  Webinar: "bg-purple-100 text-purple-700",
};

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Eventos" : "Events"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Conéctate con founders OPC en tiempo real. Virtual y en persona."
          : "Connect with OPC founders in real-time. Virtual and in-person."}
      </p>

      <div className="space-y-3 mb-6">
        {EVENTS.map((ev) => (
          <div key={ev.title} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all">
            <div className="flex items-start gap-3">
              {/* Date block */}
              <div className="flex-shrink-0 w-12 text-center bg-gray-50 border border-gray-100 rounded-lg py-2">
                <p className="text-[10px] font-bold text-gray-400 uppercase">{ev.date.split(" ")[0]}</p>
                <p className="text-lg font-black text-gray-800 leading-none">{ev.date.split(" ")[1].replace(",", "")}</p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-semibold text-gray-800 text-sm">{ev.title}</span>
                  {!ev.free && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>
                  )}
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[ev.type] ?? "bg-gray-100 text-gray-600"}`}>{ev.type}</span>
                  <span>{ev.time}</span>
                  <span>{isEs ? "Host:" : "Host:"} {ev.host}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-opc-orange h-1.5 rounded-full"
                      style={{ width: `${((ev.spots - ev.spotsLeft) / ev.spots) * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">
                    {ev.spotsLeft} {isEs ? "lugares" : "spots left"}
                  </span>
                </div>
              </div>

              <button className={`flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${
                ev.free
                  ? "bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange"
                  : "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"
              }`}>
                {ev.free ? (isEs ? "Registrarse" : "Register") : (isEs ? "Elite" : "Elite Only")}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-dashed border-gray-200 rounded-xl p-5 text-center text-sm text-gray-400">
        {isEs ? "Más eventos próximamente. Revisa cada semana." : "More events coming soon. Check back weekly."}
      </div>
    </div>
  );
}
