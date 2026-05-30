import { redirect } from "next/navigation";
export default async function SignInRedirect({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  redirect(`/${lang}/auth/signin`);
}
