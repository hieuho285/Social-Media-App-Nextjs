"use server";

import { getErrorMessage } from "@/lib/utils";
import { resetPasswordSchema, ResetPasswordType } from "@/lib/validations";
import { jwtResetPasswordVerify } from "@/services/jwt";
import { updatePassword } from "@/services/user";

export const resetPassword = async (
  values: ResetPasswordType,
  token: string,
) => {
  try {
    const { password } = resetPasswordSchema.parse(values);
    const { email } = jwtResetPasswordVerify(token);

    await updatePassword(email, password);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
