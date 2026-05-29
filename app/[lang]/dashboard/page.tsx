import { redirect } from "next/navigation";

export default async function DashboardRoot({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/dashboard/overview`);
}
