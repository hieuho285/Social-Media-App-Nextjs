import { getCurrentUser } from "@/auth/user";
import { updateSessionExpiration } from "@/cache/session";
import { NextRequest, NextResponse } from "next/server";

const privateRoutes = ["/private"];
const adminRoutes = ["/admin"];
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const response = await middlewareAuth(request);
  await updateSessionExpiration();
  return response;
}

async function middlewareAuth(request: NextRequest) {
  const user = await getCurrentUser();
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";

  if (
    privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    const callbackUrl = request.url;
    const redirectUrl = new URL("/sign-in", request.url);
    redirectUrl.searchParams.append("callbackUrl", callbackUrl);

    if (!isAuthenticated) {
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (isAuthenticated) {
      const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");

      if (callbackUrl) {
        return NextResponse.redirect(new URL(callbackUrl, request.url));
      }

      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
