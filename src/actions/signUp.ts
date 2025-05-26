"use server";

import { setUnverifiedUserInCache } from "@/cache/unverifiedUser";
import { findUserByEmail } from "@/data-access/user";
import { sendUserVerificationMail } from "@/lib/sendMail";
import { createRandomId, getErrorMessage } from "@/lib/utils";
import { signUpSchema, SignUpType } from "@/lib/validations";
import bcrypt from "bcryptjs";

export const signUp = async (unsafeData: SignUpType) => {
  try {
    const { displayName, email, password, confirmPassword } =
      signUpSchema.parse(unsafeData);

    if (password !== confirmPassword) throw new Error("Passwords don't match");

    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.password)
      throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = createRandomId();

    await setUnverifiedUserInCache(token, {
      email,
      password: hashedPassword,
      displayName,
    });

    await sendUserVerificationMail({ sendTo: email, token });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return {
      error: getErrorMessage(error),
    };
  }
};
