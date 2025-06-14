import { redisClient } from "@/lib/redis";
import { userSessionSchema, UserSessionType } from "@/lib/validations";
import { getCurrentSession } from "@/services/session";
import "server-only";

const CACHE_USER_SESSION_KEY = "session:user";
const SESSION_EXPIRE_TIME = 10 * 600;

export const getUserSessionFromCache = async (sessionId: string) => {
  const rawUser = await redisClient.get(
    `${CACHE_USER_SESSION_KEY}:${sessionId}`,
  );
  if (!rawUser) {
    return null;
  }

  const user = userSessionSchema.parse(rawUser);

  return user ? user : null;
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
  const session = await getCurrentSession();
  if (!session) return null;

  await setUserSessionInCache(session.id, session.user);
};
