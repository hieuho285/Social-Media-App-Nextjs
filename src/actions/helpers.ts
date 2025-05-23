/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { ZodError } from "zod";

export const asyncActionErrorHandler = <
  T extends (...args: any[]) => Promise<Awaited<ReturnType<T>>>,
>(
  fn: T,
) => {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      return { success: false as const, error: getErrorMessage(error) };
    }
  };
};

const getErrorMessage = (error: unknown) => {
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
