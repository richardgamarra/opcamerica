# OPCAmerica Homepage — Design Spec
**Date:** 2026-05-29  
**Status:** Approved

---

## Overview

The OPCAmerica homepage is the primary authority signal and conversion entry point for solo founders across the Americas. It establishes OPCAmerica as the definitive bilingual (EN/ES) community and resource platform for One Person Companies from Canada to Argentina.

**Primary goal:** Authority signal — immediately communicate credibility and value, then guide visitors to join free.

**Layout strategy:** C+A Hybrid — cinematic hero section (visual authority) followed by structured content sections below.

---

## Brand

- **Name:** OPCAmerica
- **OPC meaning:** One Person Company (NOT OPC UA industrial automation)
- **Tagline:** One Person. One Company. Your Success.
- **Primary color:** #e8522a (orange-red)
- **Background:** #080d14 (deep navy/black)
- **Accent text color:** #e8522a italic for headline accent
- **Font:** Georgia serif for headlines; system sans-serif for UI

---

## Navigation

```
[OPC America] | LaunchPad  Tutorials  AI Tools  Community  Consulting | 🌐 EN | ES   Sign in →   [Join Free]
```

- Logo: plain text `OPC<span color=#e8522a>America</span>` — no icon
- Language toggle: globe icon + "EN | ES" pill, persists via localStorage + cookie
- No auto-redirect on language — user always chooses
- On mobile: hamburger menu, language toggle stays visible

---

## Section 1: Cinematic Hero

**Visual:** `earth3.png` (satellite relief photo of the Americas from space) placed as `<img>` on right side, 60% width, vertically centered. Three gradient overlays blend it into the dark background from left.

**Overlays (left to right):**
1. Hard dark: `#080d14` covering ~35% from left
2. Fade: linear-gradient left to right, full opacity → transparent by ~80%
3. Navy tint over image: subtle blue-dark wash for color coherence
4. Bottom fade: 200px gradient to `#080d14` for smooth section transition

**City pins** (positioned over earth image, orange dot + frosted label):
- Toronto, New York (soft white), Mexico City, Bogotá (soft white), São Paulo, Santiago (soft white)

**Copy (left side, max-width 620px):**
```
FOR THE AI-ERA FOUNDER · DE CANADÁ A ARGENTINA       ← eyebrow, all-caps, faded

One Person.
One Company.
Your Success.          ← italic orange

[ONE PERSON COMPANY · OPCAMERICA]                    ← badge

The Americas community for solo founders building
scalable, AI-powered businesses — from Canada to Argentina.

La comunidad de las Américas para fundadores independientes
que construyen negocios escalables con IA.             ← faded italic Spanish

[Join Free →]    [Explore the Community]              ← CTAs

[MX][BR][US][CO][CL][AR]  Meet OPC founders from across the Americas
                           Conoce fundadores OPC de toda América  ← faded
```

---

## Section 2: What is OPC?

White background section, centered, max-width 720px.

- H2: "What is a One Person Company?"
- Body: Explain OPC concept — solo founder, AI-powered, scalable. Americas focus.
- Three stat boxes: `450M+` entrepreneurs in the Americas / `55+` AI tools curated / `EN + ES` bilingual
- Link: "Learn more about our mission →"

---

## Section 3: The 4 Pillars

Full-width dark section. 4 cards in 2×2 grid (desktop), stacked mobile.

| Pillar | Color | Description |
|---|---|---|
| 🚀 LaunchPad | Blue | Accelerators, grants, programs by country. Your OPC growth engine. |
| 👥 Community | Green | Bilingual forum, member network, success stories from Canada to Argentina. |
| 🤖 AI Tools | Purple | 55+ curated AI tools with exclusive member deals and resale codes. |
| 💼 Consulting | Orange | MCSP directory, expert consulting, enterprise OPC implementation support. |

Each card: icon, title, 2-line description, "Explore →" link.

---

## Section 4: Tutorials

Dark section with filter chip bar:
`All | Getting Started | AI Tools | Business | Marketing | Growth | Success Stories`

3-column grid of tutorial cards (title, category chip, read time, language badge EN/ES).

First 3 tutorials published in both EN + ES at launch per BILINGUAL.md strategy.

---

## Section 5: AI Tools Directory

Dark section. Header: "55+ AI Tools, Curated for OPC Founders"

6-card grid preview (Claude, Cursor, Midjourney, Beehiiv, HeyGen, Stripe).
Each card: tool logo, name, category, short description, "Member Deal →" CTA.

"View All 55 Tools →" button links to full directory (member dashboard).

---

## Section 6: LaunchPad Featured Deals

3 featured OPC founder products/deals. Each card:
- Product name + founder country flag
- Description (2 lines)
- Deal box: discount % + claim count remaining
- Vote/upvote count
- "Claim Deal →" CTA (requires free account)

---

## Section 7: Testimonials

3 quotes from OPC founders across the Americas:
- Mexico (manufacturing/AI)
- USA (software/consulting)
- Colombia (digital services)

---

## Section 8: Email Capture / CTA

Dark section, centered:
- Headline: "Start your OPC journey today"
- Subhead (ES): "Comienza tu camino como founder independiente"
- Email input + "Join Free" button
- Two email contacts shown: `support@opcamerica.com` · `consulting@opcamerica.com`

---

## Footer

- Logo + tagline
- Links: LaunchPad / Community / AI Tools / Consulting / Tutorials / About / Privacy / Terms
- Language toggle (EN | ES)
- "© 2026 OPCAmerica. The Americas OPC Community."

---

## Bilingual Implementation

- URL: `/en/` (default) and `/es/`
- `hreflang` tags on every page
- Language stored in localStorage + cookie
- No auto-redirect — user chooses
- Spanish content is native, not translated (OPC technical terms stay in English)
- Email list segmented by language from first signup

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS |
| CMS | Sanity.io (bilingual content) |
| Auth | Clerk |
| Payments | Stripe |
| AI | Anthropic Claude API |
| Hosting | Vercel |
| Analytics | GA4 + Posthog |

---

## Assets

- `earth3.png` — hero background (source: C:/Users/richardgamarra/Desktop/fotosupdate/earth3.png)
  Copy to: `public/images/earth3.png` in Next.js project
- Font: Georgia (system) for headlines, sans-serif for UI
- No external icon library — use inline SVG or emoji for pillar icons

---

## Out of Scope (This Spec)

- Member dashboard (separate spec per tasks #12–#23)
- Auth flows
- Stripe integration
- CMS content population
- AI tools directory (full 55-tool list)
- LaunchPad deal management
