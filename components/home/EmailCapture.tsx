"use client";

import { useState } from "react";
import type { Translations } from "@/lib/i18n";

interface Props {
  t: Translations["emailCapture"];
}

export function EmailCapture({ t }: Props) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) setSubmitted(true);
  }

  return (
    <section className="bg-opc-dark py-16 md:py-24 px-5 md:px-6 border-t border-white/5">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">{t.heading}</h2>
        <p className="font-sans text-sm md:text-base text-white/40 italic mb-8 md:mb-10">{t.subEs}</p>

        {submitted ? (
          <p className="font-sans text-opc-orange text-lg font-bold">Welcome to OPCAmerica! 🎉</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8 md:mb-10">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.placeholder}
              required
              className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 font-sans text-white placeholder-white/30 focus:outline-none focus:border-opc-orange/50"
            />
            <button
              type="submit"
              className="bg-opc-orange text-white font-sans font-bold px-6 md:px-7 py-3 rounded-lg hover:bg-opc-orange/90 transition-colors whitespace-nowrap"
            >
              {t.cta}
            </button>
          </form>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 font-sans text-xs text-white/30">
          <a href={`mailto:${t.support}`} className="hover:text-white/60">{t.support}</a>
          <a href={`mailto:${t.consulting}`} className="hover:text-white/60">{t.consulting}</a>
        </div>
      </div>
    </section>
  );
}
