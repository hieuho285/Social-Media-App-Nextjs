"use server";

import { getOAuthClient } from "@/auth/oauth/helpers";
import { createUser, findUserByUserName } from "@/data-access/user";
import { comparePassword, hashPassword } from "@/lib/crypto/password";
import { createUserSession, deleteUserSession } from "@/services/session";
import { signInSchema, signUpSchema } from "@/zod/schemas/";
import { SignInType, SignUpType } from "@/zod/types";
import { redirect } from "next/navigation";

export const signIn = async (unsafeData: SignInType) => {
  const { success, data, error } = signInSchema.safeParse(unsafeData);

  if (!success) {
    return {
      error: error.message,
    };
  }
  const { username, password } = data;

  const existingUser = await findUserByUserName(username);

  if (!existingUser || !existingUser?.password) {
    return {
      error: "Unable to sign in",
    };
  }

  const isPasswordValid = await comparePassword(
    password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    return {
      error: "Unable to sign in",
    };
  }

  try {
    await createUserSession(existingUser);
  } catch (error) {
    console.log(error);
    return {
      error: "Error creating session",
    };
  }

  return {
    data: {
      username,
      password,
    },
  };
};

export const signUp = async (unsafeData: SignUpType) => {
  const { success, data, error } = signUpSchema.safeParse(unsafeData);
  if (!success) {
    return {
      error: error.message,
    };
  }

  const { username, email, password, confirmPassword } = data;

  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  const existingUser = await findUserByUserName(username);
  if (existingUser) {
    return {
      error: "User already exists",
    };
  }

  // Create new user
  try {
    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      username,
      email,
      password: hashedPassword,
    });

    await createUserSession(user);
  } catch (error) {
    console.log(error);
    return {
      error: "Error creating user",
    };
  }

  return {
    data: {
      email,
      password,
    },
  };
};

export const signOut = async () => {
  try {
    await deleteUserSession();
  } catch (error) {
    console.log(error);
    return {
      error: "Error signing out",
    };
  }

  return {
    data: null,
  };
};

export const oauthSignIn = async () => {
  const oauthClient = getOAuthClient("discord");
  const authorizationUrl = await oauthClient.createAuthorizationUrl();

  redirect(authorizationUrl);
};
