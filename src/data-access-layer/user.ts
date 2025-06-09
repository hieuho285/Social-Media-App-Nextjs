import { prisma } from "@/lib/db";
import { UnverifiedUserType, userOmitPassword } from "@/lib/validations";
import { getCurrentSession } from "@/services/session";
import { cache } from "react";
import "server-only";

export const findUserWithoutPasswordById = cache(async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
    omit: userOmitPassword,
  });
});

export const findUserByEmail = cache(async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return user;
});

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

export const updateCurrentUserPassword = async (password: string) => {
  const session = await getCurrentSession();

  if (!session) return null;

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password,
    },
  });
};

export const updatePasswordByEmail = async (
  email: string,
  password: string,
) => {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      password,
    },
  });
};
