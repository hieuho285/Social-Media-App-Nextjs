import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const trpc = useTRPC();
  const result = useQuery(trpc.user.current.queryOptions());

  return result;
};
