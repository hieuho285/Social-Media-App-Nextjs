"use server";

import { findUserByEmail } from "@/data-access-layer/user";
import { UnableToSignInError } from "@/lib/error";
import { getErrorMessage } from "@/lib/utils";
import { signInSchema, SignInType } from "@/lib/validations";
import { createUserSession } from "@/services/session/session";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export const signIn = async (unsafeData: SignInType, from?: string) => {
  try {
    const { email, password } = signInSchema.parse(unsafeData);

    const existingUser = await findUserByEmail(email);

    if (!existingUser || !existingUser?.password) {
      throw new UnableToSignInError();
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!isPasswordValid) {
      throw new UnableToSignInError();
    }

    await createUserSession(existingUser);

    redirect(from ?? "/");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
