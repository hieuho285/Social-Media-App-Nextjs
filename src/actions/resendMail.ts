"use server";

import { getErrorMessage, jwtUserSign, jwtUserVerify } from "@/lib/utils";
import { unverifiedUserSchema } from "@/lib/validations";
import { sendVerificationMail } from "@/services/mail/sendMail";

export const resendVerificationMail = async (token: string) => {
  try {
    const decoded = jwtUserVerify(token);

    const user = unverifiedUserSchema.parse(decoded);

    const newToken = jwtUserSign(user);

    await sendVerificationMail({ sendTo: user.email, token: newToken });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
