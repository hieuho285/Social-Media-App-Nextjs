import { z } from "zod";

export class InvalidError extends Error {
  constructor(input: string, zodError?: z.ZodError) {
    super(`Invalid ${input}`);
    if (zodError) {
      this.cause = zodError;
    }
    const capitalizedInput = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    this.name = `Invalid${capitalizedInput}Error`;
  }
}

export class NoFoundError extends Error {
  constructor(input: string, zodError?: z.ZodError) {
    super(`No ${input} Found`);
    if (zodError) {
      this.cause = zodError;
    }
    const capitalizedInput = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    this.name = `No${capitalizedInput}FoundError`;
  }
}

export class UnableToError extends Error {
  constructor(input: string, zodError?: z.ZodError) {
    super(`Unable To ${input}`);
    if (zodError) {
      this.cause = zodError;
    }
    const capitalizedInput = input
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    this.name = `UnableTo${capitalizedInput}Error`;
  }
}

export class UnsupportedProviderError extends Error {
  constructor(provider: never) {
    super(`Unsupported provider: ${provider}`);
  }
}

export class AuthenticationError extends Error {
  constructor() {
    super("You must be logged in to access this resource.");
    this.name = "AuthenticationError";
  }
}

export class AuthorizationError extends Error {
  constructor() {
    super("You do not have permission to perform this action.");
    this.name = "AuthorizationError";
  }
}
