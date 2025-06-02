"use server";

import { getErrorMessage } from "@/lib/utils";
import { getOAuthClient } from "@/services/auth/oauthClient";
import { OAuthProvider } from "@prisma/client";
import { redirect } from "next/navigation";

export const oauthSignIn = async (provider: OAuthProvider, from?: string) => {
  try {
    const oauthClient = getOAuthClient(provider);
    const authorizationUrl = await oauthClient.createAuthorizationUrl(from);

    redirect(authorizationUrl);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
