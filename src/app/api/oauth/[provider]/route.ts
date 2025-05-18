import { OAuthClient } from "@/lib/auth/oauth";
import { oAuthProviderSchema } from "@/lib/zod/schemas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;
  const code = request.nextUrl.searchParams.get("code");
  const provider = oAuthProviderSchema.parse(rawProvider);

  if (typeof code !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }

  const oAuthUser = await new OAuthClient().fetchUser(code);
  const user = 

  console.log(user);
}

export async function POST(request: Request) {
  // Parse the request body
  const body = await request.json();
  const { name } = body;

  // e.g. Insert new user into your DB
  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
