import { CACHE_USER_SESSION_KEY, SESSION_EXPIRE_TIME } from "@/lib/constants";
import { redisClient } from "@/lib/redis";
import { userSessionSchema, UserSessionType } from "@/lib/validations";
import { getCurrentUser } from "@/services/session";
import "server-only";

export const getUserSessionFromCache = async (sessionId: string) => {
  const rawUser = await redisClient.get(
    `${CACHE_USER_SESSION_KEY}:${sessionId}`,
  );
  if (!rawUser) {
    return null;
  }

  const { success, data } = userSessionSchema.safeParse(rawUser);

  return success ? data : null;
};

export const setUserSessionInCache = async (
  sessionId: string,
  rawSessionData: UserSessionType,
) => {
  const sessionData = userSessionSchema.parse(rawSessionData);

  await redisClient.set(`${CACHE_USER_SESSION_KEY}:${sessionId}`, sessionData, {
    ex: SESSION_EXPIRE_TIME,
  });
};

export const deleteUserSessionFromCache = async (sessionId: string) => {
  await redisClient.del(`${CACHE_USER_SESSION_KEY}:${sessionId}`);
};

export const updateSessionExpiration = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  await setUserSessionInCache(user.sessionId, user);
};
