import crypto from "crypto";

export function createRandomId() {
  return crypto.randomBytes(512).toString("hex").normalize();
}
