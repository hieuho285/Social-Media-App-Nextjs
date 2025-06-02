import { prisma } from "@/lib/db";
import { UnverifiedUserType } from "@/lib/validations";
import { Prisma } from "@prisma/client";
import { cache } from "react";
import "server-only";

export const findUserById = cache(
  async (id: string, args?: Omit<Prisma.UserFindFirstArgs, "where">) => {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
      ...args,
    });

    return user;
  },
);

export const findUserByEmail = cache(
  async (email: string, args?: Omit<Prisma.UserFindUniqueArgs, "where">) => {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      ...args,
    });

    return user;
  },
);

export const createUser = async ({
  name,
  password,
  email,
}: UnverifiedUserType) => {
  const user = await prisma.user.create({
    data: {
      name,
      password,
      email,
    },
  });

  return user;
};
