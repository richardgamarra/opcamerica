export interface AITool {
  name: string;
  category: string;
  description: string;
  url: string;
  price: string;
  logoEmoji: string;
  isRecommended?: boolean;
  inCoreStack?: boolean;
}

export const AI_TOOLS: AITool[] = [
  // AI Models
  { name: "Claude", category: "AI Models", description: "Best-in-class reasoning and long-context AI. The go-to for writing, analysis, strategy, and coding — used by top OPC founders daily.", url: "https://claude.ai", price: "Free–$20/mo", logoEmoji: "🧠", isRecommended: true, inCoreStack: true },
  { name: "ChatGPT", category: "AI Models", description: "The world's most-used AI assistant. Great all-rounder for content, research, and quick tasks across any area of your business.", url: "https://chat.openai.com", price: "Free–$20/mo", logoEmoji: "💬", inCoreStack: true },
  { name: "Perplexity", category: "AI Models", description: "AI-powered research with real-time citations. Replaces hours of Googling — ask it anything about your market, competitors, or industry.", url: "https://perplexity.ai", price: "Free–$20/mo", logoEmoji: "🔍", isRecommended: true, inCoreStack: true },
  { name: "Gemini", category: "AI Models", description: "Google's multimodal AI with deep Workspace integration. Ideal if you live in Google Docs, Sheets, or Gmail.", url: "https://gemini.google.com", price: "Free–$20/mo", logoEmoji: "✨" },
  { name: "DeepSeek", category: "AI Models", description: "Open-source AI model with API pricing 10–50× cheaper than alternatives. Smart choice for high-volume automation on a lean budget.", url: "https://deepseek.com", price: "Free / API", logoEmoji: "🐋" },
  { name: "Kimi", category: "AI Models", description: "Handles massive documents with ease thanks to industry-leading context windows. Paste an entire contract, report, or research paper and ask anything.", url: "https://kimi.moonshot.cn", price: "Free", logoEmoji: "📄" },

  // AI Agents
  { name: "Manus", category: "AI Agents", description: "Autonomous AI agent that handles multi-step tasks end-to-end — research, writing, browsing, and even deploying to a sandbox environment.", url: "https://manus.im", price: "Free (300 credits/day)", logoEmoji: "🤖", isRecommended: true },
  { name: "Genspark", category: "AI Agents", description: "Super agent that handles presentations, video creation, and research tasks in one place. Your virtual generalist for client-facing deliverables.", url: "https://genspark.ai", price: "Free–$25/mo", logoEmoji: "⚡" },
  { name: "Replit Agent", category: "AI Agents", description: "Full-stack AI agent that builds, deploys, and hosts apps from plain-English prompts. Ship MVPs without touching a terminal.", url: "https://replit.com", price: "Free–$25/mo", logoEmoji: "🚀" },

  // Coding & Dev
  { name: "Claude Code", category: "Coding & Dev", description: "Terminal-based AI agent for serious engineering work. Handles large refactors, complex codebases, and full feature builds autonomously.", url: "https://claude.ai/code", price: "$20/mo", logoEmoji: "💻", isRecommended: true, inCoreStack: true },
  { name: "Cursor", category: "Coding & Dev", description: "AI-native code editor with deep understanding of your entire codebase. Write, refactor, and debug faster than any traditional IDE.", url: "https://cursor.sh", price: "$20/mo", logoEmoji: "⌨️", inCoreStack: true },
  { name: "Windsurf", category: "Coding & Dev", description: "AI-first IDE with agentic coding flows. Handles multi-file edits and context-aware completions — a strong alternative to Cursor.", url: "https://windsurf.com", price: "Free–$15/mo", logoEmoji: "🏄" },
  { name: "Lovable", category: "Coding & Dev", description: "The most beginner-friendly full-stack AI app builder. Describe what you want and get a working, deployable app — no coding required.", url: "https://lovable.dev", price: "Free–$25/mo", logoEmoji: "❤️", isRecommended: true },
  { name: "Bolt.new", category: "Coding & Dev", description: "Go from idea to full-stack app in a single prompt. Comes with unlimited databases and one-click deployment built in.", url: "https://bolt.new", price: "Free–$20/mo", logoEmoji: "⚡" },
  { name: "v0", category: "Coding & Dev", description: "Vercel's AI UI component generator. Describe a screen or interface and get production-ready React/Next.js code instantly.", url: "https://v0.dev", price: "Free–$20/mo", logoEmoji: "🎛️" },
  { name: "Supabase", category: "Coding & Dev", description: "Open-source Firebase alternative for your app backend. Database, auth, storage, and real-time — all with a generous free tier.", url: "https://supabase.com", price: "Free–$25/mo", logoEmoji: "🗄️", inCoreStack: true },
  { name: "Vercel", category: "Coding & Dev", description: "Deploy frontend and full-stack apps with zero config. Instant global CDN, previews on every push, and the best Next.js experience available.", url: "https://vercel.com", price: "Free–$20/mo", logoEmoji: "▲", inCoreStack: true },
  { name: "GitHub Copilot", category: "Coding & Dev", description: "AI inline code completion integrated across all major editors. Reduces boilerplate and catches errors as you type.", url: "https://github.com/features/copilot", price: "$10/mo", logoEmoji: "🐙" },
  { name: "Trae", category: "Coding & Dev", description: "ByteDance's free AI-native IDE with builder mode. Solid free alternative for founders who want AI coding without a subscription.", url: "https://trae.ai", price: "Free", logoEmoji: "🔧" },

  // Design
  { name: "Midjourney", category: "Design", description: "Industry-leading AI image generation for visual assets, brand visuals, and marketing content. Outputs look genuinely professional.", url: "https://midjourney.com", price: "$10–$30/mo", logoEmoji: "🎨", isRecommended: true, inCoreStack: true },
  { name: "Canva AI", category: "Design", description: "All-in-one design tool for non-designers. Create social posts, pitch decks, thumbnails, and marketing graphics in minutes.", url: "https://canva.com", price: "Free–$13/mo", logoEmoji: "🖼️", inCoreStack: true },
  { name: "Figma AI", category: "Design", description: "The standard UI design tool, now with powerful AI features for auto-layout, component generation, and design-to-code exports.", url: "https://figma.com", price: "Free–$15/mo", logoEmoji: "📐" },
  { name: "Lovart", category: "Design", description: "The world's first AI Design Agent — collaborates with you on branding, visual identity, and graphic design like a creative partner.", url: "https://lovart.ai", price: "$10–$30/mo", logoEmoji: "🎭", isRecommended: true },
  { name: "Framer", category: "Design", description: "Design and publish stunning websites with AI assistance. No-code, fast, and produces beautiful results without a developer.", url: "https://framer.com", price: "Free–$20/mo", logoEmoji: "🖥️" },
  { name: "Adobe Firefly", category: "Design", description: "Professional AI image editing and generation integrated across the Adobe Creative Suite. Best for founders already in the Adobe ecosystem.", url: "https://firefly.adobe.com", price: "$23/mo (CC)", logoEmoji: "🔥" },

  // Video
  { name: "HeyGen", category: "Video", description: "Create professional AI avatar videos in 40+ languages. Replace expensive spokesperson shoots with studio-quality video output.", url: "https://heygen.com", price: "$24/mo", logoEmoji: "🎬", isRecommended: true, inCoreStack: true },
  { name: "Descript", category: "Video", description: "Edit video and podcasts by editing a text transcript. Cut filler words, clone your voice, and publish — all in one tool.", url: "https://descript.com", price: "$24/mo", logoEmoji: "✂️", inCoreStack: true },
  { name: "Kling", category: "Video", description: "Generate up to 2 minutes of high-quality AI video from text or images. Great for product demos and social content.", url: "https://klingai.com", price: "Free–$10/mo", logoEmoji: "🎥" },
  { name: "Runway Gen-4", category: "Video", description: "Cinematic-quality AI video generation with professional creative controls. The tool of choice for high-production video content.", url: "https://runwayml.com", price: "$12–$28/mo", logoEmoji: "🎞️" },
  { name: "Pika", category: "Video", description: "Creative AI video with physics-based animations. Turn still images into motion content and create eye-catching social clips.", url: "https://pika.art", price: "Free–$10/mo", logoEmoji: "✨" },

  // Voice & Audio
  { name: "ElevenLabs", category: "Voice & Audio", description: "Industry-leading AI voice platform with realistic voice cloning. Narrate courses, podcasts, and videos in your own voice — or a custom one.", url: "https://elevenlabs.io", price: "$5–$22/mo", logoEmoji: "🎙️", isRecommended: true, inCoreStack: true },
  { name: "Otter.ai", category: "Voice & Audio", description: "Automatic meeting transcription with summaries and action items. Never take manual notes again — works with Zoom, Meet, and Teams.", url: "https://otter.ai", price: "Free–$17/mo", logoEmoji: "📝", inCoreStack: true },
  { name: "NotebookLM", category: "Voice & Audio", description: "Google's tool that turns research papers, PDFs, and documents into conversational audio summaries. Learn while you commute.", url: "https://notebooklm.google.com", price: "Free", logoEmoji: "📓" },

  // Marketing
  { name: "Buffer", category: "Marketing", description: "Social media scheduling and analytics with AI caption suggestions. Plan a week of content in under an hour.", url: "https://buffer.com", price: "Free–$6/mo", logoEmoji: "📱", inCoreStack: true },

  // SEO & GEO
  { name: "SealSEO", category: "SEO & GEO", description: "Full keyword research and backlink data at a fraction of Ahrefs pricing. Same insights, radically cheaper — built for lean founders.", url: "https://sealseo.com", price: "$20/mo", logoEmoji: "🔑", isRecommended: true, inCoreStack: true },
  { name: "Frase", category: "SEO & GEO", description: "AI content optimization for both traditional SEO and AI search (GEO). Write briefs, optimize content, and rank faster.", url: "https://frase.io", price: "$15/mo", logoEmoji: "📊", inCoreStack: true },
  { name: "AthenaHQ", category: "SEO & GEO", description: "Track your visibility across AI search engines like ChatGPT, Perplexity, and Gemini. The first tool built for the GEO era.", url: "https://athenahq.ai", price: "$49/mo", logoEmoji: "🏛️" },

  // Email & Newsletter
  { name: "Beehiiv", category: "Email & Newsletter", description: "Newsletter platform built for growth with 0% revenue share. Monetize with ads, paid subscriptions, and boosts from day one.", url: "https://beehiiv.com", price: "Free–$42/mo", logoEmoji: "🐝", isRecommended: true, inCoreStack: true },
  { name: "Kit", category: "Email & Newsletter", description: "Email-first operating system for creators. Powerful automations, sequences, and segmentation without the enterprise complexity.", url: "https://kit.com", price: "Free–$25/mo", logoEmoji: "📨", inCoreStack: true },

  // Customer Support
  { name: "Crisp", category: "Customer Support", description: "All-in-one messaging platform with AI chatbot and shared inbox. Handle support across chat, email, and socials from one place.", url: "https://crisp.chat", price: "Free–$25/mo", logoEmoji: "💬", isRecommended: true, inCoreStack: true },
  { name: "Intercom Fin", category: "Customer Support", description: "AI customer support agent that resolves tickets using your knowledge base. Handles the repetitive questions so you don't have to.", url: "https://intercom.com", price: "$29/mo+", logoEmoji: "🎧" },

  // Sales & Payments
  { name: "Stripe", category: "Sales & Payments", description: "Default payment infrastructure for digital products and SaaS. Accept cards, subscriptions, and invoices from customers across the Americas.", url: "https://stripe.com", price: "2.9% + $0.30", logoEmoji: "💳", isRecommended: true, inCoreStack: true },
  { name: "LemonSqueezy", category: "Sales & Payments", description: "Merchant of record for digital products — handles VAT, sales tax, and global compliance automatically. Sell globally without a tax headache.", url: "https://lemonsqueezy.com", price: "5% + $0.50", logoEmoji: "🍋", inCoreStack: true },
  { name: "Clay", category: "Sales & Payments", description: "AI lead research and enrichment from 75+ data sources. Build highly targeted prospect lists for outbound in a fraction of the time.", url: "https://clay.com", price: "$134/mo", logoEmoji: "🏺" },
  { name: "Instantly", category: "Sales & Payments", description: "AI cold email at scale with unlimited sending accounts. Automate outbound prospecting without burning your domain reputation.", url: "https://instantly.ai", price: "$30/mo", logoEmoji: "⚡" },

  // Finance
  { name: "Mercury", category: "Finance", description: "Banking built for startups and solo founders. Free business checking, treasury accounts, and corporate cards — no minimums.", url: "https://mercury.com", price: "Free", logoEmoji: "🏦", isRecommended: true, inCoreStack: true },
  { name: "QuickBooks Solopreneur", category: "Finance", description: "Auto-categorizes business expenses, tracks mileage, and estimates quarterly taxes. Keeps your finances clean without an accountant.", url: "https://quickbooks.intuit.com", price: "$20/mo", logoEmoji: "📒", inCoreStack: true },
  { name: "Fondo", category: "Finance", description: "AI-powered bookkeeping and tax preparation built for startups. Connects to your accounts and handles the numbers so you can focus on growth.", url: "https://tryfondo.com", price: "$200/mo+", logoEmoji: "🧾" },

  // Operations
  { name: "Notion AI", category: "Operations", description: "All-in-one workspace with AI for projects, wikis, and planning. Your second brain — captures everything and surfaces it when you need it.", url: "https://notion.so", price: "$10–$15/mo", logoEmoji: "📋", isRecommended: true, inCoreStack: true },
  { name: "Zapier", category: "Operations", description: "Connect 7,000+ apps with AI-powered decision steps. Automate repetitive workflows between every tool in your stack without code.", url: "https://zapier.com", price: "Free–$20/mo", logoEmoji: "⚡", inCoreStack: true },
  { name: "n8n", category: "Operations", description: "Open-source workflow automation with unlimited workflows and self-hosting. Full control over your automations — no per-task pricing.", url: "https://n8n.io", price: "Free (self-hosted)", logoEmoji: "🔄" },
  { name: "Make", category: "Operations", description: "Visual workflow automation that balances ease of use with real power. Drag-and-drop logic for connecting apps and automating operations.", url: "https://make.com", price: "$9/mo", logoEmoji: "🔗" },
  { name: "Cal.com", category: "Operations", description: "Open-source scheduling with booking pages, automations, and payment collection. Replace Calendly with full control over your data.", url: "https://cal.com", price: "Free–$12/mo", logoEmoji: "📅", inCoreStack: true },
  { name: "Reclaim.ai", category: "Operations", description: "AI calendar that automatically defends your focus blocks and schedules habits. Protect your deep work time without manual calendar juggling.", url: "https://reclaim.ai", price: "Free–$10/mo", logoEmoji: "🗓️" },
];

export const AI_TOOL_CATEGORIES = [
  "All",
  "AI Models",
  "AI Agents",
  "Coding & Dev",
  "Design",
  "Video",
  "Voice & Audio",
  "Marketing",
  "SEO & GEO",
  "Email & Newsletter",
  "Customer Support",
  "Sales & Payments",
  "Finance",
  "Operations",
];

export const CORE_STACK = {
  title: "Recommended Core Stack",
  subtitle: "25 essential tools · ~$271/mo · replaces a 10-person team",
  description: "We've handpicked the 25 tools that give every OPC founder the highest leverage per dollar. This is the exact stack we'd build a $1M/yr business with today — covering AI, design, video, SEO, email, payments, and operations.",
  price: 200,
  currency: "USD",
  tools: AI_TOOLS.filter(t => t.inCoreStack),
};

// Keep backwards compat with homepage preview
export const AI_TOOLS_PREVIEW = AI_TOOLS.slice(0, 6);
