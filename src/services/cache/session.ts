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
    expiration: {
      type: "EX",
      value: SESSION_EXPIRE_TIME,
    },
  });
};

export const deleteSessionFromCache = async (sessionId: string) => {
  await redisClient.del(`session:${sessionId}`);
};
