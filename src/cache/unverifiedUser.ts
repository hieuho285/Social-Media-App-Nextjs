import { CACHE_EXPIRE_TIME, CACHE_UNVERIFIED_USER_KEY } from "@/constants";
import { redisClient } from "@/lib/redis";
import { unverifiedUserSchema } from "@/zod/schemas";
import { UnverifiedUserType } from "@/zod/types";

export const getUnverifiedUserInCache = async (token: string) => {
  const rawUser = await redisClient.get(
    `${CACHE_UNVERIFIED_USER_KEY}:${token}`,
  );
  if (!rawUser) {
    return null;
  }

  const { success, data } = unverifiedUserSchema.safeParse(rawUser);

  return success ? data : null;
};

export const setUnverifiedUserInCache = async (
  token: string,
  rawUser: UnverifiedUserType,
) => {
  const user = unverifiedUserSchema.parse(rawUser);

  await redisClient.set(`${CACHE_UNVERIFIED_USER_KEY}:${token}`, user, {
    ex: CACHE_EXPIRE_TIME,
  });
};

export const deleteUnverifiedUserInCache = async (token: string) => {
  await redisClient.del(`${CACHE_UNVERIFIED_USER_KEY}:${token}`);
};
