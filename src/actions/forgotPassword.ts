"use server";

import { getErrorMessage } from "@/lib/utils";
import { forgotPasswordSchema } from "@/lib/validations";
import { sendForgotPasswordMail } from "@/services/mail/sendMail";
import { createResetPasswordToken } from "@/services/user";

export const forgotPassword = async (data: string) => {
  try {
    const { email } = forgotPasswordSchema.parse(data);

    const token = await createResetPasswordToken(email);

    await sendForgotPasswordMail({ sendTo: email, token });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
