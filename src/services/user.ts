import { prisma } from "@/lib/db";

export const connectUserToAccount = (
  id: string,
  email: string,
  username: string,
) => {
  return prisma.userOAuthAccount.upsert({
    where: {
      providerAccountId_provider: {
        provider: "discord",
        providerAccountId: id,
      },
    },
    update: {},
    create: {
      provider: "discord",
      providerAccountId: id,
      user: {
        connectOrCreate: {
          where: { email },
          create: { email, username },
        },
      },
    },
  });
};
