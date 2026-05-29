# OPCAmerica — Claude Code Project Context

> This file is read automatically by Claude Code at the start of every session.
> Treat it as a living document — update as decisions are made.

---

## 1. Project Identity

**Name:** OPCAmerica  
**Domain:** opcamerica.com (secured)  
**Mission:** The premier bilingual (English & Spanish) One Person Company (OPC) community platform for the Americas — serving solo founders and entrepreneurs from Canada to Argentina.  
**Tagline:** *One Person. One Company. Your Success.*

**OPC = One Person Company** — a solo-founded business built to scale using AI, automation, and digital leverage. OPCAmerica is the home for every OPC founder across the Americas.

OPCAmerica is modeled after opc.community but focused on the Americas with full bilingual EN/ES support from day one.

---

## 2. The 4 Business Pillars

### Pillar 1 — LaunchPad
Accelerators, grants, programs, and deals for OPC founders by country.
- Featured founder products with exclusive member deals and resale codes
- Vote-based discovery (similar to Product Hunt)
- Claim counters creating urgency
- Country-filtered programs (Mexico, Colombia, Chile, USA, Canada, etc.)

### Pillar 2 — Community
A bilingual professional network for OPC founders across the Americas.
- Bilingual forum (English / Spanish)
- Member directory
- Success cases and real-world founder stories
- Weekly newsletter (bilingual)
- Monthly webinars and virtual events

### Pillar 3 — AI Tools
55+ curated AI tools with exclusive member deals and resale codes.
- Organized by category (writing, coding, design, video, email, payments, etc.)
- Member-exclusive deals and discount codes
- Resale code management for members

### Pillar 4 — Consulting
High-ticket services for OPC founders who need expert support.
- OPC implementation consulting
- Enterprise support retainers
- Sponsorship packages for vendors and partners
- MCSP (Member Certified Software Partner) directory

---

## 3. Monetization Model

| Stream | Products | Price Range |
|---|---|---|
| Membership | OPC Elite Annual | $99/yr early bird → $199/yr |
| Courses | OPC founder courses | $49 – $299 |
| LaunchPad | Deal commissions | % per claim |
| AI Tools | Resale codes | Margin on deals |
| Consulting | Implementation + retainer | $500/mo – $25,000/project |
| Sponsorships | Vendor packages | $2,000 – $10,000 |

---

## 4. Bilingual Strategy (CRITICAL — affects all code and content)

### Core rule
Every user-facing element must be available in **English AND Spanish**.

### Technical requirements
- URL structure: `/en/` and `/es/` subdirectories
- `hreflang` tags on ALL pages
- Language toggle in main navigation, persistent via cookie + localStorage
- No auto-redirect based on browser language — let the user choose
- Middleware in `middleware.ts` handles redirect from `/` to `/en/` (or saved preference)

### Content rules
- Write English first, Spanish is native translation (not machine-translated)
- Technical terms that stay in English even in Spanish: AI, OPC, LaunchPad, founder, newsletter, etc.

### Pricing by region
- USD for USA & Canada
- Latam pricing: ~50% of USD (PPP-adjusted)
- Display in local currency where possible (MXN, COP, ARS, CLP)

---

## 5. Target Markets (Priority Order)

1. **USA & Canada** — English primary, enterprise budget
2. **Mexico** — Spanish, first Latam market, manufacturing/tech hub
3. **Colombia, Chile, Argentina** — Spanish, growing OPC/startup ecosystems
4. **Brazil** — Portuguese (Phase 3, Month 15+)

---

## 6. Brand Voice

- Expert but approachable — deep knowledge without jargon
- Americas-wide — never US-centric; the continent is the market
- Bilingual means written natively in both languages, not machine-translated
- Forward-looking — AI, automation, digital leverage are always part of the narrative

### Writing conventions
- Use "OPCAmerica" (one word, camel case)
- Use "One Person Company" or "OPC" — never "solopreneur" (too casual)
- Use "Americas" (not "Latin America + USA")
- Use "founder" not "entrepreneur" in English context
- Colors: #e8522a (OPC orange), #080d14 (dark background)

---

## 7. Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 App Router |
| Styling | Tailwind CSS |
| CMS | Sanity.io (Phase 2) |
| Auth | Clerk (Phase 2) |
| Payments | Stripe |
| AI | Anthropic Claude API |
| Hosting | Vercel |
| Analytics | GA4 + Posthog |
| Email | ConvertKit or Beehiiv |

---

## 8. Key Files

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file — Claude Code persistent context |
| `docs/superpowers/specs/2026-05-29-homepage-design.md` | Homepage design spec |
| `docs/superpowers/plans/2026-05-29-homepage.md` | Homepage implementation plan |
| `lib/i18n/en.ts` | English strings (source of truth) |
| `lib/i18n/es.ts` | Spanish strings |
| `lib/content/` | Static content data (tutorials, AI tools, LaunchPad deals) |
| `components/home/` | Homepage section components |
| `components/layout/` | Nav and Footer |
| `app/[lang]/` | Bilingual route handler |
| `middleware.ts` | Language redirect logic |

---

## 9. Decisions Already Made

- **OPC = One Person Company** (not OPC UA — that is a completely unrelated industrial protocol)
- **Domain:** opcamerica.com — confirmed, secured
- **Language strategy:** Bilingual EN/ES from day one, English-first at launch
- **URL structure:** `/en/` and `/es/` subdirectories
- **Mobile-first:** All components must be fully responsive
- **Headline:** "One Person. One Company. Your Success."
- **Hero:** earth3.png (satellite photo of Americas) as cinematic background
- **Business model:** 4 pillars — LaunchPad, Community, AI Tools, Consulting
- **Pricing:** USD for North America, PPP-adjusted ~50% for Latam
- **Phase approach:** 3 phases — Foundation → Monetization → Scale/AI

---

*Last updated: 2026-05-29 — Homepage implementation complete*
