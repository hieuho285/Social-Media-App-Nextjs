import { prisma } from "@/lib/db";
import { SignUpType } from "@/zod/types";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
};

export const createUser = async ({
  username,
  password,
  email,
}: Omit<SignUpType, "confirmPassword">) => {
  const user = await prisma.user.create({
    data: {
      username,
      password,
      email,
    },
  });

  return user;
};
