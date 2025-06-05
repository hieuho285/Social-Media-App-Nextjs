import { env } from "@/lib/env";
import { OAuthProvider, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
import jwt, { JwtPayload } from "jsonwebtoken";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { twMerge } from "tailwind-merge";
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createRandomId = () => {
  return crypto.randomUUID();
};

export const getErrorMessage = (error: unknown) => {
  let message = "Something went wrong. Unknown error.";

  if (isRedirectError(error)) {
    throw error;
  } else if (error instanceof ZodError) {
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    message = error.message;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return message;
};

export const getInitialsFromName = (name: string) => {
  const nameArr = name.split(" ");
  const firstInitial = nameArr[0]?.at(0) ?? "";
  const lastInitial = nameArr[nameArr.length - 1]?.at(0) ?? "";
  return firstInitial + lastInitial;
};

export const jwtSign = (payload: JwtPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "1h" });
};

export const jwtVerify = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET);
};

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, 10);
};
export const comparePassword = (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};

export const isOAuthProvider = (value: string): value is OAuthProvider => {
  return Object.values(OAuthProvider).includes(value as OAuthProvider);
};
