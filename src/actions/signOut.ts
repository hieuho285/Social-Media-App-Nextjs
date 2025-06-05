"use server";

import { getErrorMessage } from "@/lib/utils";
import { destroyCurrentSession } from "@/services/session";

export const signOut = async () => {
  try {
    await destroyCurrentSession();
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
