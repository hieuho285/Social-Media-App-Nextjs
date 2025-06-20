import { isOAuthProvider } from "@/lib/utils";
import { jwtOAuthStateVerify } from "@/services/jwt";
import { getOAuthClient } from "@/services/oauth";
import { createUserSession } from "@/services/session";
import { connectUserToOAuthAccount } from "@/services/user";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> },
) {
  const provider = (await params).provider;

  const state = request.nextUrl.searchParams.get("state"); // use to validate the response

  const code = request.nextUrl.searchParams.get("code"); // use to get the access token
  const errorUrl = `/sign-in?oauthError=${encodeURIComponent("Failed to connect. Please try again.")}`;
  if (
    !isOAuthProvider(provider) ||
    typeof code !== "string" ||
    typeof state !== "string"
  ) {
    redirect(errorUrl);
  }

  try {
    const { from } = jwtOAuthStateVerify(state);
    const oauthClient = getOAuthClient(provider);
    const oauthUser = await oauthClient.fetchUser(code, state);

    const user = await connectUserToOAuthAccount(oauthUser, provider);

    await createUserSession(user);

    redirect(from ?? "/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error during OAuth process:", error);

    redirect(errorUrl);
  }
}
