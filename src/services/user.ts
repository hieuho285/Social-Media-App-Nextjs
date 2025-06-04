import {
  findUserByEmail,
  updatePasswordByEmail,
} from "@/data-access-layer/user";
import { prisma } from "@/lib/db";
import { NoUserFoundError } from "@/lib/error";
import { hashPassword } from "@/lib/utils";
import { jwtResetPasswordSign } from "@/services/jwt";
import { OAuthProvider } from "@prisma/client";
import "server-only";

export const connectUserToOAuthAccount = async (
  {
    id,
    email,
    name,
  }: {
    id: string;
    email: string;
    name: string;
  },
  provider: OAuthProvider,
) => {
  return await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      name,
      accounts: {
        connectOrCreate: {
          where: {
            providerAccountId_provider: {
              provider,
              providerAccountId: id,
            },
          },
          create: {
            provider,
            providerAccountId: id,
          },
        },
      },
    },
  });
};

export const createResetPasswordToken = async (email: string) => {
  const user = await findUserByEmail(email);

  if (!user || !user.password) {
    throw new NoUserFoundError();
  }

  const token = jwtResetPasswordSign({ email });

  return token;
};

export const updatePassword = async (email: string, password: string) => {
  const hashedPassword = await hashPassword(password);

  updatePasswordByEmail(email, hashedPassword);
};
