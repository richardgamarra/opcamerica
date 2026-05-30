import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitEvent } from "../submit/actions";

const TYPE_COLOR: Record<string, string> = {
  Virtual: "bg-blue-100 text-blue-700",
  Webinar: "bg-purple-100 text-purple-700",
  "In-Person": "bg-green-100 text-green-700",
  Workshop: "bg-orange-100 text-orange-700",
};

async function getEvents() {
  const result = await pool.query(
    "SELECT * FROM events WHERE is_active = true ORDER BY event_date ASC"
  );
  return result.rows;
}

export default async function EventsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  const isEs = lang === "es";
  const [events, { canView, canPost }] = await Promise.all([
    getEvents(),
    getSectionSettings("events"),
  ]);

  if (!canView) {
    return (
      <div className="flex items-center justify-center py-24 text-gray-400 text-sm">
        {isEs ? "Esta seccion no esta disponible actualmente." : "This section is not available right now."}
      </div>
    );
  }

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-gray-900 mb-1">
        {isEs ? "Eventos" : "Events"}
      </h1>
      <p className="text-sm text-gray-400 mb-6">
        {isEs
          ? "Conectate con founders OPC en tiempo real. Virtual y en persona."
          : "Connect with OPC founders in real-time. Virtual and in-person."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="bg-white border border-gray-100 rounded-xl p-5 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            {isEs ? "Compartir un evento" : "Share an event"}
          </p>
          <form action={submitEvent} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Nombre del evento" : "Event name"} *</label>
                <input name="title" type="text" required placeholder={isEs ? "Webinar de IA para founders" : "AI webinar for founders"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Tipo" : "Type"} *</label>
                <select name="type" required className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-opc-orange transition-colors">
                  <option value="Virtual">Virtual</option>
                  <option value="Webinar">Webinar</option>
                  <option value="In-Person">{isEs ? "Presencial" : "In-Person"}</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Fecha" : "Date"} *</label>
                <input name="event_date" type="date" required
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">{isEs ? "Hora" : "Time"}</label>
                <input name="event_time" type="text" placeholder="6:00 PM CT"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">Host</label>
                <input name="host" type="text" placeholder={isEs ? "Tu nombre" : "Your name"}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-400 mb-1">URL</label>
                <input name="url" type="url" placeholder="https://..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-opc-orange transition-colors" />
              </div>
            </div>
            <button type="submit" className="bg-opc-orange hover:bg-opc-orange/90 text-white font-bold text-sm px-5 py-2 rounded-lg transition-colors">
              {isEs ? "Enviar para revision" : "Submit for review"}
            </button>
            <ModerationNotice isEs={isEs} />
          </form>
        </div>
      )}

      {events.length > 0 ? (
        <div className="space-y-3 mb-6">
          {events.map((ev) => {
            const dateObj = new Date(ev.event_date);
            const month = dateObj.toLocaleDateString("en-US", { month: "short" });
            const day = dateObj.getDate();
            return (
              <div key={ev.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:border-gray-200 hover:shadow-sm transition-all">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 text-center bg-gray-50 border border-gray-100 rounded-lg py-2">
                    <p className="text-[10px] font-bold text-gray-400 uppercase">{month}</p>
                    <p className="text-lg font-black text-gray-800 leading-none">{day}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-gray-800 text-sm">{isEs && ev.title_es ? ev.title_es : ev.title}</span>
                      {ev.is_elite && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-700">Elite</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-400 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[ev.type] ?? "bg-gray-100 text-gray-600"}`}>{ev.type}</span>
                      {ev.event_time && <span>{ev.event_time}</span>}
                      {ev.host && <span>Host: {ev.host}</span>}
                    </div>
                    {ev.spots > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                          <div className="bg-opc-orange h-1.5 rounded-full" style={{ width: `${((ev.spots - ev.spots_left) / ev.spots) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-gray-400 whitespace-nowrap">{ev.spots_left} {isEs ? "lugares" : "spots left"}</span>
                      </div>
                    )}
                  </div>
                  {ev.url ? (
                    <a href={ev.url} target="_blank" rel="noopener noreferrer"
                      className={`flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${!ev.is_elite ? "bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange" : "bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200"}`}>
                      {!ev.is_elite ? (isEs ? "Registrarse" : "Register") : (isEs ? "Elite" : "Elite Only")}
                    </a>
                  ) : (
                    <span className="flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg bg-gray-100 text-gray-400 whitespace-nowrap">
                      {isEs ? "Proximamente" : "Soon"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-5 text-center text-sm text-gray-400">
          {isEs ? "Mas eventos proximamente." : "More events coming soon. Be the first to share one above."}
        </div>
      )}
    </div>
  );
}
