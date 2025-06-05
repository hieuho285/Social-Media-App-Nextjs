import { findUserByEmail } from "@/data-access-layer/user";
import { NoFoundError, UnableToError } from "@/lib/error";
import { comparePassword } from "@/lib/utils";
import { jwtResetPasswordSign } from "@/services/jwt";
import "server-only";

export const createResetPasswordToken = async (email: string) => {
  const user = await findUserByEmail(email);

  if (!user || !user.password) {
    throw new NoFoundError("User");
  }

  const token = jwtResetPasswordSign({ email });

  return token;
};

export const validateUserCredentials = async (
  email: string,
  password: string,
) => {
  const user = await findUserByEmail(email);

  if (!user || !user.password) {
    throw new UnableToError("Sign In");
  }

  const isValid = await comparePassword(password, user.password);
  if (!isValid) {
    throw new UnableToError("Sign In");
  }

  return user;
};

export const ensureUserDoesNotExist = async (email: string) => {
  const existing = await findUserByEmail(email);
  if (existing && existing.password) {
    throw new Error("User already exists");
  }
};
