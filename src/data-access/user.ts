import { prisma } from "@/lib/db";
import { SignUpType } from "@/zod/types";

export const findUserByUserName = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
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
