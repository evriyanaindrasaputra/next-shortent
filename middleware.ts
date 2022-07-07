import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/api/") ||
    req.nextUrl.pathname.startsWith("/_next/") ||
    req.nextUrl.pathname === "/" ||
    req.nextUrl.pathname === "/favicon.ico"
  ) {
    return NextResponse.next()
  }
  const slug = req.nextUrl.pathname.split("/").pop();
  const slugFetch = await fetch(`${req.nextUrl.origin}/api/get-url/${slug}`);
  if (slugFetch.status === 404) {
  return NextResponse.redirect(new URL(req.nextUrl.origin, req.url))
  }
  const data = await slugFetch.json();
  if (data?.url) {
    return NextResponse.redirect(new URL(data.url, req.url))
  }
}
