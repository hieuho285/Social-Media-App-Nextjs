import { env } from "@/lib/env";
import { getCurrentSession } from "@/services/session";
import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/studio"];
const adminRoutes = ["/admin"];
const authRoutes = ["/sign-in", "/sign-up", "/forgot-password"];

export async function middleware(request: NextRequest) {
  const response = await middlewareAuth(request);
  // await updateSessionExpiration();
  return response;
}

async function middlewareAuth(request: NextRequest) {
  const session = await getCurrentSession();
  console.log("middleware" + session);
  const isAuthenticated = !!session;
  const isAdmin = session?.user?.role === "ADMIN";

  if (
    protectedRoutes.some((route) =>
      request.nextUrl.pathname.startsWith(route),
    ) &&
    !isAuthenticated
  ) {
    const from = encodeURIComponent(
      request.nextUrl.pathname + request.nextUrl.search,
    );
    return NextResponse.redirect(
      new URL(`/sign-in?from=${from}`, env.NEXT_PUBLIC_APP_URL),
    );
  }

  if (adminRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (!isAuthenticated || !isAdmin) {
      return NextResponse.redirect(new URL("/403", env.NEXT_PUBLIC_APP_URL));
    }
  }

  if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
    if (isAuthenticated) {
      const from = request.nextUrl.searchParams.get("from");

      return NextResponse.redirect(
        new URL(from ? decodeURIComponent(from) : "/", env.NEXT_PUBLIC_APP_URL),
      );
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
