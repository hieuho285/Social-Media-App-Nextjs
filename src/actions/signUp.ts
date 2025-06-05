"use server";

import { getErrorMessage, hashPassword } from "@/lib/utils";
import { signUpSchema, SignUpType } from "@/lib/validations";
import { ensureUserDoesNotExist } from "@/services/auth";
import { jwtUserSign } from "@/services/jwt";
import { sendVerificationMail } from "@/services/sendMail";

export const signUp = async (unsafeData: SignUpType) => {
  try {
    const { name, email, password } = signUpSchema.parse(unsafeData);

    await ensureUserDoesNotExist(email);

    const hashedPassword = await hashPassword(password);

    const token = jwtUserSign({ email, password: hashedPassword, name });

    await sendVerificationMail({ sendTo: email, token });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
