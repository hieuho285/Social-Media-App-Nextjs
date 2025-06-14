"use server";

import { prisma } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { getCurrentUser } from "@/services/session";
import { revalidatePath } from "next/cache";

export const create = async () => {
  try {
    const user = await getCurrentUser();

    if (!user) {
      throw new Error("User not authenticated");
    }

    const result = await prisma.video.create({
      data: {
        title: "New Video",
        url: Math.random().toString(36).substring(2, 15), // Random URL for demo purposes
        user: {
          connect: { id: user.id },
        },
      },
    });

    revalidatePath("/studio");
  } catch (error) {
    return {
      error: getErrorMessage(error),
    };
  }
};
