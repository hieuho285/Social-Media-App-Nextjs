"use server";

import { createUser } from "@/data-access-layer/user";
import { getErrorMessage } from "@/lib/utils";
import { jwtUserVerify } from "@/services/jwt";

export const verifyUser = async (token: string) => {
  try {
    const user = jwtUserVerify(token);
    await createUser(user);
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
