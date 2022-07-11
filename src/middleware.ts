import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname.startsWith("/retry.svg") ||
    req.nextUrl.pathname.startsWith("/clipboard.svg") ||
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/")
  ) {
    return;
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  let { url } = await (
    await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`)
  ).json();
  if (!url) url = req.nextUrl.origin;
  return NextResponse.redirect(url);
}
