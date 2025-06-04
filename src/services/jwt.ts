import { jwtSign, jwtVerify } from "@/lib/utils";
import {
  forgotPasswordSchema,
  ForgotPasswordType,
  oauthStateSchema,
  OAuthStateType,
  unverifiedUserSchema,
  UnverifiedUserType,
} from "@/lib/validations";
import "server-only";

export const jwtResetPasswordSign = (data: ForgotPasswordType) => {
  const payload = forgotPasswordSchema.parse(data);
  return jwtSign(payload);
};

export const jwtResetPasswordVerify = (token: string) => {
  const decoded = jwtVerify(token);
  const result = forgotPasswordSchema.parse(decoded);

  return result;
};

export const jwtUserSign = (data: UnverifiedUserType) => {
  const payload = unverifiedUserSchema.parse(data);

  return jwtSign(payload);
};

export const jwtUserVerify = (token: string) => {
  const decoded = jwtVerify(token);
  const result = unverifiedUserSchema.parse(decoded);

  return result;
};

export const jwtOAuthStateSign = (data: OAuthStateType) => {
  const payload = oauthStateSchema.parse(data);

  return jwtSign(payload);
};

export const jwtOAuthStateVerify = (token: string) => {
  const decoded = jwtVerify(token);
  const result = oauthStateSchema.parse(decoded);
  return result;
};
