import { Prisma } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import crypto from "crypto";
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
