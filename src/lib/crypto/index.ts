import crypto from "crypto";

export const createRandomId = () => {
  return crypto.randomBytes(512).toString("hex").normalize();
};
