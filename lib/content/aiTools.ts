export interface AITool {
  name: string;
  category: string;
  description: string;
  logoEmoji: string;
  hasDeal: boolean;
}

export const AI_TOOLS_PREVIEW: AITool[] = [
  { name: "Claude", category: "AI Assistant", description: "The most capable AI for founders — writing, coding, strategy.", logoEmoji: "🤖", hasDeal: true },
  { name: "Cursor", category: "AI Coding", description: "Build products faster with AI-powered code editor.", logoEmoji: "⌨️", hasDeal: true },
  { name: "Midjourney", category: "Image Generation", description: "Professional-grade AI imagery for your brand and content.", logoEmoji: "🎨", hasDeal: false },
  { name: "Beehiiv", category: "Newsletter", description: "Grow your audience with the best newsletter platform.", logoEmoji: "📧", hasDeal: true },
  { name: "HeyGen", category: "AI Video", description: "Create bilingual video content with AI avatars.", logoEmoji: "🎬", hasDeal: true },
  { name: "Stripe", category: "Payments", description: "Accept payments from Canada to Argentina.", logoEmoji: "💳", hasDeal: false },
];
