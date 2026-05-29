import { signOut } from "./actions";
import type { Lang } from "@/lib/i18n";

export default async function SignOutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = (await params) as { lang: Lang };
  await signOut(lang);
}
