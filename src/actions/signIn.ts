"use server";

import { getErrorMessage } from "@/lib/utils";
import { signInSchema, SignInType } from "@/lib/validations";
import { validateUserCredentials } from "@/services/auth";
import { createUserSession } from "@/services/session";
import { redirect } from "next/navigation";

export const signIn = async (unsafeData: SignInType, from: string | null) => {
  try {
    const { email, password } = signInSchema.parse(unsafeData);

    const user = await validateUserCredentials(email, password);

    await createUserSession(user);

    redirect(from ?? "/");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
