import { z } from "zod";

export class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid Token");
    this.cause = zodError
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super("Invalid User");
    this.cause = zodError
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
    this.cause = zodError
  }
}
