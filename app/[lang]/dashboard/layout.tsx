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
  return (
    <DashboardShell lang={lang as Lang}>
      {children}
    </DashboardShell>
  );
}
