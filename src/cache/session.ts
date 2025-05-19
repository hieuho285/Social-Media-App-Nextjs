import { getCurrentUser } from "@/auth/user";
import { SESSION_EXPIRE_TIME } from "@/constants";
import { redisClient } from "@/lib/redis";

export const getSessionFromCache = async (sessionId: string) => {
  return await redisClient.get(`session:${sessionId}`);
};

export const setSessionInCache = async (
  sessionId: string,
  sessionData: string,
) => {
  await redisClient.set(`session:${sessionId}`, sessionData, {
    ex: SESSION_EXPIRE_TIME,
  });
};

export const deleteSessionFromCache = async (sessionId: string) => {
  await redisClient.del(`session:${sessionId}`);
};

export const updateSessionExpiration = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  const sessionId = user.id;
  const sessionData = await getSessionFromCache(sessionId);

  if (!sessionData) {
    return;
  }

  await redisClient.set(`session:${sessionId}`, sessionData, {
    ex: SESSION_EXPIRE_TIME,
  });
};
