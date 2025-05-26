"use server";

import { getErrorMessage } from "@/lib/utils";
import { getOAuthClient } from "@/auth/oauth/helpers";
import { redirect } from "next/navigation";

export const oauthSignIn = async (from?: string) => {
  try {
    const oauthClient = getOAuthClient("discord");
    const authorizationUrl = await oauthClient.createAuthorizationUrl(from);

    redirect(authorizationUrl);
  } catch (error) {
    console.error("Error during OAuth sign-in:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};
