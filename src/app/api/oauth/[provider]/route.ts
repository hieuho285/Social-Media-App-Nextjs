import { getOAuthClient } from "@/auth/oauth/helpers";
import { createUserSession } from "@/services/session/session";
import { connectUserToAccount } from "@/services/user/connectUserToOAuthAccount";
import { oauthProviderSchema, oauthStateSchema } from "@/zod/schemas/";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const { provider: rawProvider } = await params;

  const state = request.nextUrl.searchParams.get("state"); // use to validate the response

  const code = request.nextUrl.searchParams.get("code"); // use to get the access token

  const { data: provider, success } =
    oauthProviderSchema.safeParse(rawProvider);

  if (!success || typeof code !== "string" || typeof state !== "string") {
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }

  const objState = JSON.parse(decodeURIComponent(state));

  try {
    const oauthClient = getOAuthClient(provider);
    const oauthUser = await oauthClient.fetchUser(code, state);

    const user = await connectUserToAccount(
      oauthUser.id,
      oauthUser.email,
      oauthUser.username,
    );

    await createUserSession(user);
  } catch (error) {
    console.error("Error during OAuth process:", error);
    redirect(
      `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`,
    );
  }

  const { data } = oauthStateSchema.safeParse(objState);

  redirect(data?.from ? data.from : "/");
}

export async function POST(request: Request) {
  const body = await request.json();
  const { name } = body;

  const newUser = { id: Date.now(), name };

  return new Response(JSON.stringify(newUser), {
    status: 201,
    headers: { "Content-Type": "application/json" },
  });
}
