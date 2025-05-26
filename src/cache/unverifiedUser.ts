import { CACHE_EXPIRE_TIME, CACHE_UNVERIFIED_USER_KEY } from "@/lib/constants";
import { redisClient } from "@/lib/redis";
import {
  signUpSchemaWithoutConfirm,
  signUpWithoutConfirmType,
  userCacheSchema,
} from "@/lib/validations";

export const getUnverifiedUserInCache = async (
  email: string,
  token: string,
) => {
  const rawUser = await redisClient.get(
    `${CACHE_UNVERIFIED_USER_KEY}:${email}`,
  );
  if (!rawUser) {
    return null;
  }

  const { success, data } = userCacheSchema.safeParse(rawUser);

  return success && data[token] ? data[token] : null;
};

export const setUnverifiedUserInCache = async (
  token: string,
  rawUser: signUpWithoutConfirmType,
) => {
  const user = signUpSchemaWithoutConfirm.parse(rawUser);

  const existingUser = await getUnverifiedUserInCache(user.email, token);

  await redisClient.set(
    `${CACHE_UNVERIFIED_USER_KEY}:${user.email}`,
    { ...existingUser, [token]: { ...user } },
    {
      ex: CACHE_EXPIRE_TIME,
    },
  );
};

export const deleteUnverifiedUserInCache = async (email: string) => {
  await redisClient.del(`${CACHE_UNVERIFIED_USER_KEY}:${email}`);
};
