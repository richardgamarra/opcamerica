"use client";

import { useState } from "react";
import Link from "next/link";
import type { Lang } from "@/lib/i18n";

export function EliteBanner({ lang }: { lang: Lang }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative flex items-center justify-between gap-4 rounded-xl px-5 py-4 mb-6 text-white overflow-hidden"
      style={{ background: "linear-gradient(135deg, #b84a1a 0%, #8a3010 100%)" }}>
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/><line x1="5" y1="20" x2="19" y2="20"/>
          </svg>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold leading-snug flex items-center gap-2 flex-wrap">
            OPC Elite launches soon. Lock in $99 / year for life.
            <span className="bg-white/20 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-wide">50% OFF</span>
          </p>
          <p className="text-xs text-white/70 mt-0.5">
            Free to join the waitlist. No credit card. When we launch, regular price jumps to <s>$199</s>.
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <Link
          href={`/${lang}/join-elite`}
          className="bg-white text-opc-orange font-bold text-sm px-4 py-2 rounded-lg hover:bg-white/90 transition-colors whitespace-nowrap"
        >
          Join Waitlist →
        </Link>
        <button
          onClick={() => setDismissed(true)}
          className="text-white/60 hover:text-white transition-colors"
          aria-label="Dismiss"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
