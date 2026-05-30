import { EliteBanner } from "@/components/dashboard/EliteBanner";
import { ModerationNotice } from "@/components/dashboard/ModerationNotice";
import type { Lang } from "@/lib/i18n";
import pool from "@/lib/db";
import { getSectionSettings } from "@/lib/settings";
import { submitEvent } from "../submit/actions";

const TYPE_COLOR: Record<string, string> = {
  Virtual: "bg-blue-400/15 text-blue-400",
  Webinar: "bg-purple-400/15 text-purple-400",
  "In-Person": "bg-green-400/15 text-green-400",
  Workshop: "bg-orange-400/15 text-orange-400",
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
      <div className="flex items-center justify-center py-24 text-[var(--t3)] text-sm">
        {isEs ? "Esta seccion no esta disponible actualmente." : "This section is not available right now."}
      </div>
    );
  }

  return (
    <div>
      <EliteBanner lang={lang} />

      <h1 className="text-2xl font-bold text-[var(--t1)] mb-1">
        {isEs ? "Eventos" : "Events"}
      </h1>
      <p className="text-sm text-[var(--t3)] mb-6">
        {isEs
          ? "Conectate con founders OPC en tiempo real. Virtual y en persona."
          : "Connect with OPC founders in real-time. Virtual and in-person."}
      </p>

      {/* Submit form */}
      {canPost && (
        <div className="border rounded-xl p-5 mb-6" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          <p className="text-sm font-semibold text-[var(--t1)] mb-4">
            {isEs ? "Compartir un evento" : "Share an event"}
          </p>
          <form action={submitEvent} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Nombre del evento" : "Event name"} *</label>
                <input name="title" type="text" required placeholder={isEs ? "Webinar de IA para founders" : "AI webinar for founders"}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Tipo" : "Type"} *</label>
                <select name="type" required className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }}>
                  <option value="Virtual">Virtual</option>
                  <option value="Webinar">Webinar</option>
                  <option value="In-Person">{isEs ? "Presencial" : "In-Person"}</option>
                  <option value="Workshop">Workshop</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Fecha" : "Date"} *</label>
                <input name="event_date" type="date" required
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">{isEs ? "Hora" : "Time"}</label>
                <input name="event_time" type="text" placeholder="6:00 PM CT"
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">Host</label>
                <input name="host" type="text" placeholder={isEs ? "Tu nombre" : "Your name"}
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--t3)] mb-1">URL</label>
                <input name="url" type="url" placeholder="https://..."
                  className="w-full rounded-lg px-3 py-2 text-sm text-[var(--t2)] placeholder:text-[var(--t4)] focus:outline-none focus:border-opc-orange transition-colors"
                  style={{ backgroundColor: "var(--input)", border: "1px solid var(--border)" }} />
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
              <div key={ev.id} className="border rounded-xl p-4 hover:border-opc-orange/30 transition-all" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-12 text-center border rounded-lg py-2" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
                    <p className="text-[10px] font-bold text-[var(--t3)] uppercase">{month}</p>
                    <p className="text-lg font-black text-[var(--t1)] leading-none">{day}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <span className="font-semibold text-[var(--t1)] text-sm">{isEs && ev.title_es ? ev.title_es : ev.title}</span>
                      {ev.is_elite && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-400/10 text-amber-400">Elite</span>}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--t3)] flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${TYPE_COLOR[ev.type] ?? "bg-white/10 text-white/55"}`}>{ev.type}</span>
                      {ev.event_time && <span>{ev.event_time}</span>}
                      {ev.host && <span>Host: {ev.host}</span>}
                    </div>
                    {ev.spots > 0 && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 bg-white/10 rounded-full h-1.5">
                          <div className="bg-opc-orange h-1.5 rounded-full" style={{ width: `${((ev.spots - ev.spots_left) / ev.spots) * 100}%` }} />
                        </div>
                        <span className="text-[10px] text-[var(--t3)] whitespace-nowrap">{ev.spots_left} {isEs ? "lugares" : "spots left"}</span>
                      </div>
                    )}
                  </div>
                  {ev.url ? (
                    <a href={ev.url} target="_blank" rel="noopener noreferrer"
                      className={`flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg transition-colors whitespace-nowrap ${!ev.is_elite ? "bg-opc-orange/8 hover:bg-opc-orange/15 text-opc-orange" : "bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 border border-amber-400/40"}`}>
                      {!ev.is_elite ? (isEs ? "Registrarse" : "Register") : (isEs ? "Elite" : "Elite Only")}
                    </a>
                  ) : (
                    <span className="flex-shrink-0 font-semibold text-xs px-3 py-2 rounded-lg bg-white/10 text-white/40 whitespace-nowrap">
                      {isEs ? "Proximamente" : "Soon"}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="border border-dashed rounded-xl p-5 text-center text-sm text-[var(--t3)]" style={{ backgroundColor: "var(--card)", borderColor: "var(--border)" }}>
          {isEs ? "Mas eventos proximamente." : "More events coming soon. Be the first to share one above."}
        </div>
      )}
    </div>
  );
}
