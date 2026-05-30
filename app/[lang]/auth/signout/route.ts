import { type NextRequest, NextResponse } from "next/server";
import { destroySession } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: { lang: string } }
) {
  await destroySession();
  return NextResponse.redirect(new URL(`/${params.lang}`, _req.url));
}
