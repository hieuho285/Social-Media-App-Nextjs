import { getStateCookie, setStateCookie } from "@/cookies/state";
import { createRandomId } from "@/lib/crypto";

export const createState = async () => {
  const state = createRandomId();
  await setStateCookie(state);

  return state;
};

export const validateState = async (state: string) => {
  const stateCookie = await getStateCookie();

  return stateCookie === state;
};
