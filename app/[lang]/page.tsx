export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <main className="text-white p-8">{lang} homepage — coming soon</main>;
}
