"use server";

import { findUserByEmail } from "@/data-access-layer/user";
import { getErrorMessage, jwtUserSign } from "@/lib/utils";
import { signUpSchema, SignUpType } from "@/lib/validations";
import { sendVerificationMail } from "@/services/mail/sendMail";
import bcrypt from "bcryptjs";

export const signUp = async (unsafeData: SignUpType) => {
  try {
    const { name, email, password } = signUpSchema.parse(unsafeData);

    const existingUser = await findUserByEmail(email);
    if (existingUser && existingUser.password)
      throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    const token = jwtUserSign({ email, password: hashedPassword, name });

    await sendVerificationMail({ sendTo: email, token });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
