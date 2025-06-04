"use server";

import { findUserByEmail } from "@/data-access-layer/user";
import { getErrorMessage, hashPassword } from "@/lib/utils";
import { signUpSchema, SignUpType } from "@/lib/validations";
import { jwtUserSign } from "@/services/jwt";
import { sendVerificationMail } from "@/services/mail/sendMail";

export const signUp = async (unsafeData: SignUpType) => {
  try {
    const { name, email, password } = signUpSchema.parse(unsafeData);

    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.password)
      throw new Error("User already exists");

    const hashedPassword = await hashPassword(password);

    const token = jwtUserSign({ email, password: hashedPassword, name });

    await sendVerificationMail({ sendTo: email, token });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
