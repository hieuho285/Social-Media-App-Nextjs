import { OAuthClient } from "@/auth/oauth";
import { getUserById } from "@/data-access/user";
import { createUserSession } from "@/services/session";
import { connectUserToAccount } from "@/services/user";
import { oauthProviderSchema } from "@/zod/schemas/schemas";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;

  const state = request.nextUrl.searchParams.get("state"); // use to validate the response
  const code = request.nextUrl.searchParams.get("code"); // use to get the access token
  const provider = oauthProviderSchema.parse(rawProvider);
  console.log(provider);

  if (typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }

  try {
    const oAuthUser = await new OAuthClient().fetchUser(code, state);
    const account = await connectUserToAccount(
      oAuthUser.id,
      oAuthUser.email,
      oAuthUser.name,
    );
    const user = await getUserById(account.userId);

    if (!user) {
      redirect(
        `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
      );
    }

    await createUserSession(user);
  } catch (error) {
    console.error("Error during OAuth process:", error);
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }

  redirect("/");
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
