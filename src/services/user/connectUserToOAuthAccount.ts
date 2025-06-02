import { prisma } from "@/lib/db";
import "server-only";

export const connectUserToOAuthAccount = async (
  id: string,
  email: string,
  name: string,
) => {
  try {
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
  } catch (error) {
    console.log("Error connecting User To Account: ", error);
    throw new Error("Error Connecting User To Account");
  }
};
