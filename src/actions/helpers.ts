/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";

export const asyncActionErrorHandler = <
  T extends (...args: any[]) => Promise<Awaited<ReturnType<T>>>,
>(
  fn: T,
) => {
  return (...args: Parameters<T>) => {
    try {
      return fn(...args);
    } catch (error) {
      return { error: getErrorMessage(error) };
    }
  };
};

const getErrorMessage = (error: unknown) => {
  let message = "Something went wrong. Unknown error.";

  if (error instanceof Error) {
    message = error.message;
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
  }

  return message;
};
