"use server";

import { OAuthClient } from "@/auth/oauth";
import { createUserSession, deleteUserSession } from "@/auth/session";
import { createUser, findUserByUserName } from "@/data-access/user";
import { comparePassword, hashPassword } from "@/lib/crypto/password";
import { signInSchema, signUpSchema } from "@/zod/schemas";
import { SignInType, SignUpType } from "@/zod/types";
import { redirect } from "next/navigation";

export const signIn = async (unsafeData: SignInType) => {
  const result = signInSchema.safeParse(unsafeData);

  if (!result.success) {
    return {
      error: result.error.message,
    };
  }

  const { username, password } = result.data;

  // Check if user is already registered
  const existingUser = await findUserByUserName(username);

  if (!existingUser || !existingUser?.password) {
    return {
      error: "Unable to sign in",
    };
  }

  // Check if password is correct
  const isPasswordValid = await comparePassword(
    password,
    existingUser.password,
  );

  if (!isPasswordValid) {
    return {
      error: "Unable to sign in",
    };
  }

  // Create session
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
  const result = signUpSchema.safeParse(unsafeData);
  if (!result.success) {
    return {
      error: result.error.message,
    };
  }
  const { username, email, password, confirmPassword } = result.data;

  // Compare the password and confirmPassword
  if (password !== confirmPassword) {
    return {
      error: "Passwords do not match",
    };
  }

  // Check if user is already registered
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

export const OAuthSignIn = async () => {
  redirect(new OAuthClient().createAuthUrl());
};
