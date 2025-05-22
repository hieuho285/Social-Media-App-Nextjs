import { prisma } from "@/lib/db";

export const connectUserToAccount = async (
  id: string,
  email: string,
  username: string,
) => {
  try {
    return await prisma.user.upsert({
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
  } catch (error) {
    console.log("Error connecting User To Account: ", error);
    throw new Error("Error Connecting User To Account");
  }
};
