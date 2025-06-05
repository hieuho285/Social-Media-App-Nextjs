"use server";

import { getErrorMessage } from "@/lib/utils";
import { unverifiedUserSchema, UnverifiedUserType } from "@/lib/validations";
import { jwtUserSign } from "@/services/jwt";
import { sendVerificationMail } from "@/services/sendMail";

export const resendMail = async (values: UnverifiedUserType) => {
  try {
    const user = unverifiedUserSchema.parse(values);

    const token = jwtUserSign(user);

    await sendVerificationMail({ sendTo: user.email, token });
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
