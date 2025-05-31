"use server";

import { getOAuthClient } from "@/auth/oauth/helpers";
import { getErrorMessage } from "@/lib/utils";
import { OAuthProvider } from "@prisma/client";
import { redirect } from "next/navigation";

export const oauthSignIn = async (provider: OAuthProvider, from?: string) => {
  try {
    const oauthClient = getOAuthClient(provider);
    const authorizationUrl = await oauthClient.createAuthorizationUrl(from);

    redirect(authorizationUrl);
  } catch (error) {
    console.error("Error during OAuth sign-in:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};
