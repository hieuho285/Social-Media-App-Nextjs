"use server";

import { asyncActionErrorHandler } from "@/actions/helpers";
import { getOAuthClient } from "@/auth/oauth/helpers";
import { deleteUserSessionFromCache } from "@/cache/session";
import { setUnverifiedUserInCache } from "@/cache/unverifiedUser";
import {
  deleteUserSessionCookie,
  getUserSessionCookie,
} from "@/cookies/session";
import { findUserByUserName } from "@/data-access/user";
import { createRandomId } from "@/lib/crypto";
import { comparePassword, hashPassword } from "@/lib/crypto/password";
import { NoSessionFoundError, UnableToSignInError } from "@/lib/errors";
import { sendUserVerificationMail } from "@/lib/sendMail";
import { createUserSession } from "@/services/session";
import { signInSchema, signUpSchema } from "@/zod/schemas/";
import { SignInType, SignUpType } from "@/zod/types";
import { redirect } from "next/navigation";

export const signIn = asyncActionErrorHandler(
  async (unsafeData: SignInType, from?: string) => {
    const { username, password } = signInSchema.parse(unsafeData);

    const existingUser = await findUserByUserName(username);

    if (!existingUser || !existingUser?.password) {
      throw new UnableToSignInError();
    }

    const isPasswordValid = comparePassword(password, existingUser.password);

    if (!isPasswordValid) {
      throw new UnableToSignInError();
    }

    await createUserSession(existingUser);

    redirect(from ?? "/");
  },
);

export const signUp = asyncActionErrorHandler(
  async (unsafeData: SignUpType) => {
    const { username, email, password, confirmPassword } =
      signUpSchema.parse(unsafeData);

    if (password !== confirmPassword) throw new Error("Passwords don't match");

    const existingUser = await findUserByUserName(username);
    if (existingUser) throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    // const user = await createUser({
    //   username,
    //   email,
    //   password: hashedPassword,
    // });

    // await createUserSession(user);
    const token = createRandomId();

    await setUnverifiedUserInCache(token, {
      email,
      password: hashedPassword,
      username,
    });

    try {
      await sendUserVerificationMail({ sendTo: email, token });
      return {
        success: true,
        sent: true,
        message: "Verification email has been sent to your email." as string,
      } as const;
    } catch {
      return {
        success: true,
        sent: false,
        token,
      } as const;
    }
  },
);

export const signOut = asyncActionErrorHandler(async () => {
  const sessionId = await getUserSessionCookie();
  if (!sessionId) throw new NoSessionFoundError();

  await deleteUserSessionFromCache(sessionId);
  await deleteUserSessionCookie();
});

export const oauthSignIn = asyncActionErrorHandler(async (from?: string) => {
  const oauthClient = getOAuthClient("discord");
  const authorizationUrl = await oauthClient.createAuthorizationUrl(from);

  redirect(authorizationUrl);
});
