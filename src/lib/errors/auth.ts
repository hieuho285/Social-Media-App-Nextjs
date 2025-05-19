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

export class InvalidStateError extends Error {
  constructor(zodError?: z.ZodError) {
    super("Invalid State");
    if (zodError) {
      this.cause = zodError;
    }
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User");
    this.cause = zodError;
  }
}

export class NoSessionFoundError extends Error {
  constructor() {
    super("No Session Found");
  }
}

export class InvalidSessionDataError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Session Data");
    this.cause = zodError;
  }
}
