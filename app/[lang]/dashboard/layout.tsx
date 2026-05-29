import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import type { Lang } from "@/lib/i18n";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const session = await getSession();

  if (!session) {
    redirect(`/${lang}/auth/signin`);
  }

  return (
    <DashboardShell lang={lang as Lang} user={session}>
      {children}
    </DashboardShell>
  );
}
