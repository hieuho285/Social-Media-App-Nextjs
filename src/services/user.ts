import { prisma } from "@/lib/db";

export const connectUserToAccount = (
  id: string,
  email: string,
  username: string,
) => {
  return prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      email,
      username,
      accounts: {
        connectOrCreate: {
          where: {
            providerAccountId_provider: {
              provider: "discord",
              providerAccountId: id,
            },
          },
          create: {
            provider: "discord",
            providerAccountId: id,
          },
        },
      },
    },
  });
};
