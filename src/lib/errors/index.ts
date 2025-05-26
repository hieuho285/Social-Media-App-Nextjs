import { z } from "zod";

export class InvalidError extends Error {
  constructor(property: string, zodError?: z.ZodError) {
    super(`Invalid ${property}`);
    if (zodError) {
      this.cause = zodError;
    }
    const capitalizedProperty = property
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
    this.name = `Invalid${capitalizedProperty}Error`;
  }
}

export class NoSessionFoundError extends Error {
  constructor() {
    super("No Session Found");
  }
}

export class UnableToSignInError extends Error {
  constructor() {
    super("Unable to Sign In");
  }
}

export class UnsupportedProviderError extends Error {
  constructor(provider: never) {
    super(`Unsupported provider: ${provider}`);
  }
}

export class UnableToSendMailError extends Error {
  constructor() {
    super("Unable to send verification email");
  }
}

