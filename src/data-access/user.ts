import { prisma } from "@/lib/db";
import { SignUpType } from "@/lib/validations";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email.toLowerCase(),
    },
  });

  return user;
};

export const createUser = async ({
  displayName,
  password,
  email,
}: Omit<SignUpType, "confirmPassword">) => {
  const user = await prisma.user.create({
    data: {
      displayName,
      password,
      email,
    },
  });

  return user;
};
