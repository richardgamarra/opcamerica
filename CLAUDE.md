# OPCAmerica — Claude Code Project Context

> This file is read automatically by Claude Code at the start of every session.
> It contains all strategic, technical, and brand decisions for OPCAmerica.
> Update it as new decisions are made — treat it as a living document.

---

## 1. Project Identity

**Name:** OPCAmerica  
**Domain:** opcamerica.com (secured — .com chosen over .ai and .net for maximum trust and SEO authority)  
**Mission:** The premier bilingual (English & Spanish) OPC resource platform for the Americas — serving industrial automation professionals from Canada to Argentina.  
**Tagline:** *The OPC Resource for the Americas / El recurso OPC para las Américas*

OPCAmerica is the first and only institution dedicated exclusively to OPC (OPC UA and OPC Classic) resources, education, and consulting for the entire American continent, in both English and Spanish.

---

## 2. The 4 Business Pillars

### Pillar 1 — Academy
Tutorials, courses, certifications, and bootcamps on OPC UA and OPC Classic.
- Free introductory content to build audience and SEO
- Paid courses ranging from beginner to advanced
- Official OPCAmerica Certification Program
- Live bootcamps (online, bilingual)

### Pillar 2 — Community
A bilingual professional network for OPC practitioners across the Americas.
- Bilingual forum (English / Spanish)
- Documented success cases and real-world implementation stories
- Network of engineers, integrators, and automation professionals
- Monthly webinars and virtual events

### Pillar 3 — AI Tools
AI-powered tools that differentiate OPCAmerica from all competitors.
- OPC AI Assistant — answers OPC questions in EN and ES
- Automated node diagnostics
- OPC configuration generator
- API for system integrators (pay-per-use token model)
- White-label AI chatbot for enterprise clients ($199/mo)

### Pillar 4 — Consulting & MCSP
High-ticket services for enterprise and industrial clients.
- MCSP (Member Certified Software Partner) program for the Americas
- On-site OPC UA implementations
- Enterprise support retainers
- Sponsorship packages for vendors and industry partners

---

## 3. Monetization Model

| Stream | Products | Price Range |
|---|---|---|
| Courses & Education | Individual courses | $49 – $599 |
| | Annual membership (all access) | $299/year |
| | OPCAmerica Certification | $149 |
| | Live bootcamps | $299 – $599 |
| Skills & Marketplace | OPC UA skill libraries | $29 – $99 |
| | Configuration templates | $19 – $79 |
| | PLC/SCADA plugins | $49 – $149 |
| | Marketplace rev share | 30% commission |
| AI Platform (SaaS) | OPC AI Assistant | $29/mo |
| | Node diagnostics tool | $49/mo |
| | White-label AI chatbot | $199/mo |
| | API (pay-per-use) | Token-based |
| MCSP & Consulting | MCSP certification program | $1,500 – $5,000 |
| | OPC UA on-site implementation | $5,000 – $25,000 |
| | Enterprise support retainer | $500/mo |
| | Sponsorship packages | $2,000 – $10,000 |

---

## 4. Bilingual Strategy (CRITICAL — affects all code and content)

### Core rule
Every user-facing element must be available in **English AND Spanish**.

### Launch approach
- **Phase 1 (Launch):** English-first. Homepage, About, Pricing, and first 3 tutorials in both languages from day one.
- **Phase 2 (Month 2–4):** Full content parity. All courses, YouTube channel in Spanish, Latam pricing tiers.
- **Phase 3 (Month 6+):** Full platform bilingualism. AI assistant in both languages, community forum bilingual, certifications issued in EN & ES. Portuguese roadmap for Brazil.

### Technical bilingual requirements
- Implement `hreflang` tags on ALL pages from day one
- URL structure: `/en/` and `/es/` subdirectories (preferred over subdomains)
- Language toggle in the main navigation, persistent via cookie/localStorage
- No auto-redirect based on browser language — let the user choose
- SEO: treat EN and ES pages as separate indexable content (not duplicate)
- Segment email lists by language preference from the very first signup

### OPC terminology in Spanish
Technical OPC terms are kept in English even within Spanish content. Do NOT translate:
- namespace, node, node ID
- subscription, monitored item
- publish/subscribe
- OPC UA, OPC Classic, OPC DA, OPC AE
- address space
- session, endpoint, certificate

Build and maintain `/context/GLOSSARY.md` as the canonical EN ↔ ES OPC glossary.

### Pricing by region
- USD pricing for USA & Canada
- Latam pricing tiers: approximately 40–60% of USD price (PPP-adjusted)
- Display pricing in local currency where possible (MXN, COP, ARS, CLP)

---

## 5. Target Markets (Priority Order)

### Tier 1 — USA & Canada
- Language: English primary
- Industries: Advanced manufacturing, oil & gas, pharmaceuticals, food & beverage
- Budget: High — enterprise purchasing power
- Strategy: Authority content, MCSP partnerships, enterprise consulting

### Tier 2 — Mexico & Brazil
- Language: Spanish (Mexico), Portuguese (Brazil — future phase)
- Industries: Automotive, heavy industry, agroindustry
- Budget: Medium — large industrial base, growing Industry 4.0 investment
- Strategy: Spanish tutorials, Latam-priced courses, local success cases

### Tier 3 — South America (Colombia, Chile, Argentina, Peru)
- Language: Spanish
- Industries: Mining (Chile), Oil & gas (Colombia), Agriculture (Argentina)
- Budget: Medium — sector-specific enterprise budgets
- Strategy: Industry-specific content, regional partnerships, certifications

---

## 6. Brand Voice & Tone

- **Expert but approachable** — deep technical knowledge without unnecessary jargon
- **Inclusive, not translated** — bilingual means written natively in both languages, not machine-translated
- **Americas-wide** — never US-centric; the continent is the market
- **Industrial authority** — engineers trust precision; never sacrifice accuracy for simplicity
- **Forward-looking** — Industry 4.0, IIoT, AI integration are always part of the narrative

### Writing conventions
- Use "OPC UA" (not "OPC-UA" or "OPCUA")
- Use "Americas" (not "Latin America + USA" — this is one market)
- Capitalize: OPCAmerica, OPC UA, OPC Classic, MCSP, Industry 4.0
- Avoid: "LATAM" (too corporate/cold) — prefer "Latin America" or region names

---

## 7. Launch Roadmap

### Phase 1 — Foundation (Months 1–3)
- [ ] Website live at opcamerica.com (bilingual homepage)
- [ ] 10 free tutorials published (EN + ES)
- [ ] Weekly bilingual newsletter launched
- [ ] LinkedIn company page + YouTube channel created
- [ ] 3 real-world success cases documented
- [ ] Coming-soon email capture (segment by language)

### Phase 2 — Monetization & Community (Months 4–8)
- [ ] First premium course launched (EN + ES)
- [ ] Pro membership activated ($299/yr)
- [ ] Community forum online
- [ ] Monthly paid webinars
- [ ] First 3 MCSP clients signed
- [ ] OPC EN↔ES Glossary published
- [ ] Latam pricing tiers activated

### Phase 3 — Scale & AI (Months 9–18)
- [ ] OPC AI Assistant platform launched (SaaS)
- [ ] Official OPCAmerica Certification issued
- [ ] Skills marketplace open to contributors
- [ ] OPC Foundation partnership initiated
- [ ] Annual OPC Americas Conference planned
- [ ] Portuguese (Brazil) content roadmap started

---

## 8. Key Files in This Repository

| File | Purpose |
|---|---|
| `CLAUDE.md` | This file — Claude Code persistent context |
| `context/PROJECT.md` | Full business blueprint and strategic detail |
| `context/MONETIZATION.md` | Detailed revenue streams, pricing, and financial model |
| `context/ROADMAP.md` | Detailed phase-by-phase execution plan |
| `context/GLOSSARY.md` | OPC technical glossary EN ↔ ES (to be built) |
| `context/MARKETS.md` | Country-by-country market analysis (to be built) |

---

## 9. Decisions Already Made

- **Domain:** opcamerica.com — confirmed, secured
- **Language strategy:** Bilingual EN/ES from day one, English-first at launch
- **Business model:** 4 revenue streams (courses, marketplace, AI SaaS, consulting)
- **URL structure:** `/en/` and `/es/` subdirectories
- **OPC terms:** Always in English, even in Spanish content
- **Pricing:** USD for North America, PPP-adjusted tiers for Latam
- **Phase approach:** 3 phases over 18 months

---

*Last updated: Initial project setup from OPCAmerica strategy session*
