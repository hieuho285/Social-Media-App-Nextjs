import "server-only";

import { prisma } from "@/lib/db";
import { SignUpType } from "@/lib/validations";
import { Prisma } from "@prisma/client";

export const findUserById = async (
  id: string,
  args?: Omit<Prisma.UserFindUniqueArgs, "where">,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    ...args,
  });

  return user;
};

export const findUserByEmail = async (
  email: string,
  args?: Omit<Prisma.UserFindUniqueArgs, "where">,
) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
    ...args,
  });

  return user;
};

export const createUser = async ({
  name,
  password,
  email,
}: Omit<SignUpType, "confirmPassword">) => {
  const user = await prisma.user.create({
    data: {
      name,
      password,
      email,
    },
  });

  return user;
};
