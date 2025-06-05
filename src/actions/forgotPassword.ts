"use server";

import { getErrorMessage } from "@/lib/utils";
import { forgotPasswordSchema } from "@/lib/validations";
import { createResetPasswordToken } from "@/services/auth";
import { sendForgotPasswordMail } from "@/services/sendMail";

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
